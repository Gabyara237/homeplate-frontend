

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';
import './SignInForm.css';
import signinPhoto from "../../assets/foodphoto.png"
import { Link } from 'react-router';


const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="signin">

       <section className="signin__left" >
      <img src={signinPhoto}/>
    </section>
    <section className="signin__right">
      <h1 className="signin__title">
        HomePlate
      </h1>
      <h3> Sign In </h3>
      <p>{message}</p>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Username:</label>
          <input
            type='text'
            autoComplete='off'
            id='username'
            value={formData.username}
            name='username'
            onChange={handleChange}
            required
          />
      
       
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            autoComplete='off'
            id='password'
            value={formData.password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <button className= "signin__btn"> Sign In</button>
          <button className= "cancel__btn"
          onClick={() => navigate('/')}>Cancel</button>
        </div>


      </form>
      <p className="signin_switch">
      Don’t have an account?{' '}
      <Link to="/sign-up">Sign up!</Link>
      </p>


      
      </section>
    </main>
  );
};

export default SignInForm;

