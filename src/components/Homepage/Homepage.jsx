import { Link } from "react-router";
import RecipeCard from "../common/RecipeCard.jsx/RecipeCard";
import * as recipeService from '../../services/recipeService';


const RecipeList = ({recipes}) =>{
    const toggleLike = async (recipeId, shouldLike) => {
        if (shouldLike) return recipeService.addLike(recipeId);     
        return recipeService.deleteLike(recipeId);                  
    };


    return (
        <main>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} toggleLike={toggleLike} />
            ))}
        </main>
    )
}

export default RecipeList;