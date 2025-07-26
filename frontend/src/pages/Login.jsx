import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import logo from "../assets/Read.png"
import { authDataContext } from '../context/authContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase.js';
import google from "../assets/google.jpg"

const Login = () => {
  const [show, setShow] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handellogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const result = await axios.post(serverUrl + '/api/v1/auth/login', {
        email, password
      }, { withCredentials: true })
      if (result.data.success) {
        navigate("/")
      }
      console.log(result);

    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Signup failed due to an unknown error";
      setError(message);
    }
    finally {
      setLoading(false)
    }

  }
  // google login
  const googleLogin=async(e)=>{
    try {
       const res=await signInWithPopup(auth,provider) 
      console.log(res);
      const user=res.user
      let firstname=user.displayName
      let lastname=user.displayName
      let email=user.email

      const result=await axios.post(serverUrl+'/api/v1/auth/googlelogin',{
        firstname,lastname,email
      },{withCredentials:true})
      if (result.data.success) {
        navigate("/")
      }
      console.log(result);
      
    } catch (error) {
      console.log(error);
      
      
    }

  }
  return (
    <div className="min-h-screen flex items-start justify-center pt-20 px-4 bg-gray-50">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          {/* logo */}
          <div className='logo' onClick={() => navigate('/')}>
            <img
              src={logo}
              alt="ReadWrite Logo"
              className="w-16 h-16 object-contain"
            />
            {/* heading */}
            <h1 className="text-xl font-semibold text-center text-gray-800 mb-2">
              Welcome to Read & Write
            </h1>
          </div>
          <CardTitle className="text-center">enter your email and password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handellogin}>
            {/* Your form elements go here */}
            {/* emal */}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>


            </div>
            {/* pass */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <Input id="password" type={show ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} required className="pr-10" />

                {/* Eye icon */}

              </div>
            </div>
            {/* login button */}
            <Button type="submit" className="w-full" disabled={loading} >
              {loading ? "login ..." : "login Up"}
            </Button>
            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}

            {/* login with google */}
            <div className="google flex items-center justify-center gap-4 mt-6" onClick={googleLogin} >
              <img
                src={google}
                alt="ReadWrite Logo"
                className="w-16 h-10 object-contain"
              />
              {/* heading */}
              <p className=" font-semibold text-gray-800">
                Login using Google
              </p>
            </div>
          </form>
        </CardContent>
        <div className="px-6 pb-4">
          <Button variant="link" className="w-full" onClick={() => navigate("/singup")}>
            Dont have an account? Register first
          </Button>
        </div>

      </Card>
    </div>
  )
}

export default Login