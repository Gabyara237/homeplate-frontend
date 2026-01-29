import { Link } from "react-router";
import RecipeCard from "../common/RecipeCard/RecipeCard";
import { useMemo, useState } from "react";
import './recipelist.css'
import FoodTypeFilter from "../common/FoodTypeFilter/FoodTypeFilter";

import foodImage from '../../assets/food.png'

const RecipeList = ({recipes, toggleLike, followingIds, handleFollow}) =>{


    const FOODTYPES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack' ]

    const [selectedTypes, setSelectedTypes] = useState(["All"])


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