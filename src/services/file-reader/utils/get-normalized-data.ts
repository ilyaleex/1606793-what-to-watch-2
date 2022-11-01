import { Film, Genre } from '../../../contracts/index.js';

const getNormalizedData = (data: string): Film => {
  const normalizedString = data
    .split('\n')
    .filter((row) => row.trim() !== '')
    .map((line) => line.split('\t'));
  const [
    name,
    description,
    createdDate,
    genre,
    releaseDate,
    rating,
    video,
    previewVideo,
    actors,
    director,
    duration,
    commentsCount,
    userName,
    email,
    password,
    avatar,
    poster,
    backgroundUrl,
    backgroundColor,
  ] = normalizedString[0];

  return {
    name,
    description,
    published: createdDate,
    genre: Genre[genre as keyof typeof Genre],
    releaseDate: parseInt(releaseDate, 10),
    rating: Number(rating),
    video,
    previewVideo,
    actors: actors.split(';').map((item) => item),
    director,
    duration: Number(duration),
    commentsCount: Number(commentsCount),
    user: {
      name: userName,
      email,
      password,
      avatar,
    },
    poster,
    backgroundUrl,
    backgroundColor,
  };
};

export default getNormalizedData;
