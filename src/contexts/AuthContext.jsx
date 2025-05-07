// AuthContext.jsx
import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const signup = ({age, fullName, email, password}) => {
        if (!email || !password || !age || !fullName) {
            return;
        }
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.email === email)) {
            throw new Error('User already exists');
        }
        const newUser = {email, password, age, fullName};
        newUser.healthRecords = [];
        newUser.medicationReminders = [];
        newUser.symptoms = [];
        newUser.mentalHealthRecords = [];
        newUser.nutritionalRecords = [];

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };
    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        const users = JSON.parse(localStorage.getItem('users')) || [];
        let index = users.findIndex(u => u.email === updatedUser.email);
        if (index === -1) {
            users.push(updatedUser);
            localStorage.setItem('users', JSON.stringify(users));
            return
        }

        users.splice(index, 1);
        users.push(updatedUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
    const login = ({email, password}) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (!foundUser) throw new Error('Invalid credentials');
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{user, signup, login, logout, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
