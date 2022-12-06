import "./App.css";
import { Users } from "./components/users";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { User } from "./components/userPage";
import { MainScreen } from "./components/mainScreen";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <header
          style={{
            padding: "24px 12px 12px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <b>Test task for Grain Capital by Andrii Hermanov</b>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to={"/"}>Home</Link>
            <Link to={"/users"}>Users</Link>
          </div>
        </header>
        <Routes>
          <Route path={`/`} element={<MainScreen />} />
          <Route path={`/users`} element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
