import { useState } from "react";
import { Home } from "./components/pages/home";
import { News } from "./components/pages/news";
import { Profile } from "./components/pages/profile";
import { Symptoms } from "./components/pages/symptoms";
import { Nutrition } from "./components/pages/nutritional";
import { MentalTools } from "./components/pages/mental-tools";
import { HealthConditions } from "./components/pages/health-conditions";
import { HealthCondition } from "./components/pages/health-condition";
import { NotFound } from "./components/pages/not_found";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { LayoutMain } from "./components/layouts/main";
import "normalize.css";
import { UserContext } from "./contexts/user";
import { SignIn } from "./components/pages/signin";

UserContext.Provider;

function App() {
  const [count, setCount] = useState(0);
  const [userName, setUserName] = useState(null);

  const isUserSignedIn = !!userName;

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      <LayoutMain>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route
              path="/profile"
              element={isUserSignedIn ? <Profile /> : <SignIn />}
            />
            <Route path="/symptoms-checker" element={<Symptoms />} />
            <Route path="/nutritional" element={<Nutrition />} />
            <Route
              path="/mental-tools"
              element={isUserSignedIn ? <MentalTools /> : <SignIn />}
            />
            <Route path="/health-conditions/" element={<HealthConditions />} />
             
            <Route
              path="/health-conditions/:conditionId"
              element={<HealthCondition />}
            />
             
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </LayoutMain>
    </UserContext.Provider>
  );
}

export default App;
