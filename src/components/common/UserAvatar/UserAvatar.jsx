const UserAvatar = ({username}) =>{
    return(
        <section className="profile-header">
          <div className="avatar">{username.charAt(0).toUpperCase()}</div>
          <h2>{username}</h2>
      </section>
    )
}

export default UserAvatar;