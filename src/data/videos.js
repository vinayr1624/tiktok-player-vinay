const videos = [
  {
    id: 1,
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    user: "ai_creator",
    description: "Understanding AI in 30 seconds 🚀 #AI #Tech",
    avatar: "https://i.pravatar.cc/150?img=5",
    likes: 120,
    comments: 2,
    shares: 10,

    // ✅ NEW
    commentsData: [
      "Amazing video 🔥",
      "Very informative 👏"
    ]
  },
  {
    id: 2,
    url: "https://www.w3schools.com/html/movie.mp4",
    user: "code_master",
    description: "React tips you should know 💡 #React #Coding",
    avatar: "https://i.pravatar.cc/150?img=12",
    likes: 90,
    comments: 1,
    shares: 6,

    commentsData: [
      "Nice tips 👍"
    ]
  },
  {
    id: 3,
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    user: "dev_vibes",
    description: "Day in life of a developer 👨‍💻",
    avatar: "https://i.pravatar.cc/150?img=20",
    likes: 200,
    comments: 0,
    shares: 15,

    commentsData: [] // empty
  },
];

export default videos;