import { useEffect, useRef, useState } from "react";
import ActionBar from "./ActionBar";
import UserInfo from "./UserInfo";

function VideoCard({ video }) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  // 🔥 Like state
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(video.likes || 0);

  // 🔊 Sound state
  const [muted, setMuted] = useState(true);

  // 📊 Progress state
  const [progress, setProgress] = useState(0);

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

  // 🎯 Tap (play/pause)
  const handleClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    setShowIcon(true);
    setTimeout(() => setShowIcon(false), 1000);
  };

  // ❤️ Double tap
  const handleDoubleClick = () => {
    setShowHeart(true);

    if (!liked) {
      setLiked(true);
      setCount((prev) => prev + 1);
    }

    setTimeout(() => setShowHeart(false), 800);
  };

  // 🔊 Sound toggle
  const toggleSound = (e) => {
    e.stopPropagation(); // prevent play/pause
    setMuted((prev) => !prev);
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
        muted={muted}
        playsInline
        onTimeUpdate={() => {
          const current = videoRef.current.currentTime;
          const duration = videoRef.current.duration || 1;
          setProgress((current / duration) * 100);
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* 🔥 Action Bar */}
      <ActionBar
        liked={liked}
        setLiked={setLiked}
        count={count}
        setCount={setCount}
      />

      {/* 🔥 User Info */}
      <UserInfo user={video.user} description={video.description} />

      {/* 🔊 Sound Button */}
      <div className="sound-btn" onClick={toggleSound}>
        {muted ? "🔇" : "🔊"}
      </div>

      {/* ▶ / ⏸ Overlay */}
      {showIcon && (
        <div className="overlay">
          {isPlaying ? "⏸" : "▶"}
        </div>
      )}

      {/* ❤️ Big Heart */}
      {showHeart && <div className="big-heart">❤️</div>}

      {/* 📊 Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default VideoCard;