import { useContext, useState } from "react";
import { Link } from "react-router";


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
        <div key={recipe._id}> 
            <div>
                <p>{recipe.author.username}</p>
                <button onClick={()=>handleChangeFollow(authorId)}>{followed? "Unfollow":"Follow"}</button>
            </div>
            <Link to = {`/recipes/${recipe._id}`}>
                <article>
                    <header>
                        <h2>{recipe.title}</h2>
                        <p>{`posted on ${new Date(recipe.createdAt).toLocaleDateString()}`}</p>
                    </header>
                        <p>{recipe.description}</p>
                </article>
            </Link>
            <div>
                <button onClick={handleChangeLike}>{liked? "Unlike":"Like"}</button> 
                <p>{likesCount}</p>
            </div>
        </div>
    )

}

export default RecipeCard