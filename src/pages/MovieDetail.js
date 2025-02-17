import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../api/tmdb';
import VideoPlayer from '../components/VideoPlayer';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
    };
    loadMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex items-end">
            <div className="pb-8">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <p className="text-lg text-gray-300">{movie.tagline}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <VideoPlayer type="movie" tmdbId={id} />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-300">{movie.overview}</p>
            
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movie.credits.cast.slice(0, 4).map(actor => (
                  <div key={actor.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="rounded-lg w-full"
                    />
                    <p className="mt-2 font-semibold">{actor.name}</p>
                    <p className="text-sm text-gray-400">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Release Date</p>
                <p>{movie.release_date}</p>
              </div>
              <div>
                <p className="text-gray-400">Rating</p>
                <p>{movie.vote_average.toFixed(1)}/10</p>
              </div>
              <div>
                <p className="text-gray-400">Runtime</p>
                <p>{movie.runtime} minutes</p>
              </div>
              <div>
                <p className="text-gray-400">Genres</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {movie.genres.map(genre => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
