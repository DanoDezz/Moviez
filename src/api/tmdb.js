const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrending = async (mediaType = 'all', timeWindow = 'week') => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${TMDB_API_KEY}`
  );
  return response.json();
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`
  );
  return response.json();
};

export const fetchTvDetails = async (id) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`
  );
  return response.json();
};

export const searchMulti = async (query) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${query}`
  );
  return response.json();
};
