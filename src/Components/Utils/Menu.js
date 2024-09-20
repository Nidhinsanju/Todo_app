import Header from "./Header";
import SubMenu from "./subMenu";
export default function Menu() {
  const menu = [
    {
      label: "Home",
      to: "/",
      active: true,
      style: { fontSize: "48px", color: "red" }, // Use object for style
    },
    {
      label: "Calendar",
      to: "/",
      active: false,
      style: { fontSize: "48px", color: "red" }, // Use object for style
    },
    {
      label: "Tasks",
      to: "/",
      active: false,
      style: { fontSize: "48px", color: "red" }, // Use object for style
    },
  ];
  return (
    <>
      <nav className="max-w-64 min-h-screen">
        <section className=" border-b-4 border-gray-300">
          <Header />
          {menu.map((data) => {
            console.log(data);
            return (
              <div className="p-2 ml-2">
                <i class="material-icons">&#xe8de;</i>
                <button className="text-black p-2">{data.label}</button>
              </div>
            );
          })}
        </section>
        <section>
          <SubMenu />
        </section>
        <footer className="flex flex-col-reverse">
          <p>Footer</p>
        </footer>
      </nav>
    </>
  );
}
