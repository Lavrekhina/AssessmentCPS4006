import {useMemo, useState} from "react";

import {Button, Box, Chip, Card, Input, List, ListItem, ListItemContent, Stack, Table, Typography,} from "@mui/joy";
import nutritionService from "../../../utils/services/nutritionService.js";
import gptService from "../../../utils/services/gptService.js";
import {Container} from '../../ui/container';
import {useAuth} from "../../../contexts/AuthContext.jsx";

export const Nutrition = () => {
    const {user, updateUser} = useAuth();
    const [suggestionLoading,  setSuggestionLoading] = useState(false);
    const [mealPlan, setMealPlan] = useState({
        breakfast: "",
        lunch: "",
        dinner: "",
        snacks: "",
        date: new Date()
    });

    const [mealPlanHistory, setMealPlanHistory] = useState(user.nutritionalRecords ? user.nutritionalRecords : [])
    const [nutritionData, setNutritionData] = useState({});
    const [nutritionTips, setNutritionTips] = useState([]);

    const handleMealPlanChange = (meal, value) => {
        setMealPlan((prev) => ({
            ...prev,
            [meal]: value,
        }));
    };

    const getValueOrEmpty = value =>{
        if(!value){
            return "";
        }

        if(!value.quantity){
            return "";
        }

        if(!value.unit){
            return value.quantity.toFixed(2)
        }

        return `${value.quantity.toFixed(2)} ${value.unit}`;
    }
    const analyzeNutrition = async () => {
        setSuggestionLoading(true);
        if (mealPlan.breakfast !== '') {
            nutritionData.breakfast = {
                ...await nutritionService.analyzeNutrition(`${mealPlan.breakfast}`),
                ingr: mealPlan.breakfast
            };
        }
        if (mealPlan.lunch !== '') {
            nutritionData.lunch = {
                ...await nutritionService.analyzeNutrition(`${mealPlan.lunch}`),
                ingr: mealPlan.lunch
            };
        }
        if (mealPlan.dinner !== '') {
            nutritionData.dinner = {
                ...await nutritionService.analyzeNutrition(`${mealPlan.dinner}`),
                ingr: mealPlan.dinner
            };
        }
        if (mealPlan.snacks !== '') {
            nutritionData.snacks = {
                ...await nutritionService.analyzeNutrition(`${mealPlan.snacks}`),
                ingr: mealPlan.snacks
            };
        }

        setNutritionData({...nutritionData});

        mealPlanHistory.push(nutritionData)
        user.nutritionalRecords = mealPlanHistory;
        updateUser(user);

        setMealPlanHistory(user.nutritionalRecords);
        try {
            let tips = await gptService.suggestNutritional(JSON.stringify(nutritionData));
            if (!tips || tips.length === 0) {
                return
            }
            setNutritionTips(JSON.parse(tips));
        } catch (e) {
            console.error(e);
        }

        setSuggestionLoading(false);
    }

    const parsedAnalyzeData = useMemo(() => {
        if (!nutritionData) {
            return [];
        }
        let data = []
        for (let key of Object.keys(nutritionData)) {
            let result = nutritionData[key]
            if (!result) {
                continue;
            }
            let info = result.totalNutrients;
            let row = {
                label: key,
                info: info
            }
            data.push(row)
        }

        console.log(data)
        return data;
    }, [nutritionData]);

    const nutritionTags = useMemo(() => {
        if (!nutritionData) {
            return [];
        }
        let data = []
        for (let key of Object.keys(nutritionData)) {
            let result = nutritionData[key]

            let row = {
                label: key,
                tags: result.dietLabels
            }
            data.push(row)
        }

        console.log(data)
        return data;
    }, [nutritionData]);

    return (
        <Container spacing={3}>
            <Card>
                <Typography level="h1" sx={{mb: 2}}>
                    Nutrition Guide
                </Typography>
                <Typography level="body1" sx={{mb: 2}}>
                    Track your daily meals and get personalized nutrition advice to
                    maintain a healthy diet.
                </Typography>
            </Card>
            <Card>
                <Typography level="h2" sx={{mb: 2}}>
                    Daily Meal Plan
                </Typography>
                <Stack spacing={2}>
                    <div>
                        <Typography level="body2" sx={{mb: 1}}>
                            Breakfast
                        </Typography>
                        <Input
                            placeholder="What did you have for breakfast?"
                            value={mealPlan.breakfast}
                            onChange={(e) =>
                                handleMealPlanChange("breakfast", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <Typography level="body2" sx={{mb: 1}}>
                            Lunch
                        </Typography>
                        <Input
                            placeholder="What did you have for lunch?"
                            value={mealPlan.lunch}
                            onChange={(e) => handleMealPlanChange("lunch", e.target.value)}
                        />
                    </div>

                    <div>
                        <Typography level="body2" sx={{mb: 1}}>
                            Dinner
                        </Typography>
                        <Input
                            placeholder="What did you have for dinner?"
                            value={mealPlan.dinner}
                            onChange={(e) => handleMealPlanChange("dinner", e.target.value)}
                        />
                    </div>

                    <div>
                        <Typography level="body2" sx={{mb: 1}}>
                            Snacks
                        </Typography>
                        <Input
                            placeholder="What snacks did you have?"
                            value={mealPlan.snacks}
                            onChange={(e) => handleMealPlanChange("snacks", e.target.value)}
                        />
                    </div>

                    <div>
                        <Typography level="body2" sx={{mb: 1}}>
                            On Date
                        </Typography>
                        <Input value={mealPlan.date}
                               onChange={(e) => handleMealPlanChange("date", e.target.value)} type="date"/>
                    </div>

                    <Button onClick={analyzeNutrition}
                            loading={suggestionLoading}
                            sx={{mt: 2}}>Analyze</Button>

                </Stack>
            </Card>

            {parsedAnalyzeData.length > 0 ? <Card>
                <Typography level="h3" sx={{mb: 1}}>
                    Analyze
                </Typography>

                {nutritionTags.map((item, index) => (
                    <div>
                        <Typography key={index} level="h4" sx={{mb: 1}}>
                            {item.label}
                        </Typography>

                        <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                            {item.tags.map((tag, tagIndex) => (

                                <Chip size="lg"
                                      key={tag + tagIndex}
                                      variant="outlined"
                                      color="success">
                                    {tag.replaceAll('_', ' ')}
                                </Chip>
                            ))}

                        </Box>

                    </div>

                ))}

                <Table aria-label="basic table">
                    <thead>
                    <tr>
                        <th style={{width: '40%'}}>Meal</th>
                        <th>Calories</th>
                        <th>Fat&nbsp;(g)</th>
                        <th>Carbs&nbsp;(g)</th>
                        <th>Protein&nbsp;(g)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {parsedAnalyzeData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.label}</td>
                            <td>{getValueOrEmpty(item.info.ENERC_KCAL)}</td>
                            <td>{getValueOrEmpty(item.info.FAT)}</td>
                            <td>{getValueOrEmpty(item.info.SUGAR)}</td>
                            <td>{getValueOrEmpty(item.info.PROCNT)}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Card> : ''}
            {nutritionTips.length > 0 ? <Card>
                <Typography level="h2" sx={{mb: 2}}>
                    Nutrition Tips
                </Typography>
                <List>
                    {nutritionTips.map((tip, index) => (
                        <ListItem key={index}>
                            <ListItemContent>
                                <Typography level="body2">{tip}</Typography>
                            </ListItemContent>
                        </ListItem>
                    ))}
                </List>
            </Card> : ''}
        </Container>
    );
};
