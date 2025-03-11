import { useState } from "react";

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
    return (weight / Math.pow(height / 100, 2)).toPrecision(4);
  };

  return (
    <div>
      <h1>Home page</h1>
      <div>
        <div>
          <input
            placeholder="Enter your height"
            type="number"
            value={height}
            onChange={handleHeightChange}
          />
        </div>
        <div>
          <input
            placeholder="Enter your weight"
            type="number"
            value={weight}
            onChange={handleWeightChange}
          />
        </div>
        <div>Your BMI: {calculateBodyIndex(weight, height)}</div>
      </div>
    </div>
  );
};
