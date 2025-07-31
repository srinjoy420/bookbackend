import { authDataContext } from '../context/authContext';
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

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
const SendMobile = () => {
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const { serverUrl } = useContext(authDataContext)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [countryCode, setCountrycode] = useState("+91")
    const fullMobile = `${countryCode}${mobile}`;
    const navigate = useNavigate()
    const handelSendOtp = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setMessage("")
        try {
            const res = await axios.post(serverUrl + "/api/v1/auth/sendOtp", {
                email,
                mobile: fullMobile
            }, { withCredentials: true })
            setMessage(res?.data?.message || "otp sent succesfully")
            if (res.data.success) {
                navigate("/verifyotp")

            }
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message || 'Something went wronng')


        }
        finally {
            setLoading(false)
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
                    <CardTitle className="text-center">enter your email and mobile number</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* emal */}
                    <form onSubmit={handelSendOtp}>
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
                            {/* mobile number */}
                            <div className="grid gap-2 w-full">
                                <Label htmlFor="mobile" className="text-base font-medium text-gray-700">
                                    Mobile Number
                                </Label>
                                <div className="flex gap-2">
                                    <select
                                        value={countryCode}
                                        onChange={(e) => setCountrycode(e.target.value)}
                                        className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="+91">🇮🇳 +91</option>
                                        {/* Add more countries if needed */}
                                    </select>
                                    <input
                                        id="mobile"
                                        type="tel"
                                        maxLength={10}
                                        placeholder="Enter 10-digit number"
                                        value={mobile}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, "");
                                            if (val.length <= 10) setMobile(val);
                                        }}
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                {/* button */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                                >
                                    {loading ? "sending ..." : "send otp"}
                                </Button>
                                {error && (
                                    <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                                )}
                            </div>

                        </div>

                    </form>
                </CardContent>



            </Card>

        </div>
    )
}

export default SendMobile