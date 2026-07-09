import './Cart.css'
import { useCallback, useEffect, useState } from 'react'
import { useCart } from '../../store/useCart'

export default function Cart({ open, onClose }) {
  const { items, totalAmount, changeBy, removeItem, clearCart } = useCart()
  const [ordered, setOrdered] = useState(false)

  const handleClose = useCallback(() => {
    setOrdered(false)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleClose, open])

  function handleOrder() {
    if (items.length === 0) return
    clearCart()
    setOrdered(true)
  }

  if (!open) return null

  return (
    <div className="cart-overlay" onClick={handleClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-heading">
          <div>
            <span className="eyebrow">Checkout</span>
            <h3>Your Order</h3>
          </div>
          <button className="icon-button" onClick={handleClose} type="button" aria-label="Close cart">
            x
          </button>
        </div>

        {ordered && (
          <div className="order-success" role="status">
            Order placed. Your kitchen has started preparing it.
          </div>
        )}

        <div className="cart-list">
          {items.length === 0 && !ordered && (
            <div className="empty">
              <strong>Your cart is empty.</strong>
              <span>Add a dish from the menu to start your order.</span>
            </div>
          )}
          {items.map((it) => (
            <div className="cart-row" key={it.id}>
              <div className="cart-info">
                <div className="cart-name">{it.name}</div>
                <div className="cart-meta">
                  <span>${it.price.toFixed(2)}</span>
                  <span>x{it.amount}</span>
                </div>
              </div>
              <div className="cart-controls">
                <button onClick={() => changeBy(it.id, -1)} type="button" aria-label={`Decrease ${it.name}`}>
                  -
                </button>
                <span className="cart-line-total">${(it.price * it.amount).toFixed(2)}</span>
                <button onClick={() => changeBy(it.id, 1)} type="button" aria-label={`Increase ${it.name}`}>
                  +
                </button>
                <button className="remove" onClick={() => removeItem(it.id)} type="button">
                  Remove
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
            <button className="btn secondary" onClick={handleClose} type="button">
              Close
            </button>
            <button className="btn primary" onClick={handleOrder} type="button" disabled={items.length === 0}>
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
