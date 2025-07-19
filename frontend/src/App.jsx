
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import { Register } from "./pages/Register";
import PagenotFound from "./pages/PagenotFound";
 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/singup" element={<Register />} />
      <Route path="/login" element={<Login />} />


      <Route path="*" element={<PagenotFound />} />
    </Routes>
  
  )
}
 
export default App