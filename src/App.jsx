import { useState } from "react";
import VideoCard from "./components/VideoCard";
import Upload from "./components/Upload";
import videosData from "./data/videos";

function App() {
  const [videos, setVideos] = useState(videosData);

  // 🔥 ADD NEW VIDEO
  const addVideo = (video) => {
    setVideos((prev) => [video, ...prev]); // add to top
  };

  // 🔥 LOAD MORE (infinite scroll)
  const loadMoreVideos = () => {
    const moreVideos = videosData.map((v) => ({
      ...v,
      id: v.id + "_" + Math.random(),
    }));

    setVideos((prev) => [...prev, ...moreVideos]);
  };

  // 🔥 SCROLL
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
    <>
      {/* 🔥 UPLOAD BUTTON */}
      <Upload addVideo={addVideo} />

      {/* 🔥 FEED */}
      <div className="container" onScroll={handleScroll}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}

export default App;