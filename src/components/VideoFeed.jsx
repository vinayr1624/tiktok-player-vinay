import videos from "../data/videos";
import VideoCard from "./VideoCard";

function VideoFeed() {
  return (
    <div className="container">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoFeed;