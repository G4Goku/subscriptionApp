import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Nav from './components/NavBar'
// import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={< Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
