
import React, { useContext, useEffect, useState } from "react";
import { authDataContext } from "../context/authContext";
import axios from "axios";
const catagory = [
    "Fiction", "Non-Fiction", "Science", "Technology", "History", "Other"
]
import { useNavigate } from "react-router-dom"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../components/ui/card";
const BookCatagory = () => {
    const [error, seterror] = useState("")
    const [loading, setLoading] = useState(false)
    const [selectedcatagory, setselectedcatagory] = useState("")
    const [books, setbooks] = useState([])
    const { serverUrl } = useContext(authDataContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (selectedcatagory) {
            fetchbooksByCatagory(selectedcatagory)
        }

    }, [selectedcatagory])

    const fetchbooksByCatagory = async (catagory) => {
        setLoading(true)
        try {
            const res = await axios.get(`${serverUrl}/api/v1/book/books/catagory?catagory=${catagory}`);
            setbooks(res.data.data)
            console.log(res.data.data);

        } catch (error) {
            console.error("Error fetching books:", error);
            setbooks([])
            seterror("Failed to load books.");

        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <Select value={selectedcatagory} onValueChange={(value) => setselectedcatagory(value)}>
                    <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Select the book category" />

                    </SelectTrigger>

                    <SelectContent>
                        {catagory.map((cat, index) => (
                            <SelectItem key={index} value={cat}>
                                {cat}
                            </SelectItem>
                        ))}

                    </SelectContent>
                </Select>

            </div>
            {loading && <p>Loading books...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.length > 0 ? (
                    books.map((book) => (
                        <Card
                            key={book._id}
                            className="w-56 h-64 shadow-md hover:shadow-xl transition duration-300 cursor-pointer rounded-lg overflow-hidden"
                            onClick={() => navigate(`/book/${book._id}`)}
                        >
                            <img
                                src={`https://picsum.photos/seed/${book._id}/300/180`}
                                alt={book.name}
                                className="w-full h-40 object-cover"
                            />
                            <CardHeader className="p-4">
                                <CardTitle className="text-lg font-semibold truncate">{book.name}</CardTitle>
                                <CardDescription className="text-sm text-gray-600 truncate">
                                    by <span className="font-medium">{book.author}</span>
                                </CardDescription>
                            </CardHeader>
                        </Card>

                    ))
                ) : (
                    !loading
                )}

            </div>

        </div>
    )
}

export default BookCatagory