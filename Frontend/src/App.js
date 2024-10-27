import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Menu from "./Components/Utils/Menu";
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountSettings from "./Components/pages/AccountSettings";

export const TaskContext = createContext();

function App() {
  const count = parseInt(localStorage.getItem("taskCount"), 10) || 0; // Ensure it's a number
  const [taskCount, setTaskCount] = useState(count);
  const handleAddTask = () => {
    setTaskCount((prevCount) => prevCount + 1);
  };

  return (
    <section className="flex">
      <BrowserRouter>
        <TaskContext.Provider value={{ taskCount, handleAddTask }}>
          <Menu />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<AccountSettings />} />
          </Routes>
        </TaskContext.Provider>
      </BrowserRouter>
    </section>
  );
}

export default App;
