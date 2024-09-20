export default function SubMenu() {
  const itemsList = [
    {
      title: "Item 1",
      link: "/item1",
      icon: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
    },
    {
      title: "Item 2",
      link: "/item1",
      icon: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
    },
    {
      title: "Item 3",
      link: "/item1",
      icon: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
    },
    {
      title: "Item 4",
      link: "/item1",
      icon: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
    },
  ];
  return (
    <>
      <div>
        <div className="mt-3 flex justify-between">
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png "
              className="rounded-full size-6"
              style={{ width: "40px", height: "40px" }} // Set explicit width and height
            />
            <h5 className="mt-2">Bola ola</h5>
          </div>
          <button type="button">
            <img
              src="https://www.svgrepo.com/show/124304/three-dots.svg"
              className="rounded-full"
              style={{ width: "30px", height: "30px" }} // Set explicit width and height
            />
          </button>
        </div>
        <div className="p-2">
          <ul className="list-disc list-inside">
            {itemsList.map((data) => {
              return (
                <li key={data.title}>
                  <button href={data.link}>
                    <div className="flex pt-2 ">{data.title}</div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
