import Header from './Components/Header'
import About from './Components/About'
import CompanyList from './Components/CompanyList'
import Listings from './Components/Listings'
import Contact from './Components/Contact'
import Login from './Components/Login'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import { Component } from 'react'

const api = axios.create({
  baseURL: `http://localhost:3000/listings`

})


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />} />
          <Route path='/' element={<Header />} >
          <Route path='home' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='listings' element={<Listings />} />
          <Route path='contact' element={<Contact />} />
          <Route path='comp_showcase' element={<CompanyList />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
