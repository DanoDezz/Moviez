import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchAnimeDetails } from '../api/anilist';
import VideoPlayer from '../components/VideoPlayer';

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [episode, setEpisode] = useState(1);
  const [isDub, setIsDub] = useState(false);

  useEffect(() => {
    const loadAnime = async () => {
      const { data } = await fetchAnimeDetails(id);
      setAnime(data.Media);
    };
    loadAnime();
  }, [id]);

  if (!anime) return <div>Loading...</div>;

  return (
    <div>
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${anime.bannerImage || anime.coverImage.large})`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex items-end">
            <div className="pb-8">
              <h1 className="text-4xl font-bold mb-2">
                {anime.title.english || anime.title.romaji}
              </h1>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex gap-4">
          <select
            value={episode}
            onChange={(e) => setEpisode(Number(e.target.value))}
            className="bg-gray-800 rounded px-4 py-2"
          >
            {[...Array(anime.episodes)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Episode {i + 1}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => setIsDub(!isDub)}
            className={`px-4 py-2 rounded ${
              isDub ? 'bg-blue-600' : 'bg-gray-800'
            }`}
          >
            {isDub ? 'DUB' : 'SUB'}
          </button>
        </div>
        
        <VideoPlayer
          type="anime"
          animeId={id}
          episode={episode}
          isDub={isDub}
        />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
            <p className="text-gray-300">{anime.description}</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Episodes</p>
                <p>{anime.episodes}</p>
              </div>
              <div>
                <p className="text-gray-400">Score</p>
                <p>{anime.averageScore / 10}/10</p>
              </div>
              <div>
                <p className="text-gray-400">Status</p>
                <p>{anime.status}</p>
              </div>
              <div>
                <p className="text-gray-400">Genres</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {anime.genres.map(genre => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {genre}
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
