export default function Header() {
  return (
    <>
      <header>
        <div className="p-2 flex flex-row">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV3epytE14MofkQFHVsOYh-1y87TX37uoWmw&s"
            className="rounded-full mt-3 sm:w-9 md:w-12 lg:w-10 xl:w-10"
            style={{ width: "40px", height: "40px" }} // Set explicit width and height
          />
          <div className="p-2">
            <h1 className="text-black">Alwell O.</h1>
            <h2 className="text-gray-500">Model</h2>
          </div>
        </div>
      </header>
    </>
  );
}
