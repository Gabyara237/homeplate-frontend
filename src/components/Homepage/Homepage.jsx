import { Link } from "react-router";
import RecipeCard from "../common/RecipeCard/RecipeCard";
import * as recipeService from '../../services/recipeService';
import * as followService from '../../services/followService'
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import './homepage.css'
import FoodTypeFilter from "../common/FoodTypeFilter/FoodTypeFilter";

import foodImage from '../../assets/food.png'

const RecipeList = ({recipes}) =>{

    const {user} = useContext(UserContext);
    const userId =user?._id;
    const FOODTYPES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack' ]

    const [followingIds, setFollowingIds] = useState(new Set());
    const [selectedTypes, setSelectedTypes] = useState(["All"])

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

    const toggleType = (selectedType) => {
        setSelectedTypes((prev) => {
            if (selectedType === "All") return ["All"];

            const withoutAll = prev.filter((type) => type !== "All");

            if (withoutAll.includes(selectedType)) {
                const filterBy = withoutAll.filter((type) => type !== selectedType);
                return filterBy.length ? filterBy : ["All"];
            }

            return [...withoutAll, selectedType];
        });
    };

    const filteredRecipes = useMemo(()=>{
        if (selectedTypes.includes("All")){
            return recipes;
        }else{
            return recipes.filter((recipe)=> selectedTypes.includes(recipe.typeRecipe))
        }

    },[recipes,selectedTypes])

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
        <main >
            <div className="action">
                <Link to="/recipes/new" className="btn-create-recipe">
                    <span className="plus">+</span> Create new recipe
                </Link>
            </div>
            <div className="separator"></div>
            <div className="separator">
                <FoodTypeFilter foodTypes={FOODTYPES} selectedTypes={selectedTypes} toggleType={toggleType} />
            </div>
            <div className="recipe-main">
                {filteredRecipes.length>0?
                    filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe} toggleLike={toggleLike} followingIds={followingIds} handleFollow={handleFollow}/>
                )):<div>
                    <h2>No recipes yet for this category <img className="img-food" src={foodImage} alt="foodImage"/> <br/>Be the first to share one and inspire others!</h2>
                    <Link to="/recipes/new" className="btn-create-recipe">
                        <span className="plus">+</span> Create new recipe
                    </Link>
                
                </div>
            }
            </div>
        </main>
    )
}

export default RecipeList;