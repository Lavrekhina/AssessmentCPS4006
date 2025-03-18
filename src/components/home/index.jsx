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

import axios from "axios";

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

  const [apiResponse, setApiResponse] = useState(null);

  const getApiInfo = () => {
    axios
      .get("http://universities.hipolabs.com/search?name=middle")
      .then((response) => {
        setApiResponse(response.data);
      });
  };

  return (
    <Container>
      <Header>Home Page</Header>
      <button onClick={getApiInfo}>Get Info </button>
      <br />
      {apiResponse && (
        <ul>
          {apiResponse.map((value, index) => {
            return (
              <li key={index}>
                <h2> {value.name}</h2>
                <pre style={{ textAlign: "left" }}>
                  {JSON.stringify(value, null, 2)}
                </pre>
              </li>
            );
          })}
        </ul>
      )}
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
