import { useContext } from "react";

import { UserContext } from '../../../contexts/UserContext';


const FollowButton = ({recipe, followingIds, handleFollow}) => {
    const { user } = useContext(UserContext);
    const userId = user?._id;
    const authorId =recipe.author._id;

   
    const followed = userId ? followingIds.has(authorId) : false;


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
        <div>
            {(recipe.author._id !== userId)? <button className="btn-follow" onClick={()=>handleChangeFollow(authorId)}>{followed? "Unfollow": <><span className="plus"> + </span> Follow</>}</button> :<></>}
        </div>
        
    )
}

export default FollowButton