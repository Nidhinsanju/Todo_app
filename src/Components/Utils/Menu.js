import Header from "./Header";
import {
  House2,
  People,
  Buliding,
  Stickynote,
  DocumentFilter,
  CalendarTick,
} from "iconsax-react";
import { TaskContext } from "../../App";
import { useContext } from "react";

export default function Menu() {
  const { handleAddTask } = useContext(TaskContext);

  const token = localStorage.getItem("token") || "asds";
  const icons = {
    home: House2,
    calendar: CalendarTick,
    tasks: DocumentFilter,
    people: People,
    building: Buliding,
    stickynote: Stickynote,
  };

  const menu = [
    {
      label: "Home",
      to: "/home",
      active: true,
      icons: icons.home,
      style: { fontSize: "30px", color: "grey" }, // Use object for style
    },
  ];

  return (
    <>
      {token && (
        <aside className="max-w-64 min-h-screen ml-1 border-4 min-w-64 border-r-indigo-500">
          <main className=" border-b-4 border-gray-300 ">
            <Header />
            {menu.map((data, i) => {
              return (
                <div className=" ml-2 flex items-center py-4 " key={i}>
                  <data.icons className="material-icons" style={data.style} />
                  <button className="text-black ml-3">
                    <a href={data.to}>{data.label}</a>
                  </button>
                </div>
              );
            })}
          </main>
          <footer className="flex flex-col-reverse justify-center items-center	mt-10">
            <button
              onClick={handleAddTask}
              className="items-end mr-5 w-fit   border border-white p-2  rounded-full   shadow-xl bg-blue-500 active:scale-95 transition duration-150 ease-in-out "
            >
              Add New Task
            </button>
          </footer>
        </aside>
      )}
    </>
  );
}
