import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, DeleteFromCart } from '../actions/cartActions'

export default function CartScreen(props) {
    const productId = props.match.params.id
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCart = (id) => {
      dispatch(DeleteFromCart(id))
    }

    const checkOutHandler = () => {
      props.history.push('/signIn?redirect=shipping')
    }

    return (
        <div class="row top">
            <div class="col-2">
                <h1> Shopping Cart </h1>
                {!cartItems.length ? (
                    <Link to="/">Go Shopping</Link>
                ) :
                    (
                        <ul>
                            {
                                cartItems.map((items) => (
                                    <li key={items.product}>
                                        <div className="row">
                                            <div>
                                                <img src={items.image} alt={items.name} className="small" />
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${items.product}`}>{items.name}</Link>
                                            </div>
                                            <div>
                                                <select value={items.qty} onChange={e => dispatch(addToCart(items.product, Number(e.target.value)))}>
                                                    {
                                                        [...Array(items.countInStock).keys()].map((items) => (
                                                            <option key={items + 1} value={items + 1}> {items + 1} </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div>
                                                ${items.price}
                                            </div>
                                            <div>
                                                <button type="button" onClick={() => removeFromCart(items.product)}>
                                                    Delete
                                                </button>
                                            </div>
      
      
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )}
            </div>
            <div className="col-1">
               <div className="card card-body">
                  <ul>
                      <li>
                          <h2>Subtotal ({cartItems.reduce((acc, current) => acc+current.qty, 0)} items) : ${cartItems.reduce((acc, curr) => acc+curr.price * curr.qty, 0)} </h2>
                      </li>
                      <li>
                          <button type="button" onClick={checkOutHandler} className="primary block" disabled={cartItems.length===0}>
                              Proceed To Checkout
                          </button>
                      </li>

                  </ul>
               </div>
            </div>

        </div>
    )
}
