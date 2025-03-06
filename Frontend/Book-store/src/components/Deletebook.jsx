import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // ✅ Import Toastify
import "react-toastify/dist/ReactToastify.css"; // ✅ Import styles

const Deletebook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  // Fetch book details
  useEffect(() => {
    fetch(`http://localhost:8000/book/view/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching book:", error));
  }, [id]);

  // Handle delete operation
  const handleDelete = async () => {
  
      const response = await fetch(`http://localhost:8000/book/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("🗑️ Book deleted successfully!", {
          position: "bottom-left",
          autoClose: 3000, // Closes after 3 seconds
        });
        setTimeout(() => navigate("/"), 3000); // Redirect after toast
      } else {
        toast.error("❌ Error deleting book!", {
          position: "bottom-left",
        });
      }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-red-600">🗑️ Delete Book</h2>
        {book ? (
          <>
            <h3 className="text-lg text-gray-800">{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Published Year: {book.publishedYear}</p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p>Loading book details...</p>
        )}
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

export default Deletebook;
