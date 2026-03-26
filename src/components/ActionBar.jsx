import { useState } from "react";

function ActionBar() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="action-bar">
      <div onClick={handleLike} style={{ textAlign: "center" }}>
        <div style={{ color: liked ? "red" : "white" }}>
          ❤️
        </div>
        <small>{count}</small>
      </div>

      <div>💬</div>
      <div>🔁</div>
      <div>🔖</div>
    </div>
  );
}

export default ActionBar;