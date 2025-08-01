import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import logo from "../assets/Read.png";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <div className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
                {/* Left: Logo */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                    <img
                        src={logo}
                        alt="ReadWrite Logo"
                        className="w-12 h-12 object-contain"
                    />
                    <span className="text-xl font-bold text-gray-800">ReadWrite</span>
                </div>

                {/* Center: Navigation Menu */}
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-6">
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className="text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                                onClick={() => navigate("/")}
                            >
                                Home
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className="text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                                onClick={() => navigate("/about")}
                            >
                                About
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className="text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                                onClick={() => navigate("/contact")}
                            >
                                Contact
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right: Auth Buttons */}
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => navigate("/login")}>
                        Login
                    </Button>
                    <Button onClick={() => navigate("/singup")}>
                        Sign Up
                    </Button>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center justify-center mt-20">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                    Welcome to ReadWrite
                </h1>
                <p className="text-gray-600">Your premium online bookshop experience starts here.</p>
            </div>
        </div>
    );
};

export default Home;
