import { useState } from 'react'
import { useCart } from '../../store/useCart'

export default function MealForm({ meal }) {
  const [amount, setAmount] = useState(1)
  const { addItem } = useCart()

  function submit(e) {
    e.preventDefault()
    const nextAmount = Math.min(10, Math.max(1, Number(amount) || 1))
    addItem({ id: meal.id, name: meal.name, price: meal.price, amount: nextAmount })
    setAmount(1)
  }

  function changeAmount(delta) {
    setAmount((current) => Math.min(10, Math.max(1, Number(current) + delta)))
  }

  return (
    <form className="meal-form" onSubmit={submit}>
      <div className="amount-stepper" aria-label={`Amount for ${meal.name}`}>
        <button type="button" onClick={() => changeAmount(-1)} aria-label="Decrease amount">
          -
        </button>
        <input
          className="amount-input"
          type="number"
          min="1"
          max="10"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-label={`Amount for ${meal.name}`}
        />
        <button type="button" onClick={() => changeAmount(1)} aria-label="Increase amount">
          +
        </button>
      </div>
      <button className="add-btn" type="submit">
        Add
      </button>
    </form>
  )
}
