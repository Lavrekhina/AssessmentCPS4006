import { useState } from "react";
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
  Option,
} from "@mui/joy";

export const Symptoms = () => {
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState("");
  const [notes, setNotes] = useState("");
  const [symptomsList, setSymptomsList] = useState([]);

  const handleAddSymptom = () => {
    if (symptom && severity) {
      setSymptomsList([
        ...symptomsList,
        {
          id: Date.now(),
          symptom,
          severity,
          notes,
          date: new Date().toLocaleDateString(),
        },
      ]);
      setSymptom("");
      setSeverity("");
      setNotes("");
    }
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

  return (
    <Stack spacing={3}>
      <Card>
        <Typography level="h1" sx={{ mb: 2 }}>
          Symptom Tracker
        </Typography>
        <Typography level="body1" sx={{ mb: 2 }}>
          Track your symptoms and monitor your health indicators over time.
        </Typography>
      </Card>

      <Card>
        <Typography level="h2" sx={{ mb: 2 }}>
          Add New Symptom
        </Typography>
        <Stack spacing={2}>
          <div>
            <Typography level="body2" sx={{ mb: 1 }}>
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
            <Typography level="body2" sx={{ mb: 1 }}>
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
            <Typography level="body2" sx={{ mb: 1 }}>
              Additional Notes
            </Typography>
            <Input
              placeholder="Add any additional details about your symptom"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button onClick={handleAddSymptom} sx={{ mt: 2 }}>
            Add Symptom
          </Button>
        </Stack>
      </Card>

      <Card>
        <Typography level="h2" sx={{ mb: 2 }}>
          Your Symptoms History
        </Typography>
        <List>
          {symptomsList.map((item) => (
            <ListItem key={item.id}>
              <ListItemContent>
                <Typography level="title-md">
                  {item.symptom} - {item.severity}
                </Typography>
                <Typography level="body2">Date: {item.date}</Typography>
                {item.notes && (
                  <Typography level="body2">Notes: {item.notes}</Typography>
                )}
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
    </Stack>
  );
};
