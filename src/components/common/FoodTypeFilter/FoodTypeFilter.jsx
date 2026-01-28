import './foodtypefilter.css'

const FoodTypeFilter = ({foodTypes,selectedTypes,toggleType}) =>{
    return(
        <div className="filter-container">
            {foodTypes.map((type)=>(

                <button 
                    className={`btn-filters ${selectedTypes.includes(type) ? "selected" : ""}`}
                    key={type}
                    onClick={()=>toggleType(type)}
                > 
                    {type} 
                </button>
            ))}
        </div>
    )
}

export default FoodTypeFilter