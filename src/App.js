import "./App.css";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Users from "./screens/users/users";
import {Details} from "./screens/details/details";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path={"/"} element={<Users />} />
          <Route exact path={"/users"} element={<Users />} />
          <Route exact path="/users/:userID" element={<Details />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
