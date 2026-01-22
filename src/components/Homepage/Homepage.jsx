const RecipeList = ({recipes}) =>{
    return (
        <main>
            {
                recipes.map((recipes)=>(
                    <p key={recipes._id}>{recipes.title}</p>
                ))
            }
        </main>
    )
}

export default RecipeList;