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
// Admin
// Movies
import Home_Admin from './admin/component-Movie/home';
import Update_Movie from './admin/pages/movies/update-Movie/update-movie';
import Repair_Movie from './admin/pages/movies/repair-Movie/repair-Movie';
import Delete_Movie from './admin/pages/movies/delete-Movie/delete-Movie';
import ListMovie from './admin/pages/movies/list-movie/list-movie';
import AddMovie from './admin/pages/movies/add-Movie/add-Movie';
import ListUser from './admin/pages/users/list-users';
import AddEpisodeMovie from './admin/pages/movies/add-episode-movie/add-episode-movie';
import Category from './admin/pages/category/category';
import MovieGenre from './admin/pages/category/movie-genre';
import Information from './pages/information';




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

      <Route path='/edituser' element={<Information />} />


      {/* admin router */}

      <Route path='/dashboard' element={<Home_Admin />}>
        {/* ----------------------------------------------- */}
        <Route path='list-movie' element={<ListMovie />} />

        <Route path='add-movie' element={<AddMovie />} />

        <Route path='update-movie/:MovieID' element={<Update_Movie />} />

        <Route path='repair-movie' element={<Repair_Movie />} />

        <Route path='delete-movie' element={<Delete_Movie />} />

        <Route path='add-episode-movie' element={<AddEpisodeMovie />} />

        {/* ----------------------------------------------- */}
        {/*<Route path='list-users' element={<ListUser />} />
        <Route path='list-users' element={<ListUser />} />
        <Route path='list-users' element={<ListUser />} /> */}

        <Route path='category' element={<Category />} />

        <Route path='movie-genre' element={<MovieGenre />} />

        <Route path='list-users' element={<ListUser />} />

      </Route>

    </Routes>

  </BrowserRouter>

  //</React.StrictMode>
);

reportWebVitals();
