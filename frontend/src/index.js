import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './components/login';
import DetailMovie from './pages/detail-movie';
import BuyPackage from './pages/buy-package';
import FollowingMoviesList from './pages/following-movies-list ';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path='/detail/:movieID' element={<DetailMovie />} />

        <Route path='/buypackage' element={<BuyPackage />} />

        <Route path='/following-movies-list' element={<FollowingMoviesList />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
