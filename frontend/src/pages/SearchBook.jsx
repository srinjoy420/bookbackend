import React, { useContext, useState } from "react";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

const SearchBook = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `${serverUrl}/api/v1/book/search?query=${value}`
      );
      setSuggestions(res.data.data || []);
      setError("");
    } catch (err) {
      console.error(err);
      setSuggestions([]);
      setError("Failed to fetch suggestions");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBook = (book) => {
    setQuery(book.name);
    setSuggestions([]);
    navigate(`/book/${book._id}`);
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      <div className="w-full max-w-md relative">
        <Input
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a book..."
          className="w-full"
        />
        {loading && <p className="text-sm text-gray-500 mt-2">Loading...</p>}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-auto">
            {suggestions.map((book) => (
              <div
                key={book._id}
                onClick={() => handleSelectBook(book)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {book.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Book Preview */}
      {query && !loading && (
        <Card className="mt-6 w-full max-w-md">
          <CardContent>
            <p className="text-lg font-medium">Search Query:</p>
            <p>{query}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBook;
