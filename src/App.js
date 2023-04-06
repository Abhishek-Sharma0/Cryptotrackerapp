import Home from './pages/Home';
import Coindiscription from './pages/Coindiscription';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './ComponentsofHome/Header';
import React from 'react'

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/coins/:id" element={<Coindiscription/>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
