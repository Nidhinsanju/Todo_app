import { useState } from "react";

export default function Task({ data }) {
  const [checkBoxState, setCheckboxState] = useState({});
  const hanldeClick = (id) => {
    console.log(id, "im clicked");
  };

  const handleCheckboxChange = (id) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [id]: prevState[id] ? !prevState[id] : true,
    }));
    console.log("checkbox changed for task", id, "state:", !checkBoxState[id]);
  };

  return (
    <>
      {data.map((task, i) => {
        return (
          <div key={i} className="border-2 border-sky-500 m-2 p-2">
            <header>
              <h4>{task.title}</h4>
            </header>
            <button onClick={() => hanldeClick(task?.id)}>
              <p>Button</p>
            </button>
            <section>
              <div>
                <p>{task.description}</p>
              </div>
            </section>
            <input
              type="checkbox"
              name="task_status"
              checked={!!checkBoxState[task.id]} // Defaults to false if undefined
              id={task.id}
              onClick={() => {
                handleCheckboxChange(task.id);
              }}
            />
          </div>
        );
      })}
    </>
  );
}
