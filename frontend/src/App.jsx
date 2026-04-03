import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Register from './components/Register';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" Component={Register} />
      <Route path="/login" Component={Login} />
      <Route path="/dashboard" Component={Dashboard} />
      <Route path="/admin" Component={Admin} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;