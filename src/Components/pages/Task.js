import { useEffect, useState } from "react";

export default function Task({ data }) {
  const [newData, setNewData] = useState(data);
  const [edit, setEdit] = useState(true);
  const [taskId, setTaskId] = useState("");
  const [checkBoxState, setCheckboxState] = useState({});

  useEffect(() => {
    setNewData(data);
  }, [data]);

  const handleInputChange = (id, field, value) => {
    // Create a new array based on newData
    const updatedData = newData.map((task) => {
      if (task.id === id) {
        // Return a new object with the updated field value
        return { ...task, [field]: value };
      }
      return task; // Keep the rest unchanged
    });

    // Update newData with the new values
    setNewData(updatedData);
  };

  const handleSubmit = (SubmitedData) => {
    console.log(SubmitedData);
  };

  const hanldeClick = (id) => {
    setTaskId(id);
    setEdit(!edit);
    console.log(id, "im clicked");
  };

  const handleCheckboxChange = (id) => {
    setCheckboxState((prevState) => {
      const newCheckedState = !prevState[id];

      // Create a new array based on newData
      const updatedData = newData.map((task) => {
        if (task.id === id) {
          // Return a new object with the updated completed status
          return { ...task, completed: newCheckedState };
        }
        return task; // Keep the rest unchanged
      });

      // Update newData with the updated state
      setNewData(updatedData);
      return {
        ...prevState,
        [id]: newCheckedState,
      };
    });
  };

  return (
    <>
      <section className="flex flex-col w-4/5">
        {newData.map((task, i) => {
          return (
            <main key={i} className="border-2 border-sky-500 m-2 p-2 ">
              <header className="flex flex-row w-full justify-between">
                <h4>
                  <input
                    disabled={task.id !== taskId || edit} // Make sure the logic is correct for enabling editing
                    className=""
                    id="title"
                    onChange={(e) =>
                      handleInputChange(task.id, "title", e.target.value)
                    }
                    placeholder="Enter your title"
                    value={task?.title}
                  />
                </h4>
                <section>
                  <button
                    onClick={() => hanldeClick(task?.id)}
                    className="  w-24 border mr-5 border-white p-1 rounded-bl-lg rounded-tr-lg shadow-xl bg-blue-500 active:scale-95 transition duration-150 ease-in-out"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => hanldeClick(task?.id)}
                    className="items-end mr-5 w-24 border border-white p-1 rounded-bl-lg rounded-tr-lg shadow-xl bg-blue-500 active:scale-95 transition duration-150 ease-in-out"
                  >
                    Edit
                  </button>
                </section>
              </header>
              <section>
                <div className="m-2">
                  <textarea
                    disabled={task.id !== taskId || edit} // Make sure the logic is correct for enabling editing
                    id="message"
                    onChange={(e) =>
                      handleInputChange(task.id, "description", e.target.value)
                    }
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
        <section className="flex justify-end mr-10 w-full mt-4 ">
          <button
            className="bg-blue-500 text-white font-medium rounded-lg px-4 py-2 transition duration-150 ease-in-out hover:bg-blue-600"
            onClick={() => handleSubmit(newData)}
          >
            Save
          </button>
        </section>
      </section>
    </>
  );
}
