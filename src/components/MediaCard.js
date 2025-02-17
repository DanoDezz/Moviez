import { Link } from 'react-router-dom';

const MediaCard = ({ media, type }) => {
  const getLink = () => {
    if (type === 'anime') return `/anime/${media.id}`;
    return `/${media.media_type || type}/${media.id}`;
  };

  const getImage = () => {
    if (type === 'anime') return media.coverImage.large;
    return `https://image.tmdb.org/t/p/w500${media.poster_path}`;
  };

  const getTitle = () => {
    if (type === 'anime') return media.title.english || media.title.romaji;
    return media.title || media.name;
  };

  return (
    <Link to={getLink()} className="group">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={getImage()}
          alt={getTitle()}
          className="w-full h-[300px] object-cover transform transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 p-4">
            <h3 className="text-lg font-semibold">{getTitle()}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};
