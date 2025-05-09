import React, {useMemo, useState} from 'react';
import {
    Box,
    Typography,
    Sheet,
    Slider,
    Stack,
    Card,
    CardContent,
    Divider, Button, ListItem, ListItemContent, List,
} from '@mui/joy';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import {Container} from '../../ui/container';
import {useAuth} from "../../../contexts/AuthContext.jsx";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import EditIcon from "@mui/icons-material/Edit";
import BarChartIcon from "@mui/icons-material/BarChart";
import Input from "@mui/joy/Input";
import {LineChart} from "@mui/x-charts";
import gptService from "../../../utils/services/gptService.js";

const moodIcons = [
    <SentimentVeryDissatisfiedIcon sx={{color: '#ff1744'}}/>,
    <SentimentDissatisfiedIcon sx={{color: '#ff5252'}}/>,
    <SentimentNeutralIcon sx={{color: '#ffd740'}}/>,
    <SentimentSatisfiedIcon sx={{color: '#69f0ae'}}/>,
    <SentimentVerySatisfiedIcon sx={{color: '#00e676'}}/>,
];

const moodLabels = ['Very Low', 'Low', 'Neutral', 'Good', 'Very Good'];

export const MentalTools = () => {
    const {user, updateUser} = useAuth();

    const [suggestionIsLoading, setSuggestionIsLoading] = useState(false);
    const [mentalHistory, setMentalHistory] = useState(user.mentalHealthRecords
        ? user.mentalHealthRecords
        : [])
    const [recommendations, setRecommendations] = useState([]);
    const [healthData, setHealthData] = useState("form");
    const [date, setDate] = useState(new Date());
    const [mood, setMood] = useState(2);
    const [energy, setEnergy] = useState(2);
    const [stress, setStress] = useState(2);
    const [sleep, setSleep] = useState(2);
    const [anxiety, setAnxiety] = useState(2);

    const handleMoodChange = (event, newValue) => {
        setMood(newValue);
    };
    const handleEnergyChange = (event, newValue) => {
        setEnergy(newValue);
    };
    const handleStressChange = (event, newValue) => {
        setStress(newValue);
    };
    const handleSleepChange = (event, newValue) => {
        setSleep(newValue);
    };
    const handleAnxietyChange = (event, newValue) => {
        setAnxiety(newValue);
    };
    const handleHealthData = (event, newAlignment) => {
        setHealthData(newAlignment);
    };
    const resetMentalState = () => {
        setMood(2);
        setEnergy(2);
        setStress(2);
        setSleep(2);
        setAnxiety(2);
    }
    const saveMentalState = async () => {
        setSuggestionIsLoading(true);
        const data = {
            mood: mood,
            energy: energy,
            stress: stress,
            sleep: sleep,
            anxiety: anxiety,
            date: date
        }
        mentalHistory.push(data)
        user.mentalHealthRecords = mentalHistory;
        updateUser(user);

        setMentalHistory([...user.mentalHealthRecords]);
        try {
            const rquest = Object.keys(data).map(key => {
                return `${key}: ${data[key]}`;
            }).join(",");
            setRecommendations(await gptService.suggestMental(rquest));

        } catch (e) {
            console.error(e);
        }
        resetMentalState();
        setSuggestionIsLoading(false);
    }

    const floorToDay = (dateInput) => {
        console.log(dateInput)
        const date = new Date(dateInput);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const aggregatedData = useMemo(() => {
        var groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] ??= []).push(x);
                return rv;
            }, {});
        };

        let xAxis = {
            data: [],
            scaleType: "band"
        }
        let grouped = groupBy(mentalHistory.sort((a, b) => new Date(a.date) - new Date(b.date)).map(value => {
            return {...value, date: formatDate(floorToDay(new Date(value.date)))}
        }), "date");


        let moodData = {data: [], label: 'Mood', area: true, curve: "monotoneX",};
        let stressData = {data: [], label: 'Stress level', area: true, curve: "monotoneX",}
        let anxietyData = {data: [], label: 'Anxiety', area: true, curve: "monotoneX",}
        let energyData = {data: [], label: 'Energy level', area: true, curve: "monotoneX",}
        let sleepData = {data: [], label: 'Sleep quality', area: true, curve: "monotoneX",}

        for (let date in grouped) {
            let mentalRecord = grouped[date][0];
            console.log(mentalRecord);
            xAxis.data.push(date);
            moodData.data.push(mentalRecord.mood);
            stressData.data.push(mentalRecord.stress);
            anxietyData.data.push(mentalRecord.anxiety);
            energyData.data.push(mentalRecord.energy);
            sleepData.data.push(mentalRecord.sleep);
        }

        return [
            {
                xAxis: [xAxis],
                series: [moodData],
                yAxis: [{
                    colorMap: {
                        type: 'continuous',
                        min: -1,
                        max: 2,
                        color: ['#ff1744', '#00e676'],
                    }
                }]
            },
            {
                xAxis: [xAxis],
                series: [stressData],
                yAxis: [{
                    colorMap: {
                        type: 'continuous',
                        min: 0,
                        max: 2,
                        color: ['#00e676', '#ff1744'],
                    }
                }]
            },
            {
                xAxis: [xAxis],
                series: [anxietyData],
                yAxis: [{
                    colorMap: {
                        type: 'continuous',
                        min: 0,
                        max: 2,
                        color: ['#00e676', '#ff1744'],
                    }
                }]
            },
            {
                xAxis: [xAxis],
                series: [energyData],
                yAxis: [{
                    colorMap: {
                        type: 'continuous',
                        min: 0,
                        max: 2,
                        color: ['#ff1744', '#00e676'],
                    }
                }]
            },
            {
                xAxis: [xAxis],
                series: [sleepData],
                yAxis: [{
                    colorMap: {
                        type: 'continuous',
                        min: 0,
                        max: 2,
                        color: ['#ff1744', '#00e676'],
                    }
                }]
            }
        ];
    }, [mentalHistory]);
    return (
        <Container spacing={3}>
            <Card>
                <Typography level="h1" sx={{mb: 2}}>
                    Mental State Assessment
                </Typography>
                <Typography level="body1" sx={{mb: 2}}>
                    Reflect on your mood daily and receive personalized insights to support mental well-being and
                    emotional balance.
                </Typography>
            </Card>

            <Card variant="outlined" sx={{mb: 3}}>
                <CardContent>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography level="h4" sx={{mb: 2}}>
                            How are you feeling today?
                        </Typography>
                        <ToggleButtonGroup
                            value={healthData}
                            exclusive
                            onChange={handleHealthData}
                            aria-label="text alignment"
                        >
                            <ToggleButton value="form" aria-label="left aligned">
                                <EditIcon/>
                            </ToggleButton>
                            <ToggleButton value="chart" aria-label="centered">
                                <BarChartIcon/>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>


                    {healthData === "form" ? (
                        <Stack spacing={4}>
                            <Box>
                                <Typography level="title-lg" sx={{mb: 1}}>
                                    Overall Mood
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {moodIcons[mood]}
                                    <Slider
                                        value={mood}
                                        onChange={handleMoodChange}
                                        min={0}
                                        max={4}
                                        step={1}
                                        marks
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => moodLabels[value]}
                                        sx={{flex: 1}}
                                    />
                                </Stack>
                            </Box>

                            <Box>
                                <Typography level="title-lg" sx={{mb: 1}}>
                                    Energy Level
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {moodIcons[energy]}
                                    <Slider
                                        value={energy}
                                        onChange={handleEnergyChange}
                                        min={0}
                                        max={4}
                                        step={1}
                                        marks
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => moodLabels[value]}
                                        sx={{flex: 1}}
                                    />
                                </Stack>
                            </Box>

                            <Box>
                                <Typography level="title-lg" sx={{mb: 1}}>
                                    Stress Level
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {moodIcons[4 - stress]}
                                    <Slider
                                        value={stress}
                                        onChange={handleStressChange}
                                        min={0}
                                        max={4}
                                        step={1}
                                        marks
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => moodLabels[4 - value]}
                                        sx={{flex: 1}}
                                    />
                                </Stack>
                            </Box>

                            <Box>
                                <Typography level="title-lg" sx={{mb: 1}}>
                                    Sleep Quality
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {moodIcons[sleep]}
                                    <Slider
                                        value={sleep}
                                        onChange={handleSleepChange}
                                        min={0}
                                        max={4}
                                        step={1}
                                        marks
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => moodLabels[value]}
                                        sx={{flex: 1}}
                                    />
                                </Stack>
                            </Box>

                            <Box>
                                <Typography level="title-lg" sx={{mb: 1}}>
                                    Anxiety Level
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {moodIcons[4 - anxiety]}
                                    <Slider
                                        value={anxiety}
                                        onChange={handleAnxietyChange}
                                        min={0}
                                        max={4}
                                        step={1}
                                        marks
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => moodLabels[4 - value]}
                                        sx={{flex: 1}}
                                    />
                                </Stack>
                            </Box>

                            <Box>
                                <Typography level="title-lg" sx={{mb: 1}}>
                                    On Date
                                </Typography>
                                <Input defaultValue={'01/01/2021'}
                                       onChange={(e) => setDate(e.target.value)}
                                       type="date"/>
                            </Box>

                            <Button disabled={!date || suggestionIsLoading}
                                    loading={suggestionIsLoading}
                                    onClick={saveMentalState} sx={{mt: 2}}>
                                Save state an get Recommendations
                            </Button>
                        </Stack>
                    ) : (
                        <Stack spacing={4}>
                            {aggregatedData.map((value) => (
                                <LineChart
                                    sx={{
                                        '& .MuiLineElement-root': {
                                            strokeDasharray: '10 5',
                                            strokeWidth: 4,
                                        },
                                        '& .MuiAreaElement-series-Germany': {
                                            fill: "url('#myGradient')",
                                        },
                                    }}
                                    yAxis={value.yAxis}
                                    xAxis={value.xAxis}
                                    series={value.series}
                                    height={300}
                                />
                            ))}
                        </Stack>
                    )}

                </CardContent>
            </Card>

            {recommendations.length > 0 ? (
                <Card>
                    <Typography level="h2" sx={{mb: 2}}>
                        Recommendations on your state
                    </Typography>
                    <List>
                        {recommendations.map((value) => (
                            <ListItem>
                                <ListItemContent>
                                    <Typography level="body2">{value}</Typography>
                                </ListItemContent>
                            </ListItem>
                        ))}
                    </List>
                </Card>
            ) : (
                <div></div>
            )}

        </Container>
    );
};
