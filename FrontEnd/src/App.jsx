/* eslint-disable no-unused-vars */
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import ShowBook from './Pages/ShowBook'
import CreateBook from './Pages/CreateBook'
import EditBook from './Pages/EditBook'
import DeleteBook from './Pages/DeleteBook'
import styles from  './app.module.scss'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/show/:id" element={<ShowBook />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path='*' element='404 Not Found' />
    </Routes>
  )
}

export default App
