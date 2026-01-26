const FeatureCard = ({image,title,description})=> {
  
  return( 
    <div className="feature-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
       <p>{description}</p>
    </div>
  )

  }
  export default FeatureCard