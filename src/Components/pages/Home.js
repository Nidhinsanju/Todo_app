import Task from "../pages/Task.js";
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
    <div>
      <Task data={data} />
      <h1>Hi there</h1>
    </div>
  );
}
export default Home;
