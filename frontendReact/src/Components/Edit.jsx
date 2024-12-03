import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const Edit = () => {
    
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")
    const {id} = useParams()
    // console.log(id);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async() => {
            const data = await fetch(`http://localhost:8080/blogs/${id}`);
            const json = await data.json();
            const {author, title, content} = json;

            setAuthor(author);
            setContent(content);
            setTitle(title);
        }

        getData();
    },[true])
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-6 mt-28">
        <div className="flex flex-col">
        <label 
            htmlFor="author" 
            className="text-gray-700 font-semibold mb-2"
        >
            Author
        </label>
        <input 
            type="text" 
            value={author} 
            id="author" 
            name="author" 
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter author name"
        />
        </div>
    
        <div className="flex flex-col">
        <label 
            htmlFor="title" 
            className="text-gray-700 font-semibold mb-2"
        >
            Title
        </label>
        <input 
            type="text" 
            value={title} 
            id="title" 
            name="title" 
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter title"
        />
        </div>
    
        <div className="flex flex-col">
        <label 
            htmlFor="content" 
            className="text-gray-700 font-semibold mb-2"
        >
            Content
        </label>
        <textarea 
            value={content} 
            id="content" 
            name="content" 
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
            placeholder="Write your content here..."
        />
        </div>
    
        {/* Submit Button */}
        <div className="text-right">
        <button 
           onClick={async() => {
                const data = await fetch(`http://localhost:8080/blogs/edit/${id}`, {
                    method : "PUT",
                    headers : {
                    'content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                    author : author,
                    title : title,
                    content : content
                    })
                })


                navigate("/")
           }}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out">
            Submit
        </button>
        </div>
    </div>
  
  )
}

export default Edit