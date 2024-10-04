import Header from "./Header";
import {
  House2,
  People,
  Buliding,
  Stickynote,
  DocumentFilter,
  CalendarTick,
} from "iconsax-react";

export default function Menu() {
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
      to: "/",
      active: true,
      icons: icons.home,
      style: { fontSize: "30px", color: "grey" }, // Use object for style
    },
    {
      label: "Calendar",
      to: "/",
      active: false,
      icons: icons.calendar,

      style: { fontSize: "30px", color: "grey" }, // Use object for style
    },
    {
      label: "Tasks",
      to: "/",
      active: false,
      icons: icons.building,
      style: { fontSize: "30px", color: "grey" }, // Use object for style
    },
  ];

  return (
    <>
      <aside className="max-w-64 min-h-screen ml-1 border-4  border-r-indigo-500">
        <main className=" border-b-4 border-gray-300 ">
          <Header />
          {menu.map((data, i) => {
            return (
              <div className=" ml-2 flex items-center py-4 " key={i}>
                <data.icons className="material-icons" style={data.style} />
                <button className="text-black ml-3">{data.label}</button>
              </div>
            );
          })}
        </main>
        <footer className="flex flex-col-reverse">
          <button>Adding new Task Button with animation</button>
        </footer>
      </aside>
    </>
  );
}
