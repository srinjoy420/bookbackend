import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";
import logo from "../assets/Read.png";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await axios.post(
        serverUrl + "/api/v1/auth/loginwithOtp",
        { otp },
        { withCredentials: true }
      );

      setMessage(res?.data?.message || "OTP verified successfully");

      if (res.data.success) {
        navigate("/"); // Change to appropriate route
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-sm shadow-xl rounded-lg p-4">
        <CardHeader className="text-center">
          <div onClick={() => navigate("/")} className="cursor-pointer flex justify-center">
            <img
              src={logo}
              alt="ReadWrite Logo"
              className="w-14 h-14 object-contain mb-2"
            />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-800">Verify OTP</CardTitle>
          <CardDescription>Enter the 4-digit OTP sent to your mobile</CardDescription>
        </CardHeader>

        <form onSubmit={handelVerifyOtp}>
          <CardContent className="flex flex-col gap-4">
            <InputOTP maxLength={4} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>

            <Button
              type="submit"
              disabled={loading || otp.length !== 4}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {message && (
              <p className="text-green-600 text-sm text-center">{message}</p>
            )}
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default VerifyOtp;
