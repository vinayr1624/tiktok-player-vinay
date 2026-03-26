import { useEffect, useRef, useState } from "react";
import ActionBar from "./ActionBar";

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.8 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const handleClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    setShowIcon(true);

    setTimeout(() => {
      setShowIcon(false);
    }, 1000);
  };

  return (
    <div className="video" onClick={handleClick}>
      <video
        ref={videoRef}
        src={video.url}
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* ✅ ADD THIS */}
      <ActionBar />

      {/* ▶ / ⏸ Overlay */}
      {showIcon && (
        <div className="overlay">
          {isPlaying ? "⏸" : "▶"}
        </div>
      )}
    </div>
  );
}

export default VideoCard;