import { Link } from "react-router";

import timeImage from '../../../assets/time.png'
import servingImage from '../../../assets/servings.png'
import LikeButton from '../LikeButton/LikeButton'
import FollowButton from "../FollowButton/FollowButton";
import './recipeCard.css'


const RecipeCard=({recipe,toggleLike, followingIds, handleFollow})=>{

    return(
        <div className="main-container" key={recipe._id}> 
            <div className="publication-info">
                <div className="username">
                    <p className="username-initial">{recipe.author.username.charAt(0).toUpperCase()}</p>
                    <p>{recipe.author.username}</p>

                </div>
                <FollowButton recipe={recipe} followingIds={followingIds} handleFollow={handleFollow}/>
                
            </div>
            <div className="card-info-container">
                <Link className="card-info-container" to = {`/recipes/${recipe._id}`}>
                <div className="left-container">
                    <img className="recipe-image" src={recipe.imageUrl} alt={recipe.title}/>
                </div>
                <div className="right-container">
                    <div className="recipe-info">
                        <div className="header-info" >
                            <h2>{recipe.title}</h2>
                        </div>
                        <div className="recipe-type">
                            <p className={`type type-${recipe.typeRecipe.toLowerCase()}`}>
                                {recipe.typeRecipe}
                            </p>
                        </div>
                        <div className="time-serving-info">
                            <div className="time-info">
                                <img  className="icon" src={timeImage} alt={recipe.title} />
                                <p>{recipe.prepTime} min </p>

                            </div>
                            <div className="serving-info">
                                <img className="icon" src={servingImage} alt={recipe.title} />
                                <p> {recipe.servings} servings </p>
                            </div>
                            
                            
                        </div>
                        <div className="recipe-description">
                            <p>{recipe.description}</p>
                        </div>
                        <div className="tags">
                            {
                                recipe.tags.map((tag,index)=>(
                                    <p className="tag" key={index}>#{tag}</p>
                                    
                                ))
                            }
                        </div>

                    </div>

                </div>
                </Link>

            </div>
            <LikeButton recipe={recipe} toggleLike={toggleLike}/> 
            
        </div>
    )

}

export default RecipeCard