import * as styles from "./styles";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import {useForm} from "react-hook-form";
import {useMemo, useState} from "react";
import Table from "@mui/joy/Table";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {Typography, Card, Stack, Divider} from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import BarChartIcon from "@mui/icons-material/BarChart";

import IconButton from "@mui/joy/IconButton";
import {notifier} from "../../../utils/notifier";
import {useAuth} from "../../../contexts/AuthContext.jsx";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {BarChart} from "@mui/x-charts/BarChart";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import { Container } from '../../ui/container';


const healthSchema = Yup.object().shape({
    steps: Yup.number().min(0, "Steps value should be positive number"),
    waterIntake: Yup.number().min(0, "Water value should be positive number"),
    calories: Yup.number().min(0, "Calories value should be positive number"),
    date: Yup.date().required("Specify day"),

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
    const {logout, user, updateUser} = useAuth();

    const [healthData, setHealthData] = useState("editing");
    const [healthRecords, setHealthRecords] = useState(user.healthRecords);
    const [medicationReminders, setMedicationReminders] = useState(
        user.medicationReminders
    );
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const {
        register: registerHealth,
        handleSubmit: handleHealthSubmit,
        formState: {errors: healthErrors},
    } = useForm({
        resolver: yupResolver(healthSchema),
    });

    const {
        register: registerMedication,
        handleSubmit: handleMedicationSubmit,
        formState: {errors: medicationErrors},
    } = useForm({
        resolver: yupResolver(medicationSchema),
    });

    const {
        register: registerProfile,
        handleSubmit: handleProfileSubmit,
        formState: {errors: profileErrors},
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: user,
    });

    const handleHealthData = (event, newAlignment) => {
        setHealthData(newAlignment);
    };

    const onHealthSubmit = (data) => {
        healthRecords.push(data)
        user.healthRecords = healthRecords;
        updateUser(user);

        setHealthRecords([...user.healthRecords]);
    };

    const onMedicationSubmit = (data) => {
        setMedicationReminders([...medicationReminders, data]);
        scheduleMedicationReminder(data);

        user.medicationReminders = medicationReminders;
        updateUser(user);
    };

    const onProfileSubmit = (data) => {
        updateUser(data);
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

    const handleLogOut = () => {
        try {
            logout();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
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

        let series = []
        let xAxis = {
            data: [],
            scaleType: "band"
        }
        let dataset = [];
        let grouped = groupBy(healthRecords.sort((a, b) => new Date(a.date) - new Date(b.date)).map(value => {
            return {...value, date: formatDate(floorToDay(new Date(value.date)))}
        }), "date");

        for (let date in grouped) {
            let healthRecord = grouped[date];
            xAxis.data.push(date);

            dataset.push({
                date: date,
                calories: healthRecord.reduce((partialSum, a) => partialSum + a.calories, 0),
                waterIntake: healthRecord.reduce((partialSum, a) => partialSum + a.waterIntake, 0),
                steps: healthRecord.reduce((partialSum, a) => partialSum + a.steps, 0)
            })
        }

        console.log({series: series, dataset: dataset})
        return {series: series, dataset: dataset};
    }, [healthRecords]);

    return (
        <Container spacing={3}>
            <Card>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography level="h2">Profile Information</Typography>
                    {!isEditing && (
                        <IconButton onClick={() => setIsEditing(true)}>
                            <EditIcon/>
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
                            <Input {...registerProfile("email")} type="email"/>
                            {profileErrors.email && (
                                <FormHelperText>{profileErrors.email.message}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl error={!!profileErrors.age}>
                            <FormLabel>Age</FormLabel>
                            <Input {...registerProfile("age")} type="number"/>
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
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignitems="end"
                        justifyItems="end"
                    >
                        <Stack spacing={1}>
                            <Typography>Name: {user.fullName}</Typography>
                            <Typography>Email: {user.email}</Typography>
                            <Typography>Age: {user.age}</Typography>
                        </Stack>
                        <Button sx={{height: 40}} onClick={handleLogOut}>
                            Log out
                        </Button>
                    </Stack>
                )}
            </Card>
            <Card>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography level="h2">Health Indicators</Typography>
                    <ToggleButtonGroup
                        value={healthData}
                        exclusive
                        onChange={handleHealthData}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="editing" aria-label="left aligned">
                            <EditIcon/>
                        </ToggleButton>
                        <ToggleButton value="chart" aria-label="centered">
                            <BarChartIcon/>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>

                {healthData === "editing" ? (
                    <>
                        <styles.Form onSubmit={handleHealthSubmit(onHealthSubmit)}>
                            <FormControl error={!!healthErrors.steps}>
                                <FormLabel>Steps</FormLabel>
                                <Input {...registerHealth("steps")} type="number"/>
                                {healthErrors.steps && (
                                    <FormHelperText>{healthErrors.steps.message}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl error={!!healthErrors.waterIntake}>
                                <FormLabel>Water Intake (ml)</FormLabel>
                                <Input {...registerHealth("waterIntake")} type="number"/>
                                {healthErrors.waterIntake && (
                                    <FormHelperText>
                                        {healthErrors.waterIntake.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl error={!!healthErrors.calories}>
                                <FormLabel>Calories</FormLabel>
                                <Input {...registerHealth("calories")} type="number"/>
                                {healthErrors.calories && (
                                    <FormHelperText>
                                        {healthErrors.calories.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl error={!!healthErrors.calories}>
                                <FormLabel>Calories</FormLabel>
                                <Input {...registerHealth("date")} type="date"/>
                                {healthErrors.date && (
                                    <FormHelperText>
                                        {healthErrors.date.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Button type="submit">Save</Button>
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
                            {healthRecords.sort((a, b) => new Date(a.date) - new Date(b.date)).map((record, index) => (
                                <tr key={index}>
                                    <td>{record.steps}</td>
                                    <td>{record.waterIntake}</td>
                                    <td>{record.calories}</td>
                                    <td>{new Date(record.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <div>
                        <BarChart
                            dataset={aggregatedData.dataset}
                            xAxis={[{scaleType: 'band', dataKey: 'date'}]}
                            series={[
                                {dataKey: 'calories', label: 'Calories'},
                                {dataKey: 'waterIntake', label: 'Water intake'},
                                {dataKey: 'steps', label: 'Steps'},
                            ]}
                            height={350}
                        />
                    </div>
                )}
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
                        <Input {...registerMedication("time")} type="time"/>
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
        </Container>
    );
};
