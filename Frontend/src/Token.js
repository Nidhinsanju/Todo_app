import { createContext, useState } from "react";

export const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const count = parseInt(localStorage.getItem("taskCount"), 10) || 0; // Ensure it's a number
  const [taskCount, setTaskCount] = useState(count);
  const [user, setUser] = useState({});

  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  const hanldeUserData = ({ userData }) => {
    setUser(userData);
  };

  const handleAddTask = () => {
    setTaskCount((prevCount) => {
      const newCount = prevCount + 1;
      localStorage.setItem("taskCount", newCount); // Save to localStorage
      return newCount;
    });
  };

  return (
    <TokenContext.Provider
      value={{
        token,
        updateToken,
        taskCount,
        handleAddTask,
        user,
        hanldeUserData,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}
