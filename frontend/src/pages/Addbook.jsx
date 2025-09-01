import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"
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
import { authDataContext } from '../context/authContext';
import { Calendar } from "../components/ui/calendar"
import { sl } from 'date-fns/locale';

const Addbook = () => {
  const [name, setname] = useState('')
  const [author, setauthor] = useState('')
  const [price, setprice] = useState("")
  const [published, setpublished] = useState("")
  const [slno, setslno] = useState("")
  const [catagory, setcatagory] = useState("")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext)
  const [message, setmessage] = useState("")


  const navigate = useNavigate()

  // the funtion of handel add book
  const handeladdbook = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`${serverUrl}/api/v1/book/addbook`,
        { name, author, slno, price, published, catagory }, { withCredentials: true }
      )
      setmessage(result.data.message)


    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Signup failed due to an unknown error";
      setError(message);

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
          <CardTitle className="text-center">Register the Book details</CardTitle>
          <CardDescription className="text-center">
            Enter book details and ready to shell the boks
          </CardDescription>
        </CardHeader>

        {/* the books inputs are here */}
        <CardContent>
          <form onSubmit={handeladdbook}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="bookname">Book Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="ramayana"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  required
                />
              </div>
              {/* the author */}
              <div className="grid gap-2">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  type="text"
                  placeholder="Valmiki"
                  onChange={(e) => setauthor(e.target.value)}
                  value={author}
                  required
                />
              </div>
              {/* the pric */}
              <div className="grid gap-2">
                <Label htmlFor="price">price</Label>
                <Input
                  id="name"
                  type="number"
                  placeholder="455"
                  onChange={(e) => setprice(e.target.value)}
                  value={price}
                  required
                />
              </div>
              {/* the slno */}
              <div className="grid gap-2">
                <Label htmlFor="slbo">serial no</Label>
                <Input
                  id="slno"
                  type="number"
                  placeholder="1"
                  onChange={(e) => setslno(e.target.value)}
                  value={slno}
                  required
                />
              </div>
              {/* the date */}
              <div className="grid gap-2">
                <Label htmlFor="date">Book Published Date</Label>
               
              </div>
            </div>

          </form>
        </CardContent>
      </Card>

    </div>
  )
}

export default Addbook