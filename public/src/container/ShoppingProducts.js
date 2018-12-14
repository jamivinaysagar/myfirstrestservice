import React from 'react'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'

const ShoppingProducts = () => (
  <div>
    <h2>Shopping Cart</h2>
    <hr/>
    <ProductsContainer />
    <hr/>
    <CartContainer />
  </div>
)

export default ShoppingProducts
