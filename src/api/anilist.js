export const fetchAnimeDetails = async (id) => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
        }
        description
        episodes
        coverImage {
          large
        }
        bannerImage
        averageScore
        status
        startDate {
          year
          month
          day
        }
        genres
      }
    }
  `;

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { id },
    }),
  });

  return response.json();
};
