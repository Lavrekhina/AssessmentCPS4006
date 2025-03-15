import { useState } from "react";
import {
  Card,
  Container,
  Title,
  Input,
  Button,
  Result,
  Header,
} from "../not_found/styles";

export const Home = () => {
  const [height, setHeight] = useState(0);
  const handleHeightChange = (event) => {
    setHeight(event.target.valueAsNumber);
  };
  const [weight, setWeight] = useState(0);
  const handleWeightChange = (event) => {
    setWeight(event.target.valueAsNumber);
  };

  const calculateBodyIndex = (weight, height) => {
    return (weight / Math.pow(height / 100, 2)).toFixed(2);
  };

  return (
    <Container>
      <Header>Home Page</Header>
      <Card>
        <Title>BMI Calculator</Title>
        <Input
          placeholder="Enter your height in cm"
          type="number"
          value={height}
          onChange={handleHeightChange}
        />
        <Input
          placeholder="Enter your weight in kg"
          type="number"
          value={weight}
          onChange={handleWeightChange}
        />
        <Button>Calculate BMI</Button>
        <Result>Your BMI: {calculateBodyIndex(weight, height)}</Result>
      </Card>
    </Container>
  );
};
