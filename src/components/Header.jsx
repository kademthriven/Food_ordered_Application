import './Header.css'
import { useCart } from '../store/useCart'

export default function Header({ onShowCart }) {
  const { totalCount } = useCart()

  return (
    <header className="app-header">
      <div className="container header-inner">
        <div className="brand-wrap">
          <span className="brand-mark" aria-hidden="true">
            R
          </span>
          <div>
            <h2 className="brand">ReactMeals</h2>
            <span className="brand-subtitle">Fresh kitchen delivery</span>
          </div>
        </div>
        <div className="header-status" aria-hidden="true">
          <span className="status-dot" />
          Open now
        </div>
        <button className="cart-button" onClick={onShowCart} type="button">
          <span className="cart-icon" aria-hidden="true" />
          <span className="cart-text">Your Cart</span>
          <span className="cart-count">{totalCount}</span>
        </button>
      </div>
    </header>
  )
}
