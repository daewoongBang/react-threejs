import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/index';
import Basic from './components/basic/index';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/basic' element={<Basic />} />
    </Routes>
  );
}

export default App;
