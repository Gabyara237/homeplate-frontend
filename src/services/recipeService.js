const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/recipes`

const index = async ()=>{
    try{
        const res= await fetch(BASE_URL,{
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json()
    }catch(err){
        console.log(err)
    }
}

const show = async (recipeId) =>{
    try {
        const res= await fetch(`${BASE_URL}/${recipeId}`,{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json()
    }catch (err){
       console.log(err)
    }
}

const create = async (recipeFormData)=>{
    try{
        const res= await fetch(BASE_URL,{
            method: 'POST',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(recipeFormData),
        })
        return res.json();
    
    }catch(err){
        console.log(err)
    }
}

const deleteRecipe = async (recipeId)=>{
    try{
        const res = await fetch(`${BASE_URL}/${recipeId}`,{
            method:'DELETE',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.json();
    }catch(err){
        console.log(err)
    }
}

const udpate = async (recipeId, recipeFormData)=>{
    try{
        const res= await fetch(`${BASE_URL}/${recipeId}`,{
            method: 'PUT',
            headers:{
                Authorization: `Beare ${localStorage.getItem('token')}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(recipeFormData),
        })
        return res.json();
    }catch(err){
        console.log(err)
    }
}

export{
    index,
    show,
    create,
    deleteRecipe,
    udpate
}