import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as recipeService from '../../services/recipeService';

import './recipedetails.css'

import { UserContext } from '../../contexts/UserContext';
import CommentForm from '../CommentForm/CommentForm';
import LikeButton from '../common/LikeButton/LikeButton'
import Difficulty from '../icons/Difficulty'
import Ingredients from '../icons/Ingredients'
import Steps from '../icons/Steps'

import timeImage from '../../assets/time.png'
import servingImage from '../../assets/servings.png'

import { timeAgo } from "../../utils/timeAgo";
import FollowButton from '../common/FollowButton/FollowButton';



const RecipeDetails = ({handleDeleteRecipe, toggleLike, followingIds,handleFollow }) =>{
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

    const difficultyClass = {
      Easy: "difficulty-easy",
      Medium: "difficulty-medium",
      Hard: "difficulty-hard",
    };
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
      <main className="recipe-details">

        <div className='recipe-owner-detail'>
          <div className='initial-username'>
              <p className="username-initial">{recipe.author.username.charAt(0).toUpperCase()}</p>
              <p className='recipe-owner'>
                {recipe.author?.username} 
              </p>
          </div>
            <FollowButton recipe={recipe} followingIds={followingIds} handleFollow={handleFollow}/>

        </div>
        <div className="img-container">
          <div className="img-recipe-detail">
            <img src={recipe.imageUrl} alt={recipe.title} />
          </div>
        </div>

        <div className="recipe-header">
          <div className="title-row">
            <h1 className="recipe-title">{recipe.title}</h1>

            <div className="stats">
              <LikeButton recipe={recipe} toggleLike={toggleLike}/>
            </div>
          </div>

          <div className="tags-recipe">
            <p className='type-recipe-detail'>{recipe.typeRecipe}</p>
            {(recipe.tags ?? []).map((tag) => (
              <span className="tag-recipe" key={tag}>#{tag}</span>
            ))}
          </div>
          <div className='description-title'>
            <h3>Description</h3>
            <div className="meta">
              <span><img className="icon" src={timeImage} alt='time'/> {recipe.prepTime} min</span>
              <span><img className="icon" src={servingImage} alt='time'/> {recipe.servings} servings</span>
              <span><Difficulty className={`icon ${difficultyClass[recipe.difficultyLevel]}`} /> {recipe.difficultyLevel}</span>
            </div>
          </div>
          <div className='recipe-detail-description'>
            <p>{recipe.description}</p>
          </div>


          {recipe.author?._id === user?._id && (
            <div className="owner-actions">
              <Link className='btn-create-recipe  btn-edit' to={`/recipes/${recipeId}/edit`}>Edit</Link>
              <button className='btn-create-recipe btn-remove-form' type="button" onClick={() => handleDeleteRecipe(recipeId)}>Delete</button>
            </div>
          )}
        </div>

        <div className="recipe-body">
          <div className="ingredients-recipe">
            <h2><Ingredients className="icon"/>Ingredients</h2>
            <ul>
              {(recipe.ingredients ?? []).map((ing, idx) => (
                <li key={idx}>
                  {ing.unitQuantity} {ing.nameIngredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="steps-recipe">
            <h2><Steps className="icon"/>Steps</h2>
            <ol className="steps-list">
              {recipe.steps.map((step, index) => (
                <li key={index} className="step-item">
                  <span className="step-number">{index + 1}</span>
                  <div className="step-content">
                    <h3>{`Step ${index+1}: ${step.stepTitle}`}</h3>
                    <p>{step.stepDescription}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="recipe-comments">
          <h2>Comments</h2>

          <div className="comment-form-row">
            <CommentForm submitLabel="Add comment" onSubmit={handleAddComment} />
          </div>

          {!recipe.comments?.length && (
            <p className='no-comment'>There are no comments. <br />Be the first to comment</p>
          )}

          <div className="comment-list">
            {recipe.comments.map((comment) => (
              <article className="comment-card" key={comment._id}>
                <header className="comment-header">
                  <div className='initial-username'>
                    <p className="username-initial comment-username-initial">{comment.author.username.charAt(0).toUpperCase()}</p>
                    <p className='comment-owner'>
                      {comment.author.username} 
                    </p>

                  </div>
                  <p className='comment-time'>{timeAgo(comment.createdAt)}</p>
                </header>

                {editingCommentId === comment._id ? (
                  <CommentForm
                    key={comment._id}
                    initialText={comment.text}
                    submitLabel="Save"
                    onSubmit={(data) => handleEditComment(comment._id, data)}
                  />
                ) : (
                  <p className="comment-text">{comment.text}</p>
                )}


                {comment.author?._id === user?._id && (
                  <div className="comment-actions">
                    <button className='btn-create-recipe  btn-edit' type="button" onClick={() => setEditingCommentId(comment._id)}>
                      Edit
                    </button>
                    <button className='btn-create-recipe btn-remove-form' type="button" onClick={() => handleDeleteComment(comment._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </main>
    );

}

export default RecipeDetails