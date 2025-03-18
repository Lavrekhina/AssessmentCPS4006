import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Home } from "./components/pages/home";
import { News } from "./components/pages/news";
import { Profile } from "./components/pages/profile";
import { Symptoms } from "./components/pages/symptoms";
import { Nutrition } from "./components/pages/nutritional";
import { MentalTools } from "./components/pages/mental-tools";
import { HealthConditions } from "./components/pages/health-conditions";
import { HealthCondition } from "./components/pages/health-condition";
import { NotFound } from "./components/pages/not_found";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/symptoms-checker" element={<Symptoms />} />
        <Route path="/nutritional" element={<Nutrition />} />
        <Route path="/mental-tools" element={<MentalTools />} />
        <Route path="/health-conditions/" element={<HealthConditions />} />
         
        <Route
          path="/health-conditions/:conditionId"
          element={<HealthCondition />}
        />
         
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
