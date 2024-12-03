import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Forms from './Components/Forms'
import Edit from './Components/Edit'

const App = () => {
  return (
  <BrowserRouter>
    <div className="bg-blue-500 text-white">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-xl font-bold">
            <Link to={"/"} className="hover:text-gray-200 transition duration-200">
              My Blogs
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link
              to={"/home"}
              className="hover:text-gray-200 transition duration-200">
              Home
            </Link>
            <Link
              to={"/new"}
              className="hover:text-gray-200 transition duration-200">
              New Blogs
            </Link>
          </div>
        </nav>
      </div>

    
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/new' element={<Forms />}/>
        <Route path='/edit/:id' element={<Edit />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App