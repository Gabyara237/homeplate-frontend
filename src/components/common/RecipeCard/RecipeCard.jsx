import { useContext, useState } from "react";
import { Link } from "react-router";

import timeImage from '../../../assets/time.png'
import servingImage from '../../../assets/servings.png'
import heartImage from '../../../assets/heart.png';
import heartRedImage from '../../../assets/heartRed.png'
import commentImage from '../../../assets/comment.png'

import './recipeCard.css'

import { UserContext } from '../../../contexts/UserContext';

const RecipeCard=({recipe,toggleLike, followingIds, handleFollow})=>{
    const { user } = useContext(UserContext);
    const userId = user?._id;
    const initialLiked = userId ? recipe.likes.includes(userId) : false;
    const initialLikesCount = recipe.likes.length;
    const authorId =recipe.author._id;

    const [liked, setLiked]= useState(initialLiked);
    const [likesCount, setLikesCount] = useState(initialLikesCount)
   
    const followed = userId ? followingIds.has(authorId) : false;


    const handleChangeLike = async()=>{
        if (!userId) return;

        const nextLiked = !liked;

        setLiked(nextLiked);
        setLikesCount((count)=>count+(nextLiked ? 1: -1));

        try{
            await toggleLike(recipe._id,nextLiked)

        }catch (err){
            setLiked(!nextLiked);
            setLikesCount((count)=> count + (nextLiked? -1 : 1));
            console.log(err)
        }
    }

    const handleChangeFollow = async (targetUserId) =>{
        if(!userId) return;
        if(targetUserId === userId) return;

        const nextFollowed = !followed;
        
        try {
            await handleFollow(targetUserId, nextFollowed);
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <div className="main-container" key={recipe._id}> 
            <div className="publication-info">
                <div className="username">
                    <p className="username-initial">{recipe.author.username.charAt(0).toUpperCase()}</p>
                    <p>{recipe.author.username}</p>

                </div>
                {
                    (recipe.author._id !== user._id)? <button className="btn-follow" onClick={()=>handleChangeFollow(authorId)}>{followed? "Unfollow": <><span className="plus"> + </span> Follow</>}</button> :<></>
                }
                
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
            <div className="interaction-recipes">
                <div className="likes">
                    <p>{likesCount}</p>
                    <button className="btn-like" onClick={handleChangeLike}>{liked? <img  className="icon2" src={heartRedImage} alt="unlike" />:<img  className="icon2" src={heartImage} alt="like" />}</button> 
                </div>
                <div className="comments">
                    <p>{recipe.comments.length}</p>
                    <img  className="icon" src={commentImage} alt="comment" />
                </div>
            </div>
        </div>
    )

}

export default RecipeCard