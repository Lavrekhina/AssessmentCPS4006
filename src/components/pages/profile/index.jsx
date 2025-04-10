import * as styles from "./styles";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import Table from "@mui/joy/Table";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Typography, Card, Stack, Divider } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/joy/IconButton";
import { UserContext } from "../../../contexts/user";
import { notifier } from "../../../utils/notifier";

const healthSchema = Yup.object().shape({
  steps: Yup.number().min(0, "Steps value should be positive number"),
  waterIntake: Yup.number().min(0, "Water value should be positive number"),
  calories: Yup.number().min(0, "Calories value should be positive number"),
});

const medicationSchema = Yup.object().shape({
  medicationName: Yup.string().required("Medication name is required"),
  dosage: Yup.string().required("Dosage is required"),
  time: Yup.string().required("Time is required"),
  frequency: Yup.string().required("Frequency is required"),
});

const profileSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number().min(0, "Age must be positive").required("Age is required"),
});

export const Profile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [healthRecords, setHealthRecords] = useState([]);
  const [medicationReminders, setMedicationReminders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register: registerHealth,
    handleSubmit: handleHealthSubmit,
    formState: { errors: healthErrors },
  } = useForm({
    resolver: yupResolver(healthSchema),
  });

  const {
    register: registerMedication,
    handleSubmit: handleMedicationSubmit,
    formState: { errors: medicationErrors },
  } = useForm({
    resolver: yupResolver(medicationSchema),
  });

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: userData,
  });

  const onHealthSubmit = (data) => {
    setHealthRecords([...healthRecords, { ...data, date: new Date() }]);
  };

  const onMedicationSubmit = (data) => {
    setMedicationReminders([...medicationReminders, data]);
    // Set up notification
    scheduleMedicationReminder(data);
  };

  const onProfileSubmit = (data) => {
    setUserData(data);
    setIsEditing(false);
  };

  const scheduleMedicationReminder = (medication) => {
    const now = new Date();
    const [hours, minutes] = medication.time.split(":");
    const reminderTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
    notifier.addNotification({
      time: reminderTime,
      title: "Time to take meds",
      body: "Body",
    });
  };

  return (
    <Stack spacing={3}>
      <Card>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography level="h2">Profile Information</Typography>
          {!isEditing && (
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
          )}
        </Stack>
        {isEditing ? (
          <styles.Form onSubmit={handleProfileSubmit(onProfileSubmit)}>
            <FormControl error={!!profileErrors.fullName}>
              <FormLabel>Full Name</FormLabel>
              <Input {...registerProfile("fullName")} />
              {profileErrors.fullName && (
                <FormHelperText>
                  {profileErrors.fullName.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!profileErrors.email}>
              <FormLabel>Email</FormLabel>
              <Input {...registerProfile("email")} type="email" />
              {profileErrors.email && (
                <FormHelperText>{profileErrors.email.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!profileErrors.age}>
              <FormLabel>Age</FormLabel>
              <Input {...registerProfile("age")} type="number" />
              {profileErrors.age && (
                <FormHelperText>{profileErrors.age.message}</FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button variant="plain" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </Stack>
          </styles.Form>
        ) : (
          <Stack spacing={1}>
            <Typography>Name: {userData.fullName}</Typography>
            <Typography>Email: {userData.email}</Typography>
            <Typography>Age: {userData.age}</Typography>
          </Stack>
        )}
      </Card>

      <Card>
        <Typography level="h2">Health Indicators</Typography>
        <styles.Form onSubmit={handleHealthSubmit(onHealthSubmit)}>
          <FormControl error={!!healthErrors.steps}>
            <FormLabel>Steps</FormLabel>
            <Input {...registerHealth("steps")} type="number" />
            {healthErrors.steps && (
              <FormHelperText>{healthErrors.steps.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!healthErrors.waterIntake}>
            <FormLabel>Water Intake (ml)</FormLabel>
            <Input {...registerHealth("waterIntake")} type="number" />
            {healthErrors.waterIntake && (
              <FormHelperText>
                {healthErrors.waterIntake.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!healthErrors.calories}>
            <FormLabel>Calories</FormLabel>
            <Input {...registerHealth("calories")} type="number" />
            {healthErrors.calories && (
              <FormHelperText>{healthErrors.calories.message}</FormHelperText>
            )}
          </FormControl>
          <Button type="submit">Save Health Data</Button>
        </styles.Form>

        <Table>
          <thead>
            <tr>
              <th>Steps</th>
              <th>Water Intake</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {healthRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.steps}</td>
                <td>{record.waterIntake}</td>
                <td>{record.calories}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Card>
        <Typography level="h2">Medication Reminders</Typography>
        <styles.Form onSubmit={handleMedicationSubmit(onMedicationSubmit)}>
          <FormControl error={!!medicationErrors.medicationName}>
            <FormLabel>Medication Name</FormLabel>
            <Input {...registerMedication("medicationName")} />
            {medicationErrors.medicationName && (
              <FormHelperText>
                {medicationErrors.medicationName.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!medicationErrors.dosage}>
            <FormLabel>Dosage</FormLabel>
            <Input {...registerMedication("dosage")} />
            {medicationErrors.dosage && (
              <FormHelperText>{medicationErrors.dosage.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!medicationErrors.time}>
            <FormLabel>Time</FormLabel>
            <Input {...registerMedication("time")} type="time" />
            {medicationErrors.time && (
              <FormHelperText>{medicationErrors.time.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!medicationErrors.frequency}>
            <FormLabel>Frequency</FormLabel>
            <Input {...registerMedication("frequency")} />
            {medicationErrors.frequency && (
              <FormHelperText>
                {medicationErrors.frequency.message}
              </FormHelperText>
            )}
          </FormControl>
          <Button type="submit">Add Reminder</Button>
        </styles.Form>

        <Table>
          <thead>
            <tr>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Time</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            {medicationReminders.map((reminder, index) => (
              <tr key={index}>
                <td>{reminder.medicationName}</td>
                <td>{reminder.dosage}</td>
                <td>{reminder.time}</td>
                <td>{reminder.frequency}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Stack>
  );
};
