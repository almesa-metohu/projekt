import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./views/home/Home";
import Hotel from "./views/hotel/Hotel";
import List from "./views/list/List";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotel/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;