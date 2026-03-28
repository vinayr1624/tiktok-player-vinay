import { useState } from "react";

function CommentModal({
  isOpen,
  onClose,
  comments,
  setComments,
  setCommentCount,
}) {
  const [input, setInput] = useState("");

  if (!isOpen) return null;

  const handlePost = () => {
    if (input.trim() === "") return;

    setComments((prev) => [...prev, input]);  // ✅ keeps old
    setCommentCount((prev) => prev + 1);      // ✅ increase count

    setInput("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Comments</h3>

        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          {comments.length === 0 ? (
            <p>Be the first to comment 🚀</p>
          ) : (
            comments.map((c, index) => (
              <p key={index}>💬 {c}</p>
            ))
          )}
        </div>

        <div style={{ display: "flex", marginTop: "10px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a comment..."
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "20px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={handlePost}
            style={{
              marginLeft: "8px",
              padding: "8px 12px",
              borderRadius: "20px",
              border: "none",
              background: "#ff2c55",
              color: "white",
              cursor: "pointer",
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;