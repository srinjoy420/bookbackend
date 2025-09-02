import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/authContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "History",
  "Other",
];

export default function AddBook() {
  const { serverUrl } = useContext(authDataContext);
  const [form, setForm] = useState({
    name: "",
    author: "",
    price: "",
    published: "",
    slno: "",
    catagory: "",
  });
  const [message, setMessage] = useState(null);
   const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setForm({ ...form, catagory: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/book/addbook`,
        form,
        { withCredentials: true }
      );
      setMessage({ type: "success", text: res.data.message });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to add book" });
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="p-6 w-full max-w-md shadow-xl rounded-2xl">
        <CardContent>
          <h2 className="text-xl font-bold mb-4 text-center">Add a New Book</h2>

          {message && (
            <p className={`text-center mb-3 ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
              {message.text}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div>
              <Label>Author</Label>
              <Input name="author" value={form.author} onChange={handleChange} required />
            </div>

            <div>
              <Label>Price</Label>
              <Input type="number" name="price" value={form.price} onChange={handleChange} required />
            </div>

            <div>
              <Label>Serial No</Label>
              <Input name="slno" value={form.slno} onChange={handleChange} required />
            </div>

            <div>
              <Label>Published Date</Label>
              <Input type="date" name="published" value={form.published} onChange={handleChange} required />
            </div>

            <div>
              <Label>Category</Label>
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">Add Book</Button>
            <button className="w-full bg-black text-white border-8" onClick={() => navigate(`/books`)}>Books</button>
            <button className="w-full bg-black text-white border-8" onClick={() => navigate(`/`)}>Home</button>

            
          </form>
          
        </CardContent>
      </Card>
    </div>
  );
}
