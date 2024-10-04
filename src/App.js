import Home from "./Components/pages/Home";
import Menu from "./Components/Utils/Menu";

function App() {
  return (
    <section className="flex">
      <Menu />
      <Home /> {/* Add your components here */}
    </section>
  );
}

export default App;
