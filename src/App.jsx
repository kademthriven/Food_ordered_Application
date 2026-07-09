import './App.css'
import { useState } from 'react'
import { CartProvider } from './store/CartContext'
import Header from './components/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'

function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <CartProvider>
      <div className="app-root">
        <Header onShowCart={() => setCartOpen(true)} />
        <main>
          <section className="hero-banner">
            <div className="hero-content">
              <span className="hero-kicker">Fresh meals, made fast</span>
              <h1>Delicious Food, Delivered To You</h1>
              <p>
                Choose restaurant-quality favorites from our curated kitchen and
                enjoy a warm lunch or dinner at home.
              </p>
              <div className="hero-stats" aria-label="Service highlights">
                <span>30 min average</span>
                <span>Local chefs</span>
                <span>Fresh daily</span>
              </div>
            </div>
          </section>

          <section className="meals-section">
            <Meals />
          </section>
        </main>

        <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </CartProvider>
  )
}

export default App
