import { createContext } from "react";

const UserContext = createContext({
  email: "",
  password: "",
  username: "",
});

export default UserContext;
