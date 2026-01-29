import { useState,useContext } from "react";
import { UserContext } from '../../../contexts/UserContext';

import heartImage from '../../../assets/heart.png';
import heartRedImage from '../../../assets/heartRed.png'
import commentImage from '../../../assets/comment.png'

const LikeButton = ({recipe, toggleLike}) =>{
    const { user } = useContext(UserContext);
    const userId = user?._id;
    const initialLiked = userId ? recipe.likes.includes(userId) : false;
    const initialLikesCount = recipe.likes.length;

    const [liked, setLiked]= useState(initialLiked);
    const [likesCount, setLikesCount] = useState(initialLikesCount)

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
    return (
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
    )

}

export default LikeButton