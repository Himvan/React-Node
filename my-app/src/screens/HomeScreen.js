import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import {listProducts} from '../actions/productActions'


export default function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const {loading, products} = productList

  useEffect(() => {
      dispatch(listProducts())
  }, [dispatch])

  return (
    <div>
      <LoadingBox loading={loading} />
      <div class="row center">
        {products.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
