import { Routes, Route, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import * as recipeService from './services/recipeService'

import Homepage from './components/Homepage/Homepage';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import RecipeForm from './components/RecipeForm/RecipeForm';
import './App.css'


const App = () => {

  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([])

  useEffect(()=>{
    const fetchAllRecipes = async () =>{
      const recipesData = await recipeService.index();
      setRecipes(recipesData)
    }
    fetchAllRecipes()
  },[])

  const buildPayload= (recipeFormData) => {
    const normalizedTags = Array.isArray(recipeFormData.tags)
    ? recipeFormData.tags: recipeFormData.tags.split(",").map((tag) => tag.trim()).filter(Boolean)


    const payload={
      title: recipeFormData.title,
      description: recipeFormData.description,
      imageUrl: recipeFormData.imageUrl,
      difficultyLevel: recipeFormData.difficultyLevel,
      typeRecipe: recipeFormData.typeRecipe,

      prepTime: Number(recipeFormData.prepTime),
      servings: Number(recipeFormData.servings),

      ingredients: recipeFormData.ingredients.map((ingredient) => ({
        nameIngredient: ingredient.nameIngredient,
        unitQuantity: Number(ingredient.unitQuantity),
      })),

      steps: recipeFormData.steps.map((step) => ({
        stepNumber: Number(step.stepNumber),
        stepTitle: step.stepTitle,
        stepDescription: step.stepDescription,
      })),

      tags: normalizedTags,
    };
    return payload;
  }
  const handleAddRecipe = async (recipeFormData) => {
    const payload= buildPayload(recipeFormData)
    const newRecipe= await recipeService.create(payload);
    setRecipes([newRecipe, ...recipes])
    navigate("/recipes");
  };

  const handleDeleteRecipe = async(recipeId) =>{
    const deletedRecipe = await recipeService.deleteRecipe(recipeId)
    setRecipes(recipes.filter((recipe)=>recipe._id !== deletedRecipe._id));
    navigate('/recipes');
  }

  const handleUpdateRecipe = async (recipeId, recipeFormData) => {
    const payload= buildPayload(recipeFormData);
    const updatedRecipe = await recipeService.udpate(recipeId,payload)
    setRecipes(recipes.map((recipe)=>(recipeId === recipe._id? updatedRecipe:recipe)))
    navigate(`/recipes/${recipeId}`);
  };

  return(
    <>
      <Routes>
        <Route path='/recipes' element={<Homepage recipes={recipes}/>}/>
        <Route path='/recipes/new' element={<RecipeForm handleAddRecipe={handleAddRecipe} />}/>
        <Route path='/recipes/:recipeId' element={<RecipeDetails handleDeleteRecipe={handleDeleteRecipe}/>}/>
        <Route path='/recipes/:recipeId/edit' element={<RecipeForm handleUpdateRecipe={handleUpdateRecipe}/>}/>
        
      </Routes>
    </>
  );
};

export default App;
