function ActionBar({ liked, setLiked, count, setCount, setShowComments }) {

  const handleLike = (e) => {
    e.stopPropagation(); // ✅ prevent video click

    setLiked((prevLiked) => {
      if (prevLiked) {
        setCount((prev) => Math.max(prev - 1, 0)); // ✅ avoid negative
      } else {
        setCount((prev) => prev + 1);
      }
      return !prevLiked;
    });
  };

  return (
    <div className="action-bar">
      {/* ❤️ LIKE */}
      <div onClick={handleLike} style={{ textAlign: "center" }}>
        <div style={{ color: liked ? "red" : "white" }}>❤️</div>
        <small>{count}</small>
      </div>

      {/* 💬 COMMENT */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (setShowComments) {
            setShowComments(true); // ✅ safe call
          }
        }}
      >
        💬
      </div>

      {/* 🔁 SHARE */}
      <div onClick={(e) => e.stopPropagation()}>
        🔁
      </div>

      {/* 🔖 SAVE */}
      <div onClick={(e) => e.stopPropagation()}>
        🔖
      </div>
    </div>
  );
}

export default ActionBar;