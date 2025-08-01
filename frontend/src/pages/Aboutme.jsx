import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import logo from "../assets/Read.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";

const Aboutme = () => {
    const navigate = useNavigate();
    const { serverUrl } = useContext(authDataContext);

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchUserDetails = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(`${serverUrl}/api/v1/auth/aboutuser`, {
                withCredentials: true,
            });

            const { user } = res.data;
            setFirstName(user.firstname);
            setLastName(user.lastname);
            setEmail(user.email);
            setRole(user.role);
            setMessage("Profile loaded successfully");
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Unable to load profile";
            setError(message);
        } finally {
            setLoading(false);
        }
    };
    const handelLogout = async () => {
        try {
            const res = await axios.get(serverUrl + "/api/v1/auth/logout", { withCredentials: true })
            const user = res.data
            console.log(user);
            if (res.data.success) {
                navigate("/login")
            }

        } catch (error) {
            console.log(error);
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Unable to logout";
            setError(message);

        }
    }
    const handelDelete=async()=>{
        try {
           const res=await axios.delete(serverUrl + "/api/v1/auth/deleteaccount",{withCredentials:true})
           const {user}=res.data;
           console.log(user);
           if(res.data.success){
            navigate("/singup")
           }
            
        } catch (error) {
            console.log(error);
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Unable to delete account";
            setError(message);
            
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <Card className="w-full max-w-md shadow-lg p-4">
                <CardHeader className="flex flex-col items-center">
                    <img
                        src={logo}
                        alt="ReadWrite Logo"
                        className="w-16 h-16 object-contain cursor-pointer"
                        onClick={() => navigate("/")}
                    />
                    <CardTitle className="text-2xl mt-2 text-center text-gray-800">
                        Welcome to Read & Write
                    </CardTitle>
                    <Avatar className="mt-4">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </CardHeader>

                <CardContent className="text-center">
                    {loading && <p className="text-blue-600 mb-2">Loading...</p>}
                    {error && <p className="text-red-600 mb-2">{error}</p>}
                    {message && !loading && !error && (
                        <p className="text-green-600 mb-2">{message}</p>
                    )}

                    {!loading && !error && (
                        <div className="space-y-2 mt-4">
                            <CardDescription>
                                <strong>First Name:</strong> {firstname}
                            </CardDescription>
                            <CardDescription>
                                <strong>Last Name:</strong> {lastname}
                            </CardDescription>
                            <CardDescription>
                                <strong>Email:</strong> {email}
                            </CardDescription>
                            <CardDescription>
                                <strong>Role:</strong> {role}
                            </CardDescription>
                        </div>
                    )}
                </CardContent>
                {/* logout button */}
                <div className="logout flex items-center justify-center mt-6 cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded shadow-sm transition duration-300 ease-in-out" onClick={handelLogout}>
                    {/* heading */}
                    <p className="text-sm font-semibold text-gray-800">
                        Logout 
                    </p>
                </div>
                {/* delete account */}
                 <div className="delete-acc flex items-center justify-center mt-6 cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded shadow-sm transition duration-300 ease-in-out" onClick={handelDelete}>
                    {/* heading */}
                    <p className="text-sm font-semibold text-gray-800">
                      delete Account
                    </p>
                </div>
            </Card>


        </div>
    );
};

export default Aboutme;
