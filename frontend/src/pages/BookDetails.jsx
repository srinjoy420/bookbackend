import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { authDataContext } from "../context/authContext";

export const BookDetails = () => {
  const { id } = useParams(); // destructure properly
  const { serverUrl } = useContext(authDataContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/v1/book/getbookbyid/${id}`, {
          withCredentials: true,
        });
        setBook(res.data.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, serverUrl]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!book) return <p>No book found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <Card className="max-w-lg shadow-lg">
        <img
          src={`https://picsum.photos/seed/${book._id}/300/180`}
          alt={book.name}
          className="w-full h-48 object-cover rounded-t-md"
        />
        <CardHeader>
          <CardTitle>{book.name}</CardTitle>
          <CardDescription>
            Book written by: <b>{book.author}</b>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 font-semibold">Price: ₹{book.price}</p>
          <p className="text-sm text-gray-500">
            Published on {new Date(book.published).toLocaleDateString()}
          </p>
          <p className="mt-3 text-gray-600">{book.description}</p>
          <p className="mt-3 text-gray-600">{book.catagory}</p>
          <p className="mt-3 text-gray-500">
            Added by: {book.bookAddedBy?.firstname} {book.bookAddedBy?.lastname} ({book.bookAddedBy?.email})
          </p>
        </CardContent>
        <Button className="w-full mt-4" onClick={() => alert("Buy functionality here!")}>
          Buy Now
        </Button>
      </Card>
    </div>
  );
};
