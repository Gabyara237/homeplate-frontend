import { Routes, Route, useNavigate } from 'react-router';
import { useEffect, useState, useContext} from 'react';

import * as recipeService from './services/recipeService'
import * as followService from './services/followService'

import PublicHome from "./components/PublicHome/PublicHome";
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import RecipeForm from './components/RecipeForm/RecipeForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import NavBar from './components/NavBar/NavBar';
import { UserContext } from './contexts/UserContext';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Follow from './components/Follow/Follow';
import './App.css'

const App = () => {
  const {user} = useContext(UserContext);
  const userId =user?._id;
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([])
  const [followingIds, setFollowingIds] = useState(new Set());

  useEffect(()=>{
    const fetchAllRecipes = async () =>{
      const recipesData = await recipeService.index();
      setRecipes(recipesData)
    }
    fetchAllRecipes()
  },[])

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
    const updatedRecipe = await recipeService.update(recipeId,payload)
    setRecipes(recipes.map((recipe)=>(recipeId === recipe._id? updatedRecipe:recipe)))
    navigate(`/recipes/${recipeId}`);
  };

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


  return user ? (
    <div className="app-layout">
      <NavBar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<RecipeList recipes={recipes} toggleLike={toggleLike} followingIds={followingIds} handleFollow={handleFollow}/>} />
          <Route path="/recipes/new" element={<RecipeForm handleAddRecipe={handleAddRecipe} />} />
          <Route path="/my-recipes" element={<RecipeList recipes={recipes} toggleLike={toggleLike} followingIds={followingIds} handleFollow={handleFollow}/>} />
          <Route path="/recipes/:recipeId" element={<RecipeDetails handleDeleteRecipe={handleDeleteRecipe} toggleLike={toggleLike} followingIds={followingIds} handleFollow={handleFollow}  />} />
          <Route path="/recipes/:recipeId/edit" element={<RecipeForm handleUpdateRecipe={handleUpdateRecipe} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/follow" element={<Follow />} />
        </Routes>
      </main>
    </div>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;

