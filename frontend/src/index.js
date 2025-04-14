import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './components/public-components/login';
import DetailMovie from './pages/detail-movie';
import BuyPackage from './pages/buy-package';
import FollowingMoviesList from './pages/following-movies-list ';

import SearchTerm from './pages/search-term';
import StreamingRoom from './pages/streaming-room';
import JoinRoom from './pages/join-room-movie';
import Home_Admin from './admin-components/home';
import Add_film from './admin-components/component-film/add-film';
import Change_film from './admin-components/component-film/change-film';
import Repair_film from './admin-components/component-film/repair-film';
import Delete_film from './admin-components/component-film/delete-film';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/search" element={<SearchTerm />} />

      <Route path='/detail/:slugMovieName/:slugEpisode?' element={<DetailMovie />} />

      <Route path='/buypackage' element={<BuyPackage />} />

      <Route path='/following-movies-list' element={<FollowingMoviesList />} />

      <Route path='/streaming/:slugMovieName?/:slugEpisode?/:roomId?' element={<StreamingRoom />} />

      <Route path='/joim-room' element={<JoinRoom />} />

      {/* admin router */}

      <Route path='/home_admin' element={<Home_Admin />}>
        <Route path='add-film' element={<Add_film />} />
        <Route path='change-film' element={<Change_film />} />
        <Route path='repair-film' element={<Repair_film />} />
        <Route path='delete-film' element={<Delete_film />} />
      </Route>
    </Routes>


  </BrowserRouter>

  //</React.StrictMode>
);

reportWebVitals();
