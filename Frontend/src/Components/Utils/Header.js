export default function Header() {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  return (
    <>
      <header>
        <div className="p-2 flex flex-row items-center ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV3epytE14MofkQFHVsOYh-1y87TX37uoWmw&s"
            className="rounded-full  sm:w-9 md:w-12 lg:w-10 xl:w-10"
            style={{ width: "47px", height: "50px" }} // Set explicit width and height
          />
          <div className="mx-3 font-mono py-4">
            <h1 className="text-black ">{firstName}</h1>
            <h2 className="text-gray-500 ">{lastName}</h2>
          </div>
        </div>
      </header>
    </>
  );
}
