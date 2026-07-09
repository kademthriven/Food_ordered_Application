import './Cart.css'
import { createPortal } from 'react-dom'

const CART_ITEMS = [
  {
    id: 'c1',
    name: 'Sushi',
    price: 22.99,
    amount: 2,
  },
  {
    id: 'c2',
    name: 'Schnitzel',
    price: 16.5,
    amount: 1,
  },
]

const totalAmount = CART_ITEMS.reduce((sum, item) => sum + item.price * item.amount, 0)

function Backdrop() {
  return <div className="cart-overlay" />
}

function CartModal({ onClose }) {
  return (
    <div className="cart-modal">
      <div className="cart-list">
        {CART_ITEMS.map((item) => (
          <div className="cart-row" key={item.id}>
            <div className="cart-info">
              <h2 className="cart-name">{item.name}</h2>
              <div className="cart-meta">
                <span className="cart-price">${item.price.toFixed(2)}</span>
                <span className="cart-amount">x {item.amount}</span>
              </div>
            </div>
            <div className="cart-controls">
              <button type="button">-</button>
              <button type="button">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="total">
          <span>Total Amount</span>
          <strong>${totalAmount.toFixed(2)}</strong>
        </div>
        <div className="actions">
          <button className="btn secondary" onClick={onClose} type="button">
            Close
          </button>
          <button className="btn primary" type="button">
            Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Cart({ onClose }) {
  const portalElement = document.getElementById('overlays')
  if (!portalElement) return null

  return (
    <>
      {createPortal(<Backdrop />, portalElement)}
      {createPortal(<CartModal onClose={onClose} />, portalElement)}
    </>
  )
}
