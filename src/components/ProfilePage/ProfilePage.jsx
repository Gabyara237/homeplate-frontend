import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";
import RecipeList from "../RecipeList/RecipeList";

import UserAvatar from "../common/UserAvatar/UserAvatar";

import "./ProfilePage.css";

const ProfilePage = ({
  recipes,
  toggleLike,
  followingIds,
  handleFollow,
}) => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(user?.bio || "");

  if (!user || !recipes) {
    return <p className="loading-text">Loading profile...</p>;
  }

  // ONLY this user's recipes
  const userRecipes = recipes.filter(
    (recipe) => recipe.author._id === user._id
  );

  const handleSaveBio = async () => {
    try {
      const updatedUser = await userService.updateProfile(user._id, {
        bio: newBio,
      });
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.log("Error updating bio:", err);
    }
  };

  return (
    <main className="profile-page">
      <UserAvatar username={user.username}/>
      {/* BIO SECTION */}
      <section className="profile-bio">

        {isEditing ? (
          <>
            <textarea
              className="bio-textarea"
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              rows={4}
            />
            <div className="bio-buttons">
              <button className="btn-edit" onClick={handleSaveBio}>
                Save
              </button>
              <button
                className="btn-create-recipe btn-cancel-form" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="bio-text">
              {user.bio?.trim() || "No bio yet"}
            </p>
            <button
              className="btn-edit"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </>
        )}
        <div className="followers">
          <p></p>

        </div>
      </section>

      {/* RECIPES SECTION — reused homepage layout */}
      <section className="profile-recipes">
        <h3 className="title-recipe-profile">My Recipes</h3>

        <RecipeList
          recipes={userRecipes}
          toggleLike={toggleLike}
          followingIds={followingIds}
          handleFollow={handleFollow}
        />
      </section>
    </main>
  );
};

export default ProfilePage;
