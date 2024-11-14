import { TokenProvider } from "./Token";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";

function App() {
  return (
    <section className="flex">
      <TokenProvider>
        <RouterProvider router={router} />;
      </TokenProvider>
    </section>
  );
}

export default App;
