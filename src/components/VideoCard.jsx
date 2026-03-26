function VideoCard({ video }) {
  return (
    <div className="video">
      <video
        src={video.url}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        loop
        muted
      />
    </div>
  );
}

export default VideoCard;
