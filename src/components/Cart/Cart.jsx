import './Cart.css'
import { createPortal } from 'react-dom'
import { useCart } from '../../store/useCart'

function Backdrop({ onClose }) {
  return <div className="cart-overlay" onClick={onClose} />
}

function CartModal({ onClose }) {
  const { items, totalAmount, addOne, removeOne } = useCart()

  return (
    <div className="cart-modal">
      <div className="cart-list">
        {items.length === 0 && (
          <div className="empty">
            <strong>Your cart is empty.</strong>
            <span>Add a dish from the menu to start your order.</span>
          </div>
        )}

        {items.map((item) => (
          <div className="cart-row" key={item.id}>
            <div className="cart-info">
              <h2 className="cart-name">{item.name}</h2>
              <div className="cart-meta">
                <span className="cart-price">${item.price.toFixed(2)}</span>
                <span className="cart-amount">x {item.amount}</span>
                <span className="cart-subtotal">${(item.price * item.amount).toFixed(2)}</span>
              </div>
            </div>
            <div className="cart-controls">
              <button onClick={() => removeOne(item.id)} type="button" aria-label={`Decrease ${item.name}`}>
                -
              </button>
              <button onClick={() => addOne(item.id)} type="button" aria-label={`Increase ${item.name}`}>
                +
              </button>
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
      {createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {createPortal(<CartModal onClose={onClose} />, portalElement)}
    </>
  )
}
