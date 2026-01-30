import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";

const ProfilePage = ({ recipes }) => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(user?.bio || "");

  if (!user || !recipes) {
    return <p>Loading profile...</p>;
  }

  // Filter only recipes of the logged-in user
  const userRecipes = recipes.filter(
    (recipe) => recipe.author._id === user._id
  );

  // Save bio
  const handleSaveBio = async () => {
    try {
      const updatedUser = await userService.updateProfile(user._id, { bio: newBio });
      setUser(updatedUser); // update context immediately
      setIsEditing(false);
    } catch (err) {
      console.log("Error updating bio:", err);
    }
  };

  return (
    <main>
      <h1>{user.username}'s Profile</h1>

      <section>
        <h3>About:</h3>
        {isEditing ? (
          <>
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              rows={4}
              cols={50}
            />
            <br />
            <button onClick={handleSaveBio}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p>{user.bio && user.bio.trim() ? user.bio : "No bio yet"}</p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </>
        )}
      </section>

      <section>
        <h2>My Recipes</h2>
        {userRecipes.length > 0 ? (
          <ul>
            {userRecipes.map((recipe) => (
              <li key={recipe._id}>{recipe.title}</li>
            ))}
          </ul>
        ) : (
          <p>You haven't added any recipes yet.</p>
        )}
      </section>
    </main>
  );
};

export default ProfilePage;
