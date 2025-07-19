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



export const Register = () => {
  const navigate=useNavigate()
  return (
    
    <div className="min-h-screen flex items-start justify-center pt-20 px-4 bg-gray-50">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
        {/* logo */}
        <img
            src={logo} 
            alt="ReadWrite Logo"
            className="w-16 h-16 object-contain"
          />
        {/* heading */}
          <h1 className="text-xl font-semibold text-center text-gray-800 mb-2">
            Welcome to Read & Write
          </h1>
          <CardTitle className="text-center">Register your details</CardTitle>
          <CardDescription className="text-center">
            Enter your details to sign up
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Your form elements go here */}
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
