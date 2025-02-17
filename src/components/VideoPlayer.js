import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ type, tmdbId, season, episode, animeId, isDub }) => {
  const [currentSource, setCurrentSource] = useState(0);
  const [isError, setIsError] = useState(false);

  const getSources = () => {
    if (type === 'anime') {
      return [
        `https://vidsrc.icu/embed/anime/${animeId}/${episode}/${isDub ? 1 : 0}`,
        `https://vidlink.pro/anime/${animeId}/${episode}/${isDub ? 'dub' : 'sub'}`,
      ];
    }

    return [
      `https://rivestream.live/embed?type=${type}&id=${tmdbId}${
        type === 'tv' ? `&season=${season}&episode=${episode}` : ''
      }`,
      `https://flicky.host/embed/${type}/?id=${tmdbId}${
        type === 'tv' ? `/${season}/${episode}` : ''
      }`,
      `https://vidlink.pro/${type}/${tmdbId}${
        type === 'tv' ? `/${season}/${episode}` : ''
      }`,
      `https://vidsrc.icu/embed/${type}/${tmdbId}${
        type === 'tv' ? `/${season}/${episode}` : ''
      }`,
      `https://vidsrc.cc/v3/embed/${type}/${tmdbId}${
        type === 'tv' ? `/${season}/${episode}` : ''
      }`,
    ];
  };

  const sources = getSources();

  const handleError = () => {
    setIsError(true);
    if (currentSource < sources.length - 1) {
      setCurrentSource(currentSource + 1);
      setIsError(false);
    }
  };

  useEffect(() => {
    setCurrentSource(0);
    setIsError(false);
  }, [tmdbId, season, episode, animeId]);

  return (
    <div className="relative aspect-video w-full bg-black">
      <iframe
        key={sources[currentSource]}
        src={sources[currentSource]}
        className="absolute inset-0 w-full h-full"
        allowFullScreen
        onError={handleError}
      />
      {isError && currentSource === sources.length - 1 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <p>No available sources found</p>
        </div>
      )}
    </div>
  );
};
