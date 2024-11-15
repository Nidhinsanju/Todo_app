import { createContext, useState } from "react";

export const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [taskCount, setTaskCount] = useState(0);

  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  const handleAddTask = () => {
    setTaskCount((prevCount) => {
      const newCount = prevCount + 1;
      setTaskCount(newCount);
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
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}
