import { useState } from "react"


const RecipeForm =({handleAddRecipe})=>{
    const [formData, setFormData] = useState({
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
    })

    const handleChange =(evt) =>{
        setFormData({...formData,[evt.target.name]:evt.target.value})
    }

    const hadleSubmit = (evt) =>{
        evt.preventDefault()
        handleAddRecipe(formData);
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

    return(
        <main>
            <form onSubmit={hadleSubmit}>
                <div>

                    <h3> General Information </h3>
                    <label htmlFor="title">Recipe title</label>
                    <input
                        required
                        type='text'
                        name='title'
                        id='title'
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        required
                        type='text'
                        name='imageUrl'
                        id='imageUrl'
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        required
                        type='text'
                        name='description'
                        id='description'
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <label htmlFor="typeRecipe">Type of recipe</label>
                    <select
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
                    <label htmlFor="tags">Tags</label>
                    <input
                        required
                        type='text'
                        name='tags'
                        id='tags'
                        value={formData.tags}
                        onChange={handleChange}
                    />
                    <label htmlFor="prepTime">Preparation time</label>
                    <input
                        required
                        type='number'
                        name='prepTime'
                        id='prepTime'
                        value={formData.prepTime}
                        onChange={handleChange}
                    />
                    <label htmlFor="servings">Servings</label>
                    <input
                        required
                        type='number'
                        name='servings'
                        id='servings'
                        value={formData.servings}
                        onChange={handleChange}
                    />
                    <label htmlFor="difficultyLevel">Level of difficulty</label>
                    <select
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
                <div>

                    <h3> List of ingredients </h3>
                    {formData.ingredients.map((ingredient, index)=>(
                        <div key={index}>
                            <label htmlFor="nameIngredient">Name of ingredients</label>
                            <input
                                required
                                type='text'
                                name='nameIngredient'
                                id='nameIngredient'
                                value={ingredient.nameIngredient}
                                onChange={(evt) =>handleIngredientChange(index, "nameIngredient", evt.target.value)}
                            />

                            <label htmlFor="unitQuantity">Unit/quantity</label>
                            <input
                                required
                                type='number'
                                name='unitQuantity'
                                id='unitQuantity'
                                value={ingredient.unitQuantity}
                                onChange={(evt)=>handleIngredientChange(index,"unitQuantity", evt.target.value)}
                            />
                        
                            {formData.ingredients.length>1 && (
                                <button type="button" onClick={()=> removeIngredient(index)}>
                                    Remove
                                </button>
                            )}

                        </div>

                    ))}
                    <button type="button" onClick={addIngredient}>
                        + Add ingredient
                    </button>
                </div>
                <div>
                    <h3> Steps for the recipe </h3>
                    {formData.steps.map((step, index)=>(
                        <div key={index}>

                            <label htmlFor="stepTitle">Step title</label>
                            <input
                                required
                                type='text'
                                name='stepTitle'
                                id='stepTitle'
                                value={step.stepTitle}
                                onChange={(evt)=> handleStepChange(index,"stepTitle", evt.target.value)}
                            />

                            <label htmlFor="stepDescription">Description of the step</label>
                            <textarea
                                required
                                type='text'
                                name='stepDescription'
                                id='stepDescription'
                                value={step.stepDescription}
                                onChange={(evt)=>handleStepChange(index,"stepDescription", evt.target.value)}
                            />

                            {formData.steps.length>1 &&(
                                <button type="button" onClick={()=>removeStep(index)}>
                                    Remove
                                </button>
                            )}
                        </div>

                    ))}
                    <button type="button" onClick={addStep}>
                        + Add Step
                    </button>

                </div>

                <button type='submit'>CREATE RECIPE</button>
            </form>
        </main>
    )

}

export default RecipeForm