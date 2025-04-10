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
} from "@mui/joy";

export const Nutrition = () => {
  const [mealPlan, setMealPlan] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: "",
  });

  const handleMealPlanChange = (meal, value) => {
    setMealPlan((prev) => ({
      ...prev,
      [meal]: value,
    }));
  };

  const nutritionTips = [
    "Eat a variety of fruits and vegetables daily",
    "Include whole grains in your diet",
    "Choose lean protein sources",
    "Limit processed foods and added sugars",
    "Stay hydrated by drinking plenty of water",
  ];

  return (
    <Stack spacing={3}>
      <Card>
        <Typography level="h1" sx={{ mb: 2 }}>
          Nutrition Guide
        </Typography>
        <Typography level="body1" sx={{ mb: 2 }}>
          Track your daily meals and get personalized nutrition advice to
          maintain a healthy diet.
        </Typography>
      </Card>

      <Card>
        <Typography level="h2" sx={{ mb: 2 }}>
          Daily Meal Plan
        </Typography>
        <Stack spacing={2}>
          <div>
            <Typography level="body2" sx={{ mb: 1 }}>
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
            <Typography level="body2" sx={{ mb: 1 }}>
              Lunch
            </Typography>
            <Input
              placeholder="What did you have for lunch?"
              value={mealPlan.lunch}
              onChange={(e) => handleMealPlanChange("lunch", e.target.value)}
            />
          </div>

          <div>
            <Typography level="body2" sx={{ mb: 1 }}>
              Dinner
            </Typography>
            <Input
              placeholder="What did you have for dinner?"
              value={mealPlan.dinner}
              onChange={(e) => handleMealPlanChange("dinner", e.target.value)}
            />
          </div>

          <div>
            <Typography level="body2" sx={{ mb: 1 }}>
              Snacks
            </Typography>
            <Input
              placeholder="What snacks did you have?"
              value={mealPlan.snacks}
              onChange={(e) => handleMealPlanChange("snacks", e.target.value)}
            />
          </div>

          <Button sx={{ mt: 2 }}>Save Meal Plan</Button>
        </Stack>
      </Card>

      <Card>
        <Typography level="h2" sx={{ mb: 2 }}>
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
      </Card>
    </Stack>
  );
};
