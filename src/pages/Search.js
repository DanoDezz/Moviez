import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMulti } from '../api/tmdb';
import MediaCard from '../components/MediaCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      if (!query) return;
      setLoading(true);
      const data = await searchMulti(query);
      setResults(data.results);
      setLoading(false);
    };
    search();
  }, [query]);

  if (loading) return <div>Searching...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Search Results for "{query}"
      </h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map(media => (
            <MediaCard key={media.id} media={media} type={media.media_type} />
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};
