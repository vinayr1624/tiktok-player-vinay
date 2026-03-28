import { useState } from "react";
import VideoCard from "./components/VideoCard";
import videosData from "./data/videos";

function App() {
  const [videos, setVideos] = useState(videosData);

  // 🔥 LOAD MORE VIDEOS
  const loadMoreVideos = () => {
    const moreVideos = videosData.map((v) => ({
      ...v,
      id: v.id + "_" + Math.random(), // unique id
    }));

    setVideos((prev) => [...prev, ...moreVideos]);
  };

  // 🔥 SCROLL HANDLER (IMPORTANT)
  const handleScroll = (e) => {
    const target = e.target;

    if (
      target.scrollTop + target.clientHeight >=
      target.scrollHeight - 100
    ) {
      loadMoreVideos();
    }
  };

  return (
    <div className="container" onScroll={handleScroll}>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default App;