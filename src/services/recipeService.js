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

const update = async (recipeId, recipeFormData)=>{
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


const createComment = async (recipeId,commentFormData)=>{
    try{
        const res = await fetch(`${BASE_URL}/${recipeId}/comments`,{
            method: "POST",
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData),
        });
        return res.json()

    }catch(err){
        console.log(err)
    }

}


const deleteComment = async (recipeId,commentId)=>{
    try{   
        const res= await fetch(`${BASE_URL}/${recipeId}/comments/${commentId}`, {
            method:"DELETE",
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return res.json();
    }catch(err){
        console.log(err)
    }

}

const updateComment = async (recipeId, commentId, commentFormData) =>{
    try{
        const res= await fetch(`${BASE_URL}/${recipeId}/comments/${commentId}`,{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(commentFormData)
        });
        return res.json()
    }catch(err){
        console.log(err)
    }
}

const addLike = async (recipeId) =>{
    try{
        const res = await fetch(`${BASE_URL}/${recipeId}/likes`,{
            method:'POST',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        return res.json()
    }catch(err){
        console.log(err)
    }
}

const deleteLike = async (recipeId) =>{
    try{
        const res = await fetch(`${BASE_URL}/${recipeId}/likes`,{
            method:'DELETE',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        return res.json()
    }catch(err){
        console.log(err)
    }
}

export{
    index,
    show,
    create,
    deleteRecipe,
    update,
    createComment,
    deleteComment,
    updateComment,
    addLike,
    deleteLike
}