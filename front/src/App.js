import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./components/User/User";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada/PaginaNoEncontrada";
import Menu from "./components/Menu/Menu";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="user" element={<User />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
