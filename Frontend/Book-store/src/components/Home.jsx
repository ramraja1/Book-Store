import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);

  // ✅ Fetch Books from Backend
  useEffect(() => {
    fetch("http://localhost:8000/book") // Make sure this matches your Express route
      .then((res) => res.json())
      .then((data) => setBooks(data.books)) // Directly update books array
      .catch((error) => console.error("Error fetching books:", error));
  }, []); // ✅ Add dependency array to prevent infinite re-fetching

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        📚 Welcome to Book Store
      </h1>

      {/* Book List */}
      <div className="w-full max-w-5xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Available Books:</h2>

        {books.length === 0 ? (
          <p className="text-gray-500">No books available.</p>
        ) : (
          <ul className="space-y-6">
            {books.map((book) => (
              <li
                key={book._id}
                className="border-b pb-6 flex justify-between items-center"
              >
                {/* Book Info */}
                <div>
                  <h3 className="text-xl font-medium text-gray-800">{book.title}</h3>
                  <p className="text-gray-600">Author: {book.author}</p>
                  <p className="text-gray-500">Published Year: {book.publishedYear}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    to={`/update/${book._id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
                  >
                    ✏️ Update
                  </Link>
                  <Link
                    to={`/delete-book/${book._id}`}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    ❌ Delete
                  </Link>
                  <Link
                    to={`/read-books/${book._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    📖 View
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Fixed "Create Book" Button */}
      <div className="text-center mt-6">
        <Link
          to="/create-books"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          ➕ Create New Book
        </Link>
      </div>
    </div>
  );
};

export default Home;
