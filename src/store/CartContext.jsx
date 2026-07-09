import { useState } from 'react'
import CartContext from './cart-context'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  function addItem(item) {
    const safeAmount = Math.max(1, Number(item.amount) || 1)

    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], amount: next[idx].amount + safeAmount }
        return next
      }
      return prev.concat({ ...item, amount: safeAmount })
    })
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function updateAmount(id, amount) {
    setItems((prev) => {
      const nextAmount = Number(amount)
      if (nextAmount <= 0) {
        return prev.filter((it) => it.id !== id)
      }
      return prev.map((it) => (it.id === id ? { ...it, amount: Math.max(1, nextAmount) } : it))
    })
  }

  function changeBy(id, delta) {
    setItems((prev) => {
      return prev
        .map((it) => (it.id === id ? { ...it, amount: it.amount + delta } : it))
        .filter((it) => it.amount > 0)
    })
  }

  function addOne(id) {
    changeBy(id, 1)
  }

  function removeOne(id) {
    changeBy(id, -1)
  }

  function clearCart() {
    setItems([])
  }

  const totalAmount = items.reduce((sum, it) => sum + it.price * it.amount, 0)
  const totalCount = items.reduce((sum, it) => sum + it.amount, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateAmount,
        changeBy,
        addOne,
        removeOne,
        clearCart,
        totalAmount,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
