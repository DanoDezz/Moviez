import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import Anime from './pages/Anime';
import MovieDetail from './pages/MovieDetail';
import TvDetail from './pages/TvDetail';
import AnimeDetail from './pages/AnimeDetail';
import Search from './pages/Search';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<TvShows />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/tv/:id" element={<TvDetail />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
