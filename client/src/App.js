import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Nav from './components/NavBar'
import ChoosePlanCard from './components/cards/ChoosePlanCard';
import Cards from './components/cards/Cards';
import Dashboard from './pages/netflix/dashboard';

// import Footer from './components/Footer';


function App() {
  return (
    <Router>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choosePlan" element={<ChoosePlanCard />} />
        <Route path="/login" element={< Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/planCard" element={<Cards />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
