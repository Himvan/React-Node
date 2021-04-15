import { Link } from 'react-router-dom'
import Rating from './Rating'

function Product(props){
    const {product} = props
    return (
        <div class="card">
        <Link to={`/product/${product._id}`} >
          <img src={product.image} class="medium" alt={product.name} />
        </Link>
        <div class="card-body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews}/>
        </div>
        <div class="price">
          {`$ ${product.price}`}
        </div>
      </div>
    )
}

export default Product