import { Link } from "react-router";
import foodImage from '../../assets/food.png';
import heartImage from '../../assets/heart.png';
import commentsImage from '../../assets/comments.png'
import FeatureCard from "../FeatureCard/FeatureCard";
import "./publicHome.css";


export default function PublicHome() {
  return (
    <div className="public-home">
      {/* Top bar */}
      <header className="public-home__header">
        <h2 className="logo">HomePlate</h2>
        <Link to="/sign-in" className="btn btn-primary">
          Log in
        </Link>
      </header>
 {/* Main section */}
      <main className="public-home__main">
        <section className="main">
          <h1>
            Discover and share delicious
            <br />
            <span>recipes with a vibrant culinary community.</span>
          </h1>

          <p>
            Sign up to access a wide variety of recipes
            <br />
            and share your own.
          </p>
          <div className="main-actions">
            <Link to="/sign-up" className="btn btn-outline">
              Create account
            </Link>
            <Link to="/sign-in" className="btn btn-primary">
              Log in
            </Link>
          </div>
        </section>
          {/* Features */}
        <section className="features">
          <FeatureCard image={foodImage} title={'Thousands of recipes'} description={'Explore recipes for all occasions and tastes'} />
          
          <FeatureCard image={heartImage} title={'Save your favorites'} description={'Create a list of your favorite recipes'} />
         
         <FeatureCard image={commentsImage} title={'Share and connects'} description={'Publish your recipes and connect with other cooking enthusiasts'} />
         
          
        </section>
  {/* Bottom  */}
        <div className="bottom">
          <Link to="/sign-up" className="btn btn-outline">
            Create account
          </Link>
        </div>
      </main>
    </div>
  );
}
