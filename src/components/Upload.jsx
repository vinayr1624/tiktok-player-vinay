function Upload({ addVideo }) {

  const handleUpload = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const url = URL.createObjectURL(selected);

    const newVideo = {
      id: Date.now(),
      url: url,
      user: "you",
      description: "My uploaded video 🚀",
      avatar: "https://i.pravatar.cc/150?img=30",
      likes: 0,
      comments: 0,
      shares: 0,
      commentsData: [],
    };

    addVideo(newVideo);
  };

  return (
    <>
      {/* 🔥 Hidden Input */}
      <input
        id="videoUpload"
        type="file"
        accept="video/*"
        onChange={handleUpload}
        style={{ display: "none" }}
      />

      {/* 🔥 Plus Button */}
      <label htmlFor="videoUpload" className="upload-btn">
        +
      </label>
    </>
  );
}

export default Upload;