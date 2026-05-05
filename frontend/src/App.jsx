import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import TaskDetail from "./pages/TaskDetail";
import EditTask from "./pages/EditTask";
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;