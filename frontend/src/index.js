import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import DetailMovie from './pages/detail-movie';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail' element={<DetailMovie />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
