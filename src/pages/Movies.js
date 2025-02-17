import React, { useState, useEffect } from 'react';
import { fetchTrending } from '../api/tmdb';
import MediaCard from '../components/MediaCard';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchTrending('movie');
      setMovies(data.results);
      setLoading(false);
    };
    loadMovies();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map(movie => (
          <MediaCard key={movie.id} media={movie} type="movie" />
        ))}
      </div>
    </div>
  );
};
