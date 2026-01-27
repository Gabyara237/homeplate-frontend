import { Link } from "react-router";
import RecipeCard from "../common/RecipeCard/RecipeCard";
import * as recipeService from '../../services/recipeService';
import * as followService from '../../services/followService'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";


const RecipeList = ({recipes}) =>{

    const {user} = useContext(UserContext);
    const userId =user?._id;

    const [followingIds, setFollowingIds] = useState(new Set());

    useEffect(()=>{
        const fetchMyFollowing = async () =>{
            if(!userId){
                setFollowingIds(new Set());
                return;
            }

            try{
                const data = await followService.getMyFollowing();
                const followingList = new Set(data.following.map(following => following._id));
                setFollowingIds(followingList)
            }catch(err){
                console.log(err)
            }
        }

        fetchMyFollowing();
    },[userId])

    const toggleLike = async (recipeId, shouldLike) => {
        if (shouldLike) return recipeService.addLike(recipeId);     
        return recipeService.deleteLike(recipeId);                  
    };

    const handleFollow = async (targetUserId, shouldFollow) => {
        setFollowingIds(prev =>{
            const next = new Set(prev);
            if(shouldFollow){
                next.add(targetUserId)
            }else{
                next.delete(targetUserId)
            }
            return next;
        })

        try {
            if (shouldFollow) {
                await followService.followUser(targetUserId);
            }else{
                await followService.unfollowUser(targetUserId);
                
            }
        } catch (err) {
            setFollowingIds(prev =>{
                const next = new Set(prev);
                if (shouldFollow){
                    next.delete(targetUserId)
                }else{
                    next.add(targetUserId);
                }
                return next;
            })
            console.log(err);
            throw err; 
        }
    };

    return (
        <main>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} toggleLike={toggleLike} followingIds={followingIds} handleFollow={handleFollow}/>
            ))}
        </main>
    )
}

export default RecipeList;