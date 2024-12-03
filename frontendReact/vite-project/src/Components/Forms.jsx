import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Forms = () => {
  const [title,setTitle] = useState("");
  const [author,setAuthor] = useState("");
  const [content,setContent] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create a Blog</h1>
        <form className="space-y-4">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            name="title"
            id="title"
            placeholder="Enter your blog title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            type="text"
            name="author"
            id="author"
            placeholder="Enter your blog author"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            name="content"
            id="content"
            placeholder="Enter your blog content"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
          ></textarea>
          <button onClick={async () => {
            if(!title || !author || !content) {
              console.log("content missing")
              return;
            }
            const data = await fetch("http://localhost:8080/blogs/newblog", {
              method : "POST", 
              headers : {
                'content-type' : 'application/json'
              },
              body : JSON.stringify({
                author : author,
                title : title,
                content : content
              })
            });
            console.log(data);
            const json = await data.json();
            console.log(json);
            navigate("/home");

          }}
            
            type="button"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forms;
