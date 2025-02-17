import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold">
          StreamFlex
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/movies" className="hover:text-blue-400">Movies</Link>
          <Link to="/tv" className="hover:text-blue-400">TV Shows</Link>
          <Link to="/anime" className="hover:text-blue-400">Anime</Link>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <input
            type="search"
            placeholder="Search movies, shows, anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>
    </nav>
  );
};
