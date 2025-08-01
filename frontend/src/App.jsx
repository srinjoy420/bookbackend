
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import { Register } from "./pages/Register";
import PagenotFound from "./pages/PagenotFound";
import { Loadeer } from "./loader/Loadeer";
import VerifyEmail from "./pages/VerifyEmail";
import Forgotpass from "./pages/Forgotpass";
import ResetPassword from "./pages/ResetPassword";
import ResendEmail from "./pages/resendEmail";
import SendMobile from "./pages/SendMobile";
import VerifyOtp from "./pages/VerifyOtp";
import Aboutme from "./pages/Aboutme";

 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/singup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verifyemail" element={<VerifyEmail />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgotpassword" element={<Forgotpass />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/resendEmail" element={<ResendEmail />} />
      <Route path="/sendotp" element={<SendMobile />} />
      <Route path="/verifyotp" element={<VerifyOtp />} />
      <Route path="/me" element={<Aboutme />} />
      
      <Route path="*" element={<PagenotFound />} />
      




      
   
    </Routes>
  
  )
}
 
export default App