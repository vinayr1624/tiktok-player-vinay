function UserInfo({ user, description, avatar }) {
  return (
    <div className="user-info">
      
      <div className="user-row">
        <img src={avatar} />

        <h4>@{user}</h4>

        <button className="follow-btn">Follow</button>
      </div>

      <p>{description}</p>
    </div>
  );
}

export default UserInfo;