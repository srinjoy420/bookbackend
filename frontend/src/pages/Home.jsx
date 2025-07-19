import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import logo from "../assets/Read.png"


const Home = () => {
    return (
        <div>
            {/* logo */}
            <img
                src={logo}
                alt="ReadWrite Logo"
                className="w-30 h-30 object-contain"
            />
            {/* heading */}
            <h1 className="text-xl font-semibold text-center text-gray-800 mb-2">
                welocme to Read write A premium book shop
            </h1>
        </div>
    )
}

export default Home