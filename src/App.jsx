import { useState } from "react";
import { Home } from "./components/pages/home";
import { News } from "./components/pages/news";
import { Profile } from "./components/pages/profile";
import { Symptoms } from "./components/pages/symptoms";
import { Nutrition } from "./components/pages/nutritional";
import { MentalTools } from "./components/pages/mental-tools";
import { HealthConditions } from "./components/pages/health-conditions";
import { NotFound } from "./components/pages/not_found";
import { Routes, Route, Navigate } from "react-router-dom";
import { LayoutMain } from "./components/layouts/main";
import "normalize.css";
import { UserContext } from "./contexts/user";
import { SignIn } from "./components/pages/signin";

export const App = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    age: "",
  });

  const isUserSignedIn = !!userData.fullName;

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <LayoutMain>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/symptoms-checker" element={<Symptoms />} />
          <Route path="/nutritional" element={<Nutrition />} />
          <Route
            path="/profile"
            element={isUserSignedIn ? <Profile /> : <Navigate to="/signin" />}
          />
          <Route
            path="/mental-tools"
            element={
              isUserSignedIn ? <MentalTools /> : <Navigate to="/signin" />
            }
          />
          <Route path="/health-conditions" element={<HealthConditions />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutMain>
    </UserContext.Provider>
  );
};

export default App;
