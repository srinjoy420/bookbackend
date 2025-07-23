import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
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

const Login = () => {
  const [show,setShow]=useState(false)
  const navigate = useNavigate()
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
          {/* Your form elements go here */}
          {/* emal */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
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
              <Input id="password" type={show?"text":"password"} required className="pr-10" />

              {/* Eye icon */}
              {!show &&<FaRegEye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>setShow(prev=>!prev)} />}
              {show &&<FaRegEyeSlash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>setShow(prev=>!prev)} />}
            </div>
          </div>
          {/* login button */}
          <Button type="submit" className="w-full" >
            login
          </Button>
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