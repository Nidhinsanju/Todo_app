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
      <section className="flex flex-col w-4/5">
        {data.map((task, i) => {
          return (
            <main key={i} className="border-2 border-sky-500 m-2 p-2 ">
              <header className="flex flex-row w-full justify-between">
                <h4>{task.title}</h4>
                <button
                  onClick={() => hanldeClick(task?.id)}
                  className="items-end mr-5 w-24 border border-white p-1 rounded-bl-lg rounded-tr-lg shadow-xl bg-blue-500 active:scale-95 transition duration-150 ease-in-out"
                >
                  Edit
                </button>
              </header>
              <section>
                <div className="m-2">
                  <textarea
                    disabled="true"
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                  >
                    {task.description}
                  </textarea>
                </div>
              </section>
              <div class="flex justify-end m-2">
                <main className="flex items-center  p-2">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    name="task_status"
                    checked={!!checkBoxState[task.id]} // Defaults to false if undefined
                    id={task.id}
                    onClick={() => {
                      handleCheckboxChange(task.id);
                    }}
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-dark items-center"
                  >
                    Completed
                  </label>
                </main>
              </div>
            </main>
          );
        })}
      </section>
    </>
  );
}
