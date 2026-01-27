const BASE_URL =`${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const followUser = async (userId) =>{
    try{
        const res = await fetch(`${BASE_URL}/${userId}/follow`,{
            method: 'POST',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        if(!res.ok){
            const errorData = await res.json();
            throw new Error(errorData.err || 'Failed to follow user')
        }
        return res.json()
    }catch(err){
        console.log(err)
        throw err;
    }
    
}

const unfollowUser = async (userId) =>{
    try{
        const res = await fetch(`${BASE_URL}/${userId}/follow`,{
            method:'DELETE',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.err || 'Failed to unfollow user');
        }
        return res.json()
    }catch(err){
        console.log(err)
        throw err;
    }
}

const getMyFollowing = async() =>{
    try{
        const res = await fetch(`${BASE_URL}/me/following`,{
            method:'GET',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.err || 'Failed to retrieve following users');
        }
        return res.json()
    }catch(err){
        console.log(err)
        throw err;
    }
}

export{
    followUser,
    unfollowUser,
    getMyFollowing
}