
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { listOrders } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'

export default function OrderHistoryScreen(props) {
    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(listOrders())
    }, [dispatch])

    return (
        <div> 
          <h1>Order History</h1>
         {loading ?  <LoadingBox loading={true} /> : (
             <table className="table">
               <thead>
                 <tr>
                     <th>ID</th>
                     <th>DATE</th>
                     <th>TOTAL</th>
                     <th>PAID</th>
                     <th>DELIVERED</th>
                     <th>ACTIONS</th>
                 </tr>
               </thead>
               <tbody>
                   {orders?.map(items => (
                       <tr key={items._id}>
                          <td>{items._id}</td>
                          <td>{items.createdAt.substring(0, 10)}</td>
                          <td>{items.totalPrice}</td>
                          <td>{items.isPaid ? items.paidAt.substring(0, 10) : 'No'}</td>
                          <td>{items.isDelivered ? items.deliveredAt.substring(0, 10) : 'No'}</td>
                          <td>
                              <button type="button" className="small" onClick={() => props.history.push(`/order/${items._id}`)}>
                                 Details
                              </button>
                          </td>
                       </tr>
                   ))}
               </tbody>
             </table>
         )} 
            
        </div>
    )
}
