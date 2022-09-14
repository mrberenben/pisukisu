const Series = {
  action: [
    {
      id: "7eb2eac6-b89b-43cb-9c2d-70a2f958e559",
      name: "Neon Genesis: Evangelion",
      slug: "neon-genesis-evangelion",
      description:
        "Fifteen years after a cataclysmic event known as the Second Impact, the world faces a new threat: monstrous celestial beings called 'Angels' invade Tokyo-3 one by one.",
      sources: {
        image: "/assets/content/7eb2eac6-b89b-43cb-9c2d-70a2f958e559/image.webp",
        thumbnail: "/assets/content/7eb2eac6-b89b-43cb-9c2d-70a2f958e559/thumbnail.webp",
        poster: "/assets/content/7eb2eac6-b89b-43cb-9c2d-70a2f958e559/poster.webp"
      },
      duration_avg: 24,
      genres: ["Action", "Mecha", "Sci-Fi"],
      episodes: [
        {
          id: "3d848df5-bc9f-41af-981c-046b0ef906de",
          index: 1,
          name: "Angel Attack",
          description:
            "In 2000, the first disastrous contact with the mysterious beings known as Angels resulted in the global cataclysm referred to as the Second Impact, which wiped out half of the human race.",
          image: "/assets/content/7eb2eac6-b89b-43cb-9c2d-70a2f958e559/episode/1.webp",
          duration: 1400,
          aired: new Date(1664830800)
        },
        {
          id: "435e3e66-0137-400a-b965-baba9cfc431a",
          index: 2,
          name: "The Beast",
          description:
            "Shinji wakes up in the hospital, with no recollection of the fight against the Angel the night before. Gendo wants nothing to do with him, so NERV's head of operations, the young and attractive Misato Katsuragi, becomes his legal guardian. Settling into life in Misato's apartment, he eventually recalls the furious battle.",
          image: "/assets/content/7eb2eac6-b89b-43cb-9c2d-70a2f958e559/episode/2.webp",
          duration: 1320,
          aired: new Date(1664830800)
        }
      ]
    }
  ]
};

const Genres = [
  {
    id: "g_action",
    name: "Action",
    prefix: "💥",
    is_suggested: true,
    suggestion_reason: "Recommended for you"
  },
  {
    id: "g_pyschological",
    name: "Psychological",
    prefix: "😵",
    is_suggested: false,
    suggestion_reason: "Depending on the genres you watch"
  },
  {
    id: "g_historical",
    name: "Historical",
    prefix: "🏹",
    is_suggested: false,
    suggestion_reason: null // "Based on user ratings"
  }
];

export { Series, Genres };
