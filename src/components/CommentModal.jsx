function CommentModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Comments</h3>

        <p><b>user1:</b> Nice video 🔥</p>
        <p><b>user2:</b> Loved this ❤️</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CommentModal;