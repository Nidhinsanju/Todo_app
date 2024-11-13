import Task from "../pages/Task.js";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../Token.js";
import { CalendarBar } from "../Utils/Calendar.js";
function Home() {
  const { taskCount } = useContext(TokenContext); // Destructure correctly

  const data = [
    {
      id: 1,
      title: "Task 1",
      description: "This is task 1",
      completed: false,
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is task 2",
      completed: false,
    },
  ];

  localStorage.setItem("taskCount", data.length);

  const [tasks, setTasks] = useState(data);

  useEffect(() => {
    if (taskCount > tasks.length) {
      const newTask = {
        id: tasks.length + 1,
        title: `Task ${tasks.length + 1}`,
        description: `This is task ${tasks.length + 1}`,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  }, [taskCount, tasks.length]);

  return (
    <div className="flex w-full">
      <Task data={tasks} />
      <CalendarBar />
    </div>
  );
}
export default Home;
