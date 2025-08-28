import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { authDataContext } from "../context/authContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const { serverUrl } = useContext(authDataContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/book/getallbooks`, {
        withCredentials: true,
      });
      setBooks(res.data.data || []);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Books</h1>
        <Button onClick={() => navigate("/addbooks")}>Add Book</Button>
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card
            key={book._id}
            className="shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
            onClick={() => navigate(`/book/${book._id}`)}
          >
            <img
              src={`https://picsum.photos/seed/${book._id}/300/180`}
              alt={book.name}
              className="w-full h-48 object-cover rounded-t-md"
            />

            <CardHeader>
              <CardTitle>{book.name}</CardTitle>
              <CardDescription className="text-gray-500">
                by {book.author}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700 font-semibold">₹{book.price}</p>
              <p className="text-sm text-gray-500 mt-1">
                Published: {new Date(book.published).toLocaleDateString()}
              </p>
            </CardContent>

            <CardFooter>
              <Button className="w-full" onClick={(e) => {
                e.stopPropagation();
                alert("Buy Now functionality to be implemented!");
              }}>
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Books;
