import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import logo from "../assets/Read.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { CiFaceMeh } from "react-icons/ci";
import Hero from '@/components/Hero';
import Background from '@/components/Background';
import Books from './Books';
import BookCatagory from './BookCatagory';

const Home = () => {
  const navigate = useNavigate();

  const heroData = [
    { text1: "30% off limited offer", text2: "Read that" },
    { text1: "Discover the best Book and gain knowledge and wisdom", text2: "Limited time only" },
    { text1: "Explore our best collection", text2: "Shop now" },
    { text1: "Choose your book", text2: "Now on sale" }
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="w-full flex flex-wrap md:flex-nowrap justify-between items-center px-4 md:px-6 py-4 bg-white shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer mb-3 md:mb-0" onClick={() => navigate("/")}>
          <img src={logo} alt="ReadWrite Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold text-gray-800">ReadWrite</span>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap gap-4 md:gap-6">
            {["Home", "About", "Contact", "Books"].map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  className="text-sm md:text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                  onClick={() => navigate(`/${item === "Home" ? "" : item.toLowerCase()}`)}
                >
                  {item}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="flex gap-2 md:gap-4 mt-3 md:mt-0">
          <Button variant="outline" onClick={() => navigate("/login")} className="text-sm md:text-base">
            Login
          </Button>
          <Button onClick={() => navigate("/signup")} className="text-sm md:text-base">
            Sign Up
          </Button>
          <Button
            onClick={() => navigate("/me")}
            variant="outline"
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Profile"
          >
            <CiFaceMeh size={22} className="text-gray-700" />
          </Button>
        </div>
      </header>

      {/* Welcome Text */}
      <section className="text-center mt-10 px-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-black mb-2">Welcome to ReadWrite</h1>
        <p className="text-black text-sm md:text-base">Your premium online bookshop experience starts here.</p>
      </section>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center mt-10 w-full">
        <div className="w-full md:w-1/2">
          <Background heroCount={heroCount} />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
          />
        </div>
      </section>

      <section className='mt-12 px-4 md:px-6'>
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-4 text-center">
          Search the books by the catagory
        </h2>
        <BookCatagory className='flex justify-center align-middle'/>
      </section>
      
      
    </div>
  );
};

export default Home;
