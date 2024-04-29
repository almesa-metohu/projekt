import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home/Home";
import Hotel from "./views/hotel/Hotel";
import List from "./views/list/List";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { ClientService } from "./components/client-service/ClientService";
import { Careers } from "./components/careers/Careers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotel/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clientService" element={<ClientService />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
