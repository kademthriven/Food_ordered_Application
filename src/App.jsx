import './App.css'
import { CartProvider } from './store/CartContext'
import Header from './components/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'

function App() {
  return (
    <CartProvider>
      <div className="app-root">
        <Header cartCount={3} />
        <main>
          <section className="hero-banner">
            <div className="hero-content">
              <h1>Delicious Food, Delivered To You</h1>
              <p>
                Choose your favorite meal from our broad selection of available
                meals and enjoy a delicious lunch or dinner at home.
              </p>
              <p>
                All our meals are cooked with high-quality ingredients,
                just-in-time and of course by experienced chefs!
              </p>
            </div>
          </section>

          <section className="meals-section">
            <Meals />
          </section>
        </main>

        <Cart />
      </div>
    </CartProvider>
  )
}

export default App
