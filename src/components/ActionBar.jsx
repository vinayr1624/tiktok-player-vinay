function ActionBar({
  liked,
  setLiked,
  count,
  setCount,
  setShowComments,
  comments,
  shares,
}) {
  const handleLike = (e) => {
    e.stopPropagation();

    if (liked) {
      setCount((prev) => Math.max(prev - 1, 0));
    } else {
      setCount((prev) => prev + 1);
    }

    setLiked(!liked);
  };

  return (
    <div className="action-bar">
      {/* ❤️ LIKE */}
      <div onClick={handleLike}>
  <div
    style={{
      color: liked ? "#ff2c55" : "#ffffff", // 🔥 FIXED
      transition: "0.2s",
    }}
  >
    ❤️
  </div>
  <small>{count}</small>
</div>

      {/* 💬 COMMENT */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowComments(true);
        }}
      >
        <div>💬</div>
        <small>{comments || 0}</small> {/* ✅ NEW */}
      </div>

      {/* 🔁 SHARE */}
      <div onClick={(e) => e.stopPropagation()}>
        <div>🔁</div>
        <small>{shares || 0}</small> {/* ✅ NEW */}
      </div>

      {/* 🔖 SAVE */}
      <div onClick={(e) => e.stopPropagation()}>
        <div>🔖</div>
      </div>
    </div>
  );
}

export default ActionBar;