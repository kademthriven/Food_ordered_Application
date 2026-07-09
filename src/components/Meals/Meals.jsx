import './Meals.css'
import MEALS from '../../data/meals'
import MealItem from './MealItem'

export default function Meals() {
  return (
    <div className="meals-wrap container">
      <div className="section-heading">
        <span className="eyebrow">Today's menu</span>
        <h2>Customer favorites</h2>
        <p>Hand-picked dishes built for comfort, freshness and quick delivery.</p>
      </div>
      <div className="meals-grid">
        {MEALS.map((m) => (
          <MealItem key={m.id} meal={m} />
        ))}
      </div>
    </div>
  )
}
