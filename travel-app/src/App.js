import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Articles from './pages/Articles';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import About from './pages/About';
import JournalDetail from './pages/JournalDetail';
function App() {
  return (
    <Router>
      <div className="app-container">
        <Header/>
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/articles' element={<Articles/>} />
            <Route path="/journal/:id" element={<JournalDetail />} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
