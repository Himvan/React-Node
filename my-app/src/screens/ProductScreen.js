import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Rating from '../components/Rating'
import LoadingBox from '../components/LoadingBox'
import {Link} from 'react-router-dom'
import {detailsProduct} from '../actions/productActions'

export default function ProductScreen(props) {
    const productDetails = useSelector(state => state.productDetails)
    const dispatch = useDispatch()
    const productId = props.match.params.id
    const [qty, setQty] = useState(1)
    const {loading, product} = productDetails

    useEffect(() => {
     dispatch(detailsProduct(productId))
    }, [dispatch, productId])

    const addToCardHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <div>
         <LoadingBox loading={loading} />
         <Link to="/">Back to Results</Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt={product.name} />
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1> {product.name} </h1>
                        </li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews} />
                        </li>
                        <li>
                            Price:  ${product.price}
                        </li>
                        <li>
                            Description:<p>{product.description}</p>
                        </li>
                    </ul>

                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="row">${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div >
                                        {product.countInStock > 0 ? <span className="success">In Stock</span> : <span className="error">Out Of Stock</span>}
                                    </div>
                                </div>
                            </li>
                            {product.countInStock > 0  && (
                                <>
                                <li>
                                    <div className = "row">
                                        <div> Qty</div>
                                        <div>
                                            <select value={qty} onChange={e => setQty(e.target.value)}>
                                             {
                                                [...Array(product.countInStock).keys()].map((items) => (
                                                    <option key={items+1} value={items+1}> {items+1} </option>
                                                ))
                                             }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                 <li>
                                  <button className="primary block" onClick={addToCardHandler}>
                                    Add To Cart
                                   </button>
                                </li>
                                </>
                            ) }
                          
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
