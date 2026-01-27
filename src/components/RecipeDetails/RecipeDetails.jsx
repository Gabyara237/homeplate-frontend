import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as recipeService from '../../services/recipeService';

import { UserContext } from '../../contexts/UserContext';
import CommentForm from '../CommentForm/CommentForm';



const RecipeDetails = ({handleDeleteRecipe}) =>{
    const {recipeId} = useParams();
    const { user } = useContext(UserContext);

    const [recipe, setRecipe] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    useEffect(()=>{
        const fetchRecipe = async () =>{
        const recipeData = await recipeService.show(recipeId)
        setRecipe(recipeData)
        }
        fetchRecipe();
    },[recipeId])
    if (!recipe) return <main>Loading...</main>;

    const handleAddComment = async (commentFormData) =>{
        const newComment = await recipeService.createComment(recipeId, commentFormData);
        setRecipe({...recipe, comments:[newComment, ...recipe.comments]});
    }

    const handleDeleteComment = async(commentId)=>{
        await recipeService.deleteComment(recipeId,commentId)
        setRecipe({...recipe, comments: recipe.comments.filter((comment)=> commentId !== comment._id)})
    }

    const handleEditComment =async (commentId,data) => {
      const updated = await recipeService.updateComment(recipeId, commentId, data);

      setRecipe((prev) => ({
        ...prev,
        comments: prev.comments.map((comment) => (comment._id === commentId ? {...updated, author:comment.author} : comment)),
      }));

      setEditingCommentId(null);
    }

    return (
    <main>
      <section>
        <header>
          <h1>{recipe.title}</h1>
          <p>
            {`${recipe.author.username} posted on
            ${new Date(recipe.createdAt).toLocaleDateString()}`}
          </p>
        </header>
        <p>{recipe.description}</p>
        {recipe.author._id === user._id && (
              <>
                <Link to={`/recipes/${recipeId}/edit`}>Edit</Link>
                <button onClick={()=> handleDeleteRecipe(recipeId)}>Delete</button>
              </>
            )}
      </section>
      <section>
        <h2>Comments</h2>
        <CommentForm 
            submitLabel="Submit comment"
            onSubmit={handleAddComment}

        />
        {!recipe.comments.length && <p> There are no comments. <br/>Be the first to comment</p>}

        {recipe.comments.map((comment)=>(
            <article key={comment._id}>
                <header>
                    <p>
                        {`${comment.author.username} posted on ${new Date(comment.createdAt).toLocaleDateString()}`}
                    </p>
                </header>
                {editingCommentId === comment._id?(
                    <CommentForm
                        key={comment._id} 
                        initialText={comment.text}
                        submitLabel='Save'
                        onSubmit={(data) => handleEditComment(comment._id,data)}/>

                ):(<p>{comment.text}</p>)}

                {/* <> */}
                    <button 
                        type="button"
                        onClick={()=>{
                            setEditingCommentId(comment._id);
                        }} 
                    >
                        Edit
                    </button>
                    <button onClick={()=> handleDeleteComment(comment._id)}>Delete</button>
                {/* </> */}
                {/* )} */}
            </article>
       ))}
      </section>
    </main>
  );
}

export default RecipeDetails