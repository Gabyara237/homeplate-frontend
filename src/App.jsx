import RecipeList from './components/Homepage/Homepage';
import * as recipeService from './services/recipeService/recipeService'

import './App.css'

import { Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';

const App = () => {

  const [recipes, setRecipes] = useState([])

  useEffect(()=>{
    const fetchAllRecipes = async () =>{
      const recipesData = await recipeService.index();
      setRecipes(recipesData)
    }
    fetchAllRecipes()
  },[])

  return(
    <>
      <Routes>
        <Route path='/recipes' element={<RecipeList recipes={recipes}/>}/>
      </Routes>
    </>
  );
};

export default App;
