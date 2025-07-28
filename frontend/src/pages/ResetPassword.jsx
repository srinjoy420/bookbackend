import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const [newPassword, setNewpassword] = useState('')
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
      const navigate = useNavigate()
    const handelresetPassword = async (e) => {
        e.preventDefault()
        setMessage('')
        setError("")
        setLoading(true)
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/auth/resetpassword?token=${token}&email=${email}`, {
                newpassword
            }, { withCredentials: true })
            setMessage("password change succesfully")
            if(res.data.success){
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            setMessage("set new password failed")


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
                            Reset password
                        </h1>

                    </div>
                </CardHeader>
                <CardDescription className="text-center">
                    Enter your new password
                </CardDescription>
                <CardContent>
                    <form onSubmit={handelresetPassword}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="firstname">Email</Label>
                                <Input
                                    id="firstname"
                                    type="password"
                                    placeholder="*****"
                                    onChange={(e) => setNewpassword(e.target.value)}
                                    value={newPassword}
                                    required
                                />
                            </div>
                            {/* button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                            >
                                {loading ? "changing ..." : "change password"}
                            </Button>
                            {error && (
                                <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                            )}

                        </div>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}

export default ResetPassword