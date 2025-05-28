import { createContext, useState } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <userContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
