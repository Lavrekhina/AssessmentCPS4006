import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Home } from "./components/pages/home";
import { NotFound } from "./components/pages/not_found";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </div>
  );
}

export default App;
