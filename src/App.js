import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Users from "./screens/users/users";
import Details from "./screens/details/details";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Users />} />
          <Route exact path={"/users"} element={<Users />} />
          <Route exact path="/users/:userId" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
