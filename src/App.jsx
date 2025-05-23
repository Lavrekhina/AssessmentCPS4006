import {Home} from "./components/pages/home";
import {News} from "./components/pages/news";
import {Profile} from "./components/pages/profile";
import {Symptoms} from "./components/pages/symptoms";
import {Nutrition} from "./components/pages/nutritional";
import {MentalTools} from "./components/pages/mental-tools";
import {NotFound} from "./components/pages/not_found";
import {Routes, Route, Navigate} from "react-router-dom";
import {LayoutMain} from "./components/layouts/main";
import "normalize.css";
import {SignIn} from "./components/pages/signin";
import {SignUp} from "./components/pages/signup";
import {useAuth} from "./contexts/AuthContext";


export const App = () => {
    const {user} = useAuth(); // 👈 get user from context

    return (
        <LayoutMain>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/news" element={<News/>}/>

                <Route
                    path="/symptoms-checker"
                    element={user ? <Symptoms/> : <Navigate to="/signin"/>}
                />
                <Route
                    path="/nutritional"
                    element={user ? <Nutrition/> : <Navigate to="/signin"/>}
                />
                <Route
                    path="/profile"
                    element={user ? <Profile/> : <Navigate to="/signin"/>}
                />
                <Route
                    path="/mental-tools"
                    element={user ? <MentalTools/> : <Navigate to="/signin"/>}
                />
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </LayoutMain>
    );
};

export default App;
