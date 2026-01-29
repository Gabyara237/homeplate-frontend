import { useState } from "react"

import './commentform.css'

const CommentForm = ({ initialText = "", onSubmit, submitLabel = "Submit" }) =>{
    
    const [formData, setFormData]= useState({text: initialText});
    
    const handleChange=(evt)=>{
        setFormData({...formData, [evt.target.name]: evt.target.value})

    }
    const handleSubmit = (evt)=>{
        evt.preventDefault();
        onSubmit(formData);
        setFormData({text:""})
    }


    return (
        <form onSubmit ={handleSubmit} >
            <div>
                <label htmlFor="text">Your comment</label>
            </div>
            <div className="input-area-comment">
                <textarea
                    className="comment-textarea"
                    required
                    type="text"
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                />
                <button className="btn-create-recipe btn-add-form" type="submit"> {submitLabel}</button>
            </div>
        </form>
    )

}

export default CommentForm