import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://myblogs-6.onrender.com/blogs");
        const json = await response.json();
        // console.log("Fetched blogs:", json);
        setBlogs(Array.isArray(json) ? json : []); // Ensure blogs is an array
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://myblogs-6.onrender.com/blogs/delete/${id}`, {
        method: "DELETE",
      });

      const json = await response.json();
      console.log("After deletion:", json);
      setBlogs(json);
      navigate('/home')
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  // console.log(blogs);
  return (
    <div className="container mx-auto p-4 mt-6">
      {Array.isArray(blogs) && blogs.map((item) => (
        <div
          key={item.id || item._id}
          className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 hover:shadow-lg transition duration-300"
        >
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h1>
            <p className="text-gray-600 mb-4">{item.content}</p>
            <h3 className="text-sm text-gray-500 font-medium">Written by: {item.author}</h3>
          </div>
          <div className="flex flex-col items-end space-y-2 mt-4">
            <div
              onClick={() => handleDelete(item._id)}
              className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200 ease-in-out flex items-center space-x-1"
            >
              <span>🗑️</span>
              <span className="text-sm">Delete</span>
            </div>
            <div
              onClick={() => navigate(`/edit/${item._id}`)}
              className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out flex items-center space-x-1"
            >
              <span>✏️</span>
              <span className="text-sm">Edit</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
