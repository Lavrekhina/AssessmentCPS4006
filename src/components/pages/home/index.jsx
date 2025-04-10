import { useState } from "react";
import { Link } from "react-router-dom";
import * as styles from "./styles";
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
} from "@mui/joy";

// Local data for platform features
const platformFeatures = [
  {
    title: "Health Conditions",
    path: "/health-conditions",
    description: "Track and manage your health conditions and medications",
  },
  {
    title: "Mental Tools",
    path: "/mental-tools",
    description: "Access mental health resources and tools for wellbeing",
  },
  {
    title: "Nutrition",
    path: "/nutritional",
    description: "Get personalized nutrition advice and meal planning",
  },
  {
    title: "Symptoms",
    path: "/symptoms-checker",
    description: "Track and monitor your symptoms and health indicators",
  },
  {
    title: "Profile",
    path: "/profile",
    description: "Manage your personal information and health data",
  },
];

// Local data for BMI categories and tips
const bmiCategories = {
  underweight: {
    range: [0, 18.5],
    tips: [
      "Increase calorie intake with healthy foods",
      "Include protein-rich foods in your diet",
      "Consider strength training to build muscle",
    ],
  },
  normal: {
    range: [18.5, 25],
    tips: [
      "Maintain your current healthy habits",
      "Continue regular physical activity",
      "Eat a balanced diet with variety",
    ],
  },
  overweight: {
    range: [25, 30],
    tips: [
      "Focus on portion control",
      "Increase physical activity",
      "Choose whole foods over processed ones",
    ],
  },
  obese: {
    range: [30, Infinity],
    tips: [
      "Consult with a healthcare provider",
      "Start with small, sustainable changes",
      "Focus on gradual weight loss",
    ],
  },
};

export const Home = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [tips, setTips] = useState([]);
  const [error, setError] = useState("");

  const handleHeightChange = (event) => {
    const value = event.target.value;
    setHeight(value);
    setError("");
  };

  const handleWeightChange = (event) => {
    const value = event.target.value;
    setWeight(value);
    setError("");
  };

  const calculateBodyIndex = (weight, height) => {
    return (weight / Math.pow(height / 100, 2)).toFixed(2);
  };

  const getBMICategory = (bmiValue) => {
    for (const [category, data] of Object.entries(bmiCategories)) {
      if (bmiValue >= data.range[0] && bmiValue < data.range[1]) {
        return {
          name: category.charAt(0).toUpperCase() + category.slice(1),
          tips: data.tips,
        };
      }
    }
    return { name: "Unknown", tips: [] };
  };

  const calculateBMI = () => {
    if (!weight || !height) {
      setError("Please enter both height and weight");
      return;
    }

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(heightNum) || isNaN(weightNum)) {
      setError("Please enter valid numbers");
      return;
    }

    if (heightNum <= 0 || weightNum <= 0) {
      setError("Height and weight must be greater than 0");
      return;
    }

    if (heightNum > 300) {
      setError("Please enter height in centimeters (max 300cm)");
      return;
    }

    if (weightNum > 500) {
      setError("Please enter weight in kilograms (max 500kg)");
      return;
    }

    const bmiValue = calculateBodyIndex(weightNum, heightNum);
    setBmi(bmiValue);

    const { name, tips } = getBMICategory(parseFloat(bmiValue));
    setCategory(name);
    setTips(tips);
    setError("");
  };

  return (
    <Stack spacing={3}>
      <Card>
        <Typography level="h1" sx={{ mb: 2 }}>
          Welcome to St Mary's Health Hub
        </Typography>
        <Typography level="body1" sx={{ mb: 2 }}>
          Your comprehensive health and wellness platform designed to help you
          maintain a healthy lifestyle. Our platform provides tools and
          resources to track your health indicators, manage medications, and
          access personalized health information.
        </Typography>
      </Card>

      <Card>
        <Typography level="h2" sx={{ mb: 2 }}>
          Platform Features
        </Typography>
        <List>
          {platformFeatures.map((feature, index) => (
            <ListItem key={index}>
              <ListItemContent>
                <Link to={feature.path}>
                  <Typography level="title-md">{feature.title}</Typography>
                </Link>
                <Typography level="body2">{feature.description}</Typography>
              </ListItemContent>
            </ListItem>
          ))}
        </List>
      </Card>

      <Card>
        <Typography level="h2" sx={{ mb: 2 }}>
          BMI Calculator
        </Typography>
        <Typography level="body2" sx={{ mb: 2 }}>
          Calculate your Body Mass Index (BMI) to understand your weight
          category
        </Typography>

        <Stack spacing={2}>
          <div>
            <Typography level="body2" sx={{ mb: 1 }}>
              Enter your height in centimeters (cm)
            </Typography>
            <Input
              type="number"
              placeholder="e.g., 170"
              value={height}
              onChange={handleHeightChange}
              startDecorator="Height:"
              endDecorator="cm"
              error={!!error}
            />
          </div>

          <div>
            <Typography level="body2" sx={{ mb: 1 }}>
              Enter your weight in kilograms (kg)
            </Typography>
            <Input
              type="number"
              placeholder="e.g., 70"
              value={weight}
              onChange={handleWeightChange}
              startDecorator="Weight:"
              endDecorator="kg"
              error={!!error}
            />
          </div>

          {error && (
            <Typography color="danger" level="body2">
              {error}
            </Typography>
          )}

          <Button
            onClick={calculateBMI}
            disabled={!height || !weight}
            sx={{ mt: 2 }}
          >
            Calculate BMI
          </Button>

          {bmi && !error && (
            <>
              <Divider />
              <Typography level="h3">Your Results</Typography>
              <Typography level="body1">
                Your BMI is: <strong>{bmi}</strong>
              </Typography>
              <Typography level="body1">
                Category: <strong>{category}</strong>
              </Typography>
              {tips.length > 0 && (
                <>
                  <Typography level="h4" sx={{ mt: 2 }}>
                    Health Tips
                  </Typography>
                  <List>
                    {tips.map((tip, index) => (
                      <ListItem key={index}>
                        <Typography level="body2">{tip}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </>
          )}
        </Stack>
      </Card>
    </Stack>
  );
};
