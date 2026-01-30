import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getMyFollowing, getMyFollowers } from "../../services/followService";
import "./Follow.css";

export default function Followers() {
  const { user } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState("followers");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const username = user?.username || "User";
  const initial = username.charAt(0).toUpperCase();

  useEffect(() => {
    const loadData = async () => {
      try {
        const followersData = await getMyFollowers();
        const followingData = await getMyFollowing();

        setFollowers(
          Array.isArray(followersData.followers)
            ? followersData.followers
            : []
        );

        setFollowing(
          Array.isArray(followingData.following)
            ? followingData.following
            : []
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const usersToShow =
    activeTab === "followers" ? followers : following;

  const filteredUsers = usersToShow.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="followers-bg">
      <main className="followers-page">
        <section className="profile-header">
          <div className="avatar">{initial}</div>
          <h2>{username}</h2>
        </section>

        <div className="follow-tabs">
          <button
            className={activeTab === "followers" ? "active" : ""}
            onClick={() => {
              setActiveTab("followers");
              setSearchInput("");
              setSearchTerm("");
            }}
          >
            {followers.length} Followers
          </button>

          <button
            className={activeTab === "following" ? "active" : ""}
            onClick={() => {
              setActiveTab("following");
              setSearchInput("");
              setSearchTerm("");
            }}
          >
            {following.length} Following
          </button>

          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                setSearchTerm(searchInput);
              }
            }}
          />

          <button
            className="search-btn"
            type="button"
            onClick={() => setSearchTerm(searchInput)}
          >
            Search
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && filteredUsers.length === 0 && (
          <p className="empty">
            {activeTab === "followers"
              ? "No followers yet."
              : "Not following anyone yet."}
          </p>
        )}

        <section className="user-list">
          {filteredUsers.map(user => (
            <div className="user-card" key={user._id}>
              <div className="user-info">
                <div className="avatar">
                  {user.username[0].toUpperCase()}
                </div>
                <strong>{user.username}</strong>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
