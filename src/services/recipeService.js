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

export{
    index,
    show
}