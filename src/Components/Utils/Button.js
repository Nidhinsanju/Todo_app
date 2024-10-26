export default function Button({ children, handleClick }) {
  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="w-full py-2.5 px-4 text-sm my-2 tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none active:scale-95 transition duration-150 ease-in-out"
      >
        {children}
      </button>
    </>
  );
}
