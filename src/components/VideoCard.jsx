import { useEffect, useRef, useState } from "react";
import ActionBar from "./ActionBar";

function VideoCard({ video }) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  // 🔥 Like state moved here
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  // 🎯 Auto play / pause
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

  // 🎯 Single tap (play/pause)
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

  // ❤️ Double tap (like + animation)
  const handleDoubleClick = () => {
    setShowHeart(true);

    if (!liked) {
      setLiked(true);
      setCount(count + 1);
    }

    setTimeout(() => {
      setShowHeart(false);
    }, 800);
  };

  return (
    <div
      className="video"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
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

      {/* 🔥 Pass state to ActionBar */}
      <ActionBar
        liked={liked}
        setLiked={setLiked}
        count={count}
        setCount={setCount}
      />

      {/* ▶ / ⏸ Overlay */}
      {showIcon && (
        <div className="overlay">
          {isPlaying ? "⏸" : "▶"}
        </div>
      )}

      {/* ❤️ Big Heart */}
      {showHeart && <div className="big-heart">❤️</div>}
    </div>
  );
}

export default VideoCard;