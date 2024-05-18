import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    quantity: null,
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = cartProductId => {
    const {cartList} = this.state

    const findCartProduct = cartList.find(
      eachItem => eachItem.id === cartProductId,
    )
    this.setState({quantity: (findCartProduct.quantity += 1)})
  }

  decrementCartItemQuantity = cartProductId => {
    const {cartList} = this.state

    const findCartProduct = cartList.find(
      eachItem => eachItem.id === cartProductId,
    )

    if (findCartProduct.quantity < 2) {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(
          eachItem => eachItem.id !== cartProductId,
        ),
      }))
    } else {
      this.setState({quantity: (findCartProduct.quantity -= 1)})
    }
  }

  addCartItem = (product, productId) => {
    const {cartList} = this.state

    //   TODO: Update the code here to implement addCartItem
    const findData = cartList.find(eachItem => eachItem.id === productId)

    if (findData !== undefined) {
      this.setState({quantity: (findData.quantity += 1)})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  removeCartItem = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(
        eachItem => eachItem.id !== productId,
      ),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
