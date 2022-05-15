import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./components/User/User";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada/PaginaNoEncontrada";
import Menu from "./components/Menu/Menu";
import Login from "./components/Login/Login";
import {useState} from "react";
import useToken from './components/App/useToken';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  // const [token, setToken] = useState();
  // const token = getToken();

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

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
