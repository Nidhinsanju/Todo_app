import Task from "../pages/Task.js";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../Token.js";
import { CalendarBar } from "../Utils/Calendar.js";
import { getTaskList } from "../../hooks/hooks.js";

function Home() {
  const userID = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);
  const { handleAddTask, taskCount } = useContext(TokenContext); // Use TokenContext
  const [tasks, setTasks] = useState([taskCount]); // Initialize tasks as an array

  useEffect(() => {
    const getTask = async () => {
      setLoading(true);
      try {
        const response = await getTaskList(userID);
        if (response.status === 200) {
          const taskList = response.data.data.taskList;
          const message = response.data?.message;
          setTasks(taskList); // Set tasks to the taskList received
          handleAddTask(taskList);
          setLoading(false);
          alert(message);
        } else {
          setLoading(false);
          const errorMessage = response.message;
          alert(errorMessage);
        }
      } catch (err) {
        setLoading(false);
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    getTask();
  }, [userID]);

  if (loading) {
    return <div>Loading...</div>; // Ensure you return the loading message
  }

  return (
    <div className="flex w-full">
      <Task data={tasks} /> {/* Pass tasks as a prop */}
      <CalendarBar />
    </div>
  );
}

export default Home;
