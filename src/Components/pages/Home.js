import Task from "../pages/Task.js";
import { CalendarBar } from "../Utils/Calendar.js";

function Home() {
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
    {
      id: 3,
      title: "Task 3",
      description: "This is task 3",
      completed: false,
    },
  ];
  return (
    <div className="flex w-full">
      <Task data={data} />
      <CalendarBar />
    </div>
  );
}
export default Home;
