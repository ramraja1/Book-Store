import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Readbook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/book/view/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch book details");
        }
        return res.json();
      })
      .then((data) => setBook(data))
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
        >
          🔙 Go Back
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg animate-pulse">📖 Loading book details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Large Book Title */}
      <h1 className="text-5xl font-bold text-blue-700 mb-6 text-center drop-shadow-lg">
        {book.title}
      </h1>

      {/* Book Details Card */}
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-3xl w-full transform hover:scale-105 transition duration-300">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">{book.title}</h2>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Author:</span> {book.author}
        </p>
        <p className="text-gray-600 text-lg mt-2">
          <span className="font-semibold">Published Year:</span> {book.publishedYear}
        </p>

        {/* Overview Section */}
        {book.overview && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">📖 Overview</h3>
            <p className="text-gray-700 leading-relaxed">{book.overview}</p>
          </div>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
      >
        🔙 Back to Home
      </button>
    </div>
  );
};

export default Readbook;
