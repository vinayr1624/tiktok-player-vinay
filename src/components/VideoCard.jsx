import { useEffect, useRef, useState } from "react";
import ActionBar from "./ActionBar";
import UserInfo from "./UserInfo";
import CommentModal from "./CommentModal";

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const clickTimeout = useRef(null); // ✅ important

  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(video.likes || 0);

  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const [commentsList, setCommentsList] = useState(
    video.commentsData || []
  );
  const [commentCount, setCommentCount] = useState(
    video.comments || 0
  );

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
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

  // ✅ SINGLE CLICK (play/pause)
  const handleClick = () => {
    if (clickTimeout.current) return;

    clickTimeout.current = setTimeout(() => {
      if (!videoRef.current) return;

      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }

      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 1000);

      clickTimeout.current = null;
    }, 250);
  };

  // ✅ DOUBLE CLICK (like)
  const handleDoubleClick = (e) => {
  e.stopPropagation();

  if (clickTimeout.current) {
    clearTimeout(clickTimeout.current);
    clickTimeout.current = null;
  }

  setShowHeart(true);

  setLiked((prevLiked) => {
    if (!prevLiked) {
      setCount((prev) => prev + 1);
      return true;
    }
    return prevLiked;
  });

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

      <ActionBar
        liked={liked}
        setLiked={setLiked}
        count={count}
        setCount={setCount}
        setShowComments={setShowComments}
        comments={commentCount}
        shares={video.shares}
      />

      <UserInfo
        user={video.user}
        description={video.description}
        avatar={video.avatar}
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
        comments={commentsList}
        setComments={setCommentsList}
        setCommentCount={setCommentCount}
      />
    </div>
  );
}

export default VideoCard;