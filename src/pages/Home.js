import React, { useState, useEffect } from 'react';
import { fetchTrending } from '../api/tmdb';
import MediaCard from '../components/MediaCard';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrending = async () => {
      const data = await fetchTrending();
      setTrending(data.results);
      setLoading(false);
    };
    loadTrending();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Trending Now</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {trending.map(media => (
          <MediaCard key={media.id} media={media} type={media.media_type} />
        ))}
      </div>
    </div>
  );
};
