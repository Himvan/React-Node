
import { BrowserRouter, Link, Route } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import {useSelector, useDispatch} from 'react-redux'
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { signOut } from './actions/signinActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrder from './screens/PlaceOrder';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  const userSignIn = useSelector(state => state.userSignin)
  const {userInfo} = userSignIn
  const dispatch = useDispatch()

  const signOutHandler = () => {
    dispatch(signOut())
  }
  return (
    <BrowserRouter>
      <div class="grid-container">
        <header class="row">
          <div>
            <Link to="/" class="brand">Amazon</Link>
          </div>
          <div>
            <Link to='/cart'>Cart</Link>
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
            {
              userInfo ? 
              <div className="dropdown">
              <Link to="#">{userInfo.name}  <i className="fa fa-caret-down"></i></Link> 
              <ul className="dropdown-content">
              <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/orderHistory">Order History</Link>
                </li>
                <li>
                <Link to='#signout' onClick={signOutHandler}>Sign Out</Link>
                </li>
              </ul>
              </div>
              
              :
              <Link to='/signIn'>Sign In</Link>
            }
            
          </div>
        </header>
        <main>
         
          <Route path="/register" component={RegisterScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/placeOrder" component={PlaceOrder} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderHistory" component={OrderHistoryScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/" component = {HomeScreen} exact/>
        </main>
        <footer class="row center">
          All Right Reserved
      </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
