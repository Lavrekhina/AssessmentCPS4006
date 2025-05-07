import {useState} from "react";
import {
    Typography,
    Card,
    Stack,
    Input,
    Button,
    Divider,
    List,
    ListItem,
    ListItemContent,
    Select,
    Option, Box,
} from "@mui/joy";
import gptService from "../../../utils/services/gptService";
import {Container} from '../../ui/container';
import {useAuth} from "../../../contexts/AuthContext.jsx";

export const Symptoms = () => {
    const {user, updateUser} = useAuth();

    const [symptom, setSymptom] = useState("");
    const [severity, setSeverity] = useState("");
    const [notes, setNotes] = useState("");
    const [symptomsList, setSymptomsList] = useState(!user.symptoms ? [] : user.symptoms);
    const [suggestion, setSuggestion] = useState("");

    const handleAddSymptom = () => {
        if (!severity || !symptom || !notes) {
            return;
        }

        const data = {
            id: Date.now(),
            symptom,
            severity,
            notes,
            suggestion: '',
            date: new Date().toLocaleDateString(),
        }

        symptomsList.push(data)
        user.symptoms = symptomsList;
        updateUser(user);

        setSymptomsList(user.symptoms);

        setSymptom("");
        setSeverity("");
        setNotes("");
    };

    const commonSymptoms = [
        "Headache",
        "Fever",
        "Cough",
        "Fatigue",
        "Muscle pain",
        "Shortness of breath",
        "Nausea",
        "Dizziness",
    ];

    const makeSuggestion = async () => {
        const response = await gptService.suggest(
            symptomsList.map((S) => {
                return `${S.symptom} severity:${S.severity} notes:${S.notes}`;
            })
        );
        setSuggestion(response.choices[0].message.content);
    };

    const makeSuggestionFor = async (item) => {
        const response = await gptService.suggest(
            [`${item.symptom} severity:${item.severity} notes:${item.notes}`]
        );

        item.suggestion = response.choices[0].message.content;
        user.symptoms = symptomsList;
        updateUser(user);
    };

    return (
        <Container spacing={3}>
            <Card>
                <Typography level="h1" sx={{mb: 2}}>
                    Symptom Tracker
                </Typography>
                <Typography level="body1" sx={{mb: 2}}>
                    Track your symptoms and monitor your health indicators over time.
                </Typography>
            </Card>

            <Card>
                <Typography level="h2" sx={{mb: 2}}>
                    Add New Symptom
                </Typography>
                <Stack spacing={2}>
                    <div>
                        <Typography level="body2" sx={{mb: 1}}>
                            Symptom
                        </Typography>
                        <Select
                            placeholder="Select a symptom"
                            value={symptom}
                            onChange={(_, value) => setSymptom(value)}
                        >
                            {commonSymptoms.map((symptom) => (
                                <Option key={symptom} value={symptom}>
                                    {symptom}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <Typography level="body2" sx={{mb: 1}}>
                            Severity
                        </Typography>
                        <Select
                            placeholder="Select severity level"
                            value={severity}
                            onChange={(_, value) => setSeverity(value)}
                        >
                            <Option value="mild">Mild</Option>
                            <Option value="moderate">Moderate</Option>
                            <Option value="severe">Severe</Option>
                        </Select>
                    </div>

                    <div>
                        <Typography level="body2" sx={{mb: 1}}>
                            Additional Notes
                        </Typography>
                        <Input
                            placeholder="Add any additional details about your symptom"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleAddSymptom} sx={{mt: 2}}>
                        Add Symptom
                    </Button>
                </Stack>
            </Card>

            <Card>
                <Typography level="h2" sx={{mb: 2}}>
                    Your Symptoms History
                </Typography>
                <List>
                    {symptomsList.map((item) => (
                        <ListItem key={item.id} xs={{marginBottom: '15px'}}>
                            <ListItemContent >
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyItems: 'start',
                                    gap: 1,
                                    justifyContent: 'space-between',
                                    alignItems: 'start'
                                }}>
                                    <Box sx={{display: 'flex', justifyItems: 'start',flexDirection: 'column', gap: 1, alignItems: 'start'}}>
                                        <Typography level="title-md">
                                            {item.symptom} - {item.severity}
                                        </Typography>
                                        <Typography level="body2">Date: {item.date}</Typography>
                                        {item.notes && (
                                            <Typography level="body2">Notes: {item.notes}</Typography>
                                        )}
                                    </Box>

                                    <Box sx={{
                                        maxWidth: '70%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyItems: 'end',
                                        gap: 4,
                                        alignItems: 'center'
                                    }}>
                                        <Typography level="body2">{item.suggestion}</Typography>
                                        <Button onClick={() => makeSuggestionFor(item)}>Make Suggestion </Button>
                                    </Box>
                                </Box>

                            </ListItemContent>
                        </ListItem>
                    ))}
                    {symptomsList.length === 0 && (
                        <Typography level="body2" color="neutral">
                            No symptoms recorded yet
                        </Typography>
                    )}
                </List>
            </Card>

            <Card>
                <Typography level="h2" sx={{mb: 2}}>
                    Suggestion for your symptom
                </Typography>
                <Stack>
                    <List>
                        <ListItem>
                            <ListItemContent>
                                <Typography level="body2">{suggestion}</Typography>
                            </ListItemContent>
                        </ListItem>
                    </List>
                    <Button onClick={makeSuggestion}>Make Suggestion </Button>
                </Stack>
            </Card>
        </Container>
    );
};
