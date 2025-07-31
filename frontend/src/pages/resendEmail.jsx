import { authDataContext } from '../context/authContext';
import React, { useContext, useState } from 'react'
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
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import logo from "../assets/Read.png"

const ResendEmail = () => {
    const [email, setEmail] = useState("")
    const { serverUrl } = useContext(authDataContext)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

    const handelresendEmailtoken = async (e) => {
        e.preventDefault()
        setMessage("")
        setError("")
        setLoading(true)
        try {
            const { data } = await axios.post(serverUrl + "/api/v1/auth/resendemailVerification", {
                email
            }, { withCredentials: true })
            console.log(data);
            
            setMessage(data.message || "reset password link sent to your email")
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message || 'Something went wrong')

        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex items-start justify-center pt-20 px-4 bg-gray-50">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader>
                    <div className='logo' onClick={() => navigate('/')}>
                        <img
                            src={logo}
                            alt="ReadWrite Logo"
                            className="w-16 h-16 object-contain"
                        />
                        {/* heading */}
                        <h1 className="text-xl font-semibold text-center text-gray-800 mb-2">
                            ResendEmail Verification
                        </h1>

                    </div>
                </CardHeader>
                <CardDescription className="text-center">
                    Enter your email address
                </CardDescription>
                {/* contnt */}
                {/* card container */}
                <CardContent>
                    {message && <p className="text-green-600 text-center mb-2">{message}</p>}
                    {error && <p className="text-red-600 text-center mb-2">{error}</p>}
                    <form onSubmit={handelresendEmailtoken}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="firstname">Email</Label>
                                <Input
                                    id="firstname"
                                    type="text"
                                    placeholder="srinjoy"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </div>

                        </div>
                        {/* button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                        >
                            {loading ? "sending ..." : "resendEmail"}
                        </Button>
                        {error && (
                            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                        )}

                    </form>
                </CardContent>
            </Card>

        </div>
    )
}

export default ResendEmail