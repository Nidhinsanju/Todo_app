import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Menu from "./Components/Utils/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountSettings from "./Components/pages/AccountSettings";
import { TokenProvider } from "./Token";

function App() {
  return (
    <section className="flex">
      <BrowserRouter>
        <TokenProvider>
          <Menu />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<AccountSettings />} />
          </Routes>
        </TokenProvider>
      </BrowserRouter>
    </section>
  );
}

export default App;
