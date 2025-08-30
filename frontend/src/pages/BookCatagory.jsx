
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
const BookCatagory = () => {
    const [error, seterror] = useState("")
    const [loading, setLoading] = useState(false)
    const [selectedcatagory, setselectedcatagory] = useState("")
    const [books, setbooks] = useState([])
    const { serverUrl } = useContext(authDataContext);
    const navigate=useNavigate()

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
                <Select value={selectedcatagory} onValueChange={(value)=>setselectedcatagory(value)}>
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
            <div className="space-y-3">
                        {books.length > 0 ? (
                    books.map((book) => (
                        <div key={book._id} className="p-4 bg-white shadow rounded" onClick={()=>navigate(`/book/${book._id}`)}>
                            <h3 className="font-bold">{book.name}</h3>
                            <p>{book.author}</p>
                            
                        </div >
                    ))
                ) : (
                    !loading && <p>No books found.</p>
                )}

            </div>

        </div>
    )
}

export default BookCatagory