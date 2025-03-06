import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify"; // ✅ Import Toastify
import "react-toastify/dist/ReactToastify.css"; // ✅ Import styles

const UpdateBook = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedYear: "",
  });

  // Fetch book details on mount
  useEffect(() => {
    fetch(`http://localhost:8000/book/view/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setBook({
            title: data.title,
            author: data.author,
            publishedYear: data.publishedYear,
          });
        }
      })
      .catch((error) => console.error("Error fetching book:", error));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Handle form submission (Update book)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/book/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (response.ok) {
     toast.success("📘 Book Updated successfully!", {
               position: "top-right",
               autoClose: 4000, // Closes after 3 seconds
             });
             setTimeout(() => navigate("/"), 4000); // Redirect after toast
    } else {
      alert("Error updating book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📘 Update Book</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Title:</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Author:</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Published Year:</label>
            <input
              type="number"
              name="publishedYear"
              value={book.publishedYear}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
          >
            ✅ Update Book
          </button>
        </form>
      </div>

       {/* ✅ Toast Notifications */}
       <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default UpdateBook;
