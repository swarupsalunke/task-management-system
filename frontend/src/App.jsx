import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import TaskDetail from "./pages/TaskDetail";
import EditTask from "./pages/EditTask";
import Navbar from "./components/Navbar";

function Layout() {
  const location = useLocation();
  const hideNavbar = ["/", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/"          element={<Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create"    element={<CreateTask />} />
        <Route path="/task/:id"  element={<TaskDetail />} />
        <Route path="/edit/:id"  element={<EditTask />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;