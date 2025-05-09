import {useMemo, useState} from "react";
import {
    Typography,
    Card,
    Stack,
    Input,
    Button,
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

    const [symptomError, setSymptomError] = useState('');
    const [severityError, setSeverityError] = useState('');
    const [notesError, setNotesError] = useState('');

    const [suggestionLoading, setSuggestionLoading] = useState(false);
    const [symptom, setSymptom] = useState("");
    const [severity, setSeverity] = useState("");
    const [notes, setNotes] = useState("");
    const [symptomsList, setSymptomsList] = useState(!user.symptoms ? [] : user.symptoms);
    const [suggestion, setSuggestion] = useState("");
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
            loading: false,
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
    const makeSuggestion = async () => {
        setSuggestionLoading(true);
        const response = await gptService.suggest(
            symptomsList.map((S) => {
                return `${S.symptom} severity:${S.severity} notes:${S.notes}`;
            })
        );
        setSuggestion(response.choices[0].message.content);
        setSuggestionLoading(false);
    };
    const makeSuggestionFor = async (item) => {
        item.loading = true;

        const response = await gptService.suggest(
            [`${item.symptom} severity:${item.severity} notes:${item.notes}`]
        );

        item.suggestion = response.choices[0].message.content;
        user.symptoms = symptomsList;

        setSymptomsList([...user.symptoms]);
        updateUser(user);
        item.loading = false;
    };
    const formValid = useMemo(() => {
        let valid = true;
        if (!symptom) {
            setSymptomError('Field is required');
            valid = false;
        }else{
            setSymptomError('')
        }

        if (!severity) {
            setSeverityError('Field is required');
            valid = false;
        }else{
            setSeverityError('')
        }

        if (!notes) {
            setNotesError('Field is required');
            valid = false;
        }else{
            setNotesError('')
        }

        console.log('is valid' + ' ' + valid)
        return valid;
    }, [symptom, severity, notes]);
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
                            color={symptomError ? 'danger' : 'neutral'}
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
                            color={severityError ? 'danger' : 'neutral'}
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
                            error={notesError}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleAddSymptom} sx={{mt: 2}} disabled={!formValid}>
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
                            <ListItemContent>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyItems: 'start',
                                    gap: 1,
                                    justifyContent: 'space-between',
                                    alignItems: 'start'
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyItems: 'start',
                                        flexDirection: 'column',
                                        gap: 1,
                                        alignItems: 'start'
                                    }}>
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

                                        {!item.suggestion ? (
                                            <Button loading={item.loading}

                                                    onClick={() => makeSuggestionFor(item)}>Make
                                                Suggestion </Button>
                                        ) : (<div></div>)}

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
                    <Button disabled={!symptomsList || symptomsList.length === 0} loading={suggestionLoading} onClick={makeSuggestion}>Make
                        Suggestion </Button>
                </Stack>
            </Card>
        </Container>
    );
};
