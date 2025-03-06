import React from 'react'
import "./app.css"
import { Routes,Route } from 'react-router-dom'
import Homes   from "./components/Home.jsx";
import Readbook from "./components/Readbook.jsx";
import Deletebook from "./components/Deletebook.jsx";
import Updatebook from "./components/Updatebook.jsx";
import Createbook from './components/Createbook.jsx';


const App = () => {
  return <>
    <Routes>
      <Route path='/'element={<Homes />}></Route>
      <Route path='/create-books' element={<Createbook />}></Route>
      <Route path='/read-books/:id'element={<Readbook />}></Route>
      <Route path='/delete-book/:id'element={<Deletebook />}></Route>
      <Route path='/update/:id'element={<Updatebook />}></Route>
    </Routes>
  </>
}

export default App
