import { useEffect, useState } from "react"
import { Link, useParams, useLocation } from 'react-router';
import * as recipeService from '../../services/recipeService';

import './recipeform.css'

const initialState = {
    title: '',
    description:'',
    imageUrl: '',
    prepTime: '',
    difficultyLevel: 'Easy',
    tags:'',
    typeRecipe:'Breakfast',
    servings:1,
    ingredients: [{ nameIngredient: "", unitQuantity: "" }],
    steps: [{ stepNumber: 1, stepTitle: "", stepDescription: "" }],
}

const RecipeForm =({handleAddRecipe, handleUpdateRecipe})=>{
    const {recipeId} = useParams();
    const location = useLocation();

    const from = location.state?.from || "/";
    const [formData, setFormData] = useState(initialState)

    const handleChange =(evt) =>{
        setFormData({...formData,[evt.target.name]:evt.target.value})
    }

    const hadleSubmit = (evt) =>{
        evt.preventDefault()
        if (recipeId){
            handleUpdateRecipe(recipeId,formData)
        }else{
            
            handleAddRecipe(formData);
        }
    }

    const addIngredient = () =>{
        setFormData((prev) =>({
            ...prev,
            ingredients:[...prev.ingredients, {nameIngredient:"", unitQuantity:""}]
        }))
    }

    const removeIngredient = (index) =>{
        setFormData((prev)=>({
            ...prev,
            ingredients: prev.ingredients.filter((_,indexIngredient) => indexIngredient !==index)
        }))
    }

    const handleIngredientChange = (index, field, value) =>{
        setFormData((prev)=>{
            const updated = [...prev.ingredients];
            updated[index]= {...updated[index],[field]:value};
            return {...prev, ingredients:updated}
        })
    }

    const addStep=()=>{
        setFormData((prev)=>({
            ...prev,
            steps:[
                ...prev.steps,
                {stepNumber:prev.steps.length+1, stepTitle: "", stepDescription:""}
            ]
        }))

    }
    const removeStep =(index)=>{
        setFormData((prev)=>{
            const filtered = prev.steps.filter((_,indexStep)=> indexStep !==index);
            const renumbered =  filtered.map((step, index)=>({...step,stepNumber: index+1}))

            return {...prev, steps:renumbered}
        })
    }
    const handleStepChange = (index,field, value) =>{
        setFormData((prev)=>{
            const updated =[...prev.steps];
            updated[index] ={...updated[index], [field]: value};
            return {...prev, steps:updated}
        })
    }

    useEffect(()=>{
        const fetchRecipe = async () =>{
            const recipeData = await recipeService.show(recipeId);
            setFormData({...recipeData, tags: Array.isArray(recipeData.tags) ? recipeData.tags.join(", ") : recipeData.tags,
    });
        };
        if (recipeId) fetchRecipe()

        return () => setFormData(initialState)
    },[recipeId])



    return(
        <main>
            <h3>{recipeId ? 'Edit Recipe' : 'Create new Recipe'}</h3>
            <form className="form" onSubmit={hadleSubmit}>
                <div className="general-info">

                    <h3> General Information </h3>
                    <div className="div-form">
                        <label htmlFor="title">Recipe title</label>
                        <input
                            className="input"
                            required
                            type='text'
                            name='title'
                            id='title'
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="div-form">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            className="input"
                            required
                            type='text'
                            name='imageUrl'
                            id='imageUrl'
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="div-form"> 
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="textarea"
                            required
                            type='text'
                            name='description'
                            id='description'
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="type-tags">
                        <div className="type-form">
                            <label htmlFor="typeRecipe">Type of recipe</label>
                            <select
                                className="select"
                                required
                                name='typeRecipe'
                                id='typeRecipe'
                                value={formData.typeRecipe}
                                onChange={handleChange}
                                >
                                <option value='Breakfast'>Breakfast</option>
                                <option value='Lunch'>Lunch</option>
                                <option value='Dinner'>Dinner</option>
                                <option value='Dessert'>Dessert</option>
                                <option value='Snack'>Snack</option>
                            </select>
                        </div>
                        <div className="tags-form">
                            <div className="tags-for2">
                                <label htmlFor="tags">Tags</label>
                                <input
                                    className="input"
                                    required
                                    type='text'
                                    name='tags'
                                    id='tags'
                                    value={formData.tags}
                                    onChange={handleChange}
                                />
                            </div>
                            <p>Separate your tags with commas </p>
                        </div>
                    </div>
                    <div className="time-difficulty">
                        <div className="time">
                            <label htmlFor="prepTime">Preparation time</label>
                            <div className="input-info">
                                <input
                                    className="input"
                                    required
                                    type='number'
                                    name='prepTime'
                                    id='prepTime'
                                    value={formData.prepTime}
                                    onChange={handleChange}
                                />
                                <p className="people">min</p>

                            </div>
                        </div>
                        <div className="servings">
                            <label htmlFor="servings">Servings</label>
                            <div className="input-info">
                                <input
                                    className="input"
                                    required
                                    type='number'
                                    name='servings'
                                    id='servings'
                                    value={formData.servings}
                                    onChange={handleChange}
                                />
                                <p className="people">people</p>

                            </div>
                        </div>

                    </div>
                    <div className="difficulty">
                        <label htmlFor="difficultyLevel">Level of difficulty</label>
                        <select
                            className="select"
                            required
                            name='difficultyLevel'
                            id='difficultyLevel'
                            value={formData.difficultyLevel}
                            onChange={handleChange}
                            >
                            <option value='Easy'>Easy</option>
                            <option value='Medium'>Medium</option>
                            <option value='Hard'>Hard</option>
                        </select>
                    </div>

                </div>
                <div className="list-ingredients">

                    <h3> List of ingredients </h3>
                    <div className="ingredient-container">

                        {formData.ingredients.map((ingredient, index)=>(
                            <div className="ingredient" key={index}>
                        
                                
                                    <div className="name-ingredient">
                                        <div className="num-title">
                                            <p className="step-num">{index+1}</p>
                                            <label htmlFor="nameIngredient">Name of ingredients</label>
                                        </div>    
                                        <div>
                                            <input
                                                className="input"
                                                required
                                                type='text'
                                                name='nameIngredient'
                                                id='nameIngredient'
                                                value={ingredient.nameIngredient}
                                                onChange={(evt) =>handleIngredientChange(index, "nameIngredient", evt.target.value)}
                                                />

                                        </div>

                                    </div>
                                    <div className="unit-quantity">
                                        <label htmlFor="unitQuantity">Unit/quantity</label>
                                        <input
                                            className="input"
                                            required
                                            type='number'
                                            name='unitQuantity'
                                            id='unitQuantity'
                                            value={ingredient.unitQuantity}
                                            onChange={(evt)=>handleIngredientChange(index,"unitQuantity", evt.target.value)}
                                            />
                                        
                                    </div>
                            
                                    {formData.ingredients.length>1 && (
                                        <button className="btn-create-recipe btn-remove-form"  type="button" onClick={()=> removeIngredient(index)}>
                                            Remove
                                        </button>
                                    )}

                            </div>

                        ))}
                        <button className="btn-create-recipe btn-add-form" type="button" onClick={addIngredient}>
                            + Add ingredient
                        </button>
                    </div>
                </div>
                <div className="steps">
                    <h3> Steps for the recipe </h3>
                    <div className="steps-container">
                        {formData.steps.map((step, index)=>(
                            <div className="step" key={index}>
                                <div className="step-title">
                                    <div className="num-title">
                                        <p className="step-num">{index+1}</p>
                                        <label htmlFor="stepTitle">Step title</label>
                                    </div>
                                    <div >
                                        <input
                                            className="input"
                                            required
                                            type='text'
                                            name='stepTitle'
                                            id='stepTitle'
                                            value={step.stepTitle}
                                            onChange={(evt)=> handleStepChange(index,"stepTitle", evt.target.value)}
                                        />
                                    </div>

                                </div>

                                <div className="step-description">
                                    <label htmlFor="stepDescription">Description of the step</label>
                                    <textarea
                                        className="textarea"
                                        required
                                        type='text'
                                        name='stepDescription'
                                        id='stepDescription'
                                        value={step.stepDescription}
                                        onChange={(evt)=>handleStepChange(index,"stepDescription", evt.target.value)}
                                    />

                                </div>
                           
                                    {formData.steps.length>1 &&(
                                        <button className="btn-create-recipe btn-remove-form" type="button" onClick={()=>removeStep(index)}>
                                            Remove
                                        </button>
                                    )}

                                

                            </div>

                        ))}
                        <button className="btn-create-recipe btn-add-form" type="button" onClick={addStep}>
                            + Add Step
                        </button>
                    </div>
                </div>
                <div className="btn-actions">
                    <Link className="btn-create-recipe btn-cancel-form" to={from}>Cancel</Link>
                    <button className="btn-create-recipe btn-form" type='submit'>{recipeId ? 'EDIT RECIPE': 'CREATE RECIPE'}</button>
                </div>

            </form>
        </main>
    )

}

export default RecipeForm