import { useEffect, useRef, useState } from "react";
import ActionBar from "./ActionBar";
import UserInfo from "./UserInfo";
import CommentModal from "./CommentModal";

function VideoCard({ video }) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(video.likes || 0);

  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

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

    observer.observe(videoElement);
    return () => observer.unobserve(videoElement);
  }, []);

  const handleClick = () => {
    if (!videoRef.current) return;

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

  const handleDoubleClick = () => {
    setShowHeart(true);

    if (!liked) {
      setLiked(true);
      setCount((prev) => prev + 1);
    }

    setTimeout(() => setShowHeart(false), 800);
  };

  const toggleSound = (e) => {
    e.stopPropagation();
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
          if (!videoRef.current) return;

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

      {/* 🔥 UPDATED ACTION BAR */}
      <ActionBar
        liked={liked}
        setLiked={setLiked}
        count={count}
        setCount={setCount}
        setShowComments={setShowComments}
        comments={video.comments}   // ✅ ADD
        shares={video.shares}       // ✅ ADD
      />

      <UserInfo
  user={video.user}
  description={video.description}
  avatar={video.avatar}   // ✅ THIS IS IMPORTANT
/>

      <div className="sound-btn" onClick={toggleSound}>
        {muted ? "🔇" : "🔊"}
      </div>

      {showIcon && (
        <div className="overlay">
          {isPlaying ? "⏸" : "▶"}
        </div>
      )}

      {showHeart && <div className="big-heart">❤️</div>}

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <CommentModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </div>
  );
}

export default VideoCard;