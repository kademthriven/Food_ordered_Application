import './MealItem.css'
import MealForm from './MealForm'

export default function MealItem({ meal }) {
  return (
    <div className="meal-item">
      <div className="meal-image-wrap">
        <img src={meal.image} alt={meal.name} className="meal-image" />
        <span className="meal-tag">{meal.tag}</span>
      </div>
      <div className="meal-body">
        <div className="meal-copy">
          <h3>{meal.name}</h3>
          <p className="desc">{meal.description}</p>
        </div>
        <div className="meal-bottom">
          <div className="price">${meal.price.toFixed(2)}</div>
          <MealForm meal={meal} />
        </div>
      </div>
    </div>
  )
}
