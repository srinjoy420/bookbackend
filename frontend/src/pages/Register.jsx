import React from 'react'
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
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import logo from "../assets/Read.png"
import google from "../assets/google.jpg"



export const Register = () => {
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
          <CardTitle className="text-center">Register your details</CardTitle>
          <CardDescription className="text-center">
            Enter your details to sign up
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Your form elements go here */}
          {/* firstname */}
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="firstname">Firstname</Label>
                <Input
                  id="firstname"
                  type="text"
                  placeholder="srinjoy"
                  required
                />
              </div>
            </div>
            {/* lastname */}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="lastname">Lastnaame</Label>
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Goswami"
                  required
                />
              </div>
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
                <Input id="password" type="password" required />
              </div>
              {/* button submit */}
               <Button type="submit" className="w-full" >
               Create Account
            </Button>

            </div>
            {/* login with google */}
            <Card className='googlelogin  shadow-lg flex justify-center align-bottom w-full h-20'>
              <div className="google flex items-center justify-center gap-4 mt-6">
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


            </Card>


          </form>
        </CardContent>

        <div className="px-6 pb-4">
          <Button variant="link" className="w-full" onClick={() => navigate("/login")}>
            Already have an account? Login
          </Button>
        </div>

      </Card>
    </div>
  )
}
