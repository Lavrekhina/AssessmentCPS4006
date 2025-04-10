import {createContext} from "react"

export const UserContext = createContext({
  userData: {
    fullName: null,
    email: null,
    age: null
  },
  setUserData: () => null
});

