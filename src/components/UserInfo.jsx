function UserInfo({ user, description }) {
  return (
    <div className="user-info">
      <h4>@{user}</h4>
      <p>{description}</p>
    </div>
  );
}

export default UserInfo;