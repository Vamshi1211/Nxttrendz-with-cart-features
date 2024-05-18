import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartLength = cartList.length

      const cartTotalPriceList = cartList.map(
        eachItem => eachItem.price * eachItem.quantity,
      )

      const totalPrice = cartTotalPriceList.reduce(
        (acc, currentValue) => acc + currentValue,
      )

      return (
        <div className="cart-summary-container">
          <div className="price-container">
            <h1 className="cart-summary-heading">
              Order Total:{' '}
              <span className="total-price">Rs {totalPrice}/-</span>
            </h1>
            <p className="cart-summary-des">{cartLength} items in cart</p>
          </div>

          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
