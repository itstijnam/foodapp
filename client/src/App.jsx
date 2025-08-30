import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/home/Home';
import ProductDetail from './pages/product/ProductDetail';
import Checkout from './pages/checkout/Checkout';
import AddressForm from './pages/address/Address';
import FoodManager from './components/foodmanager/FoodManager';
import OrdersPage from './pages/order/OrdersPage';
import UserOrders from './pages/order/UserOrders';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';


const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: 'product',
        element: <ProductDetail/>
      },
      {
        path: 'checkout',
        element: <Checkout/>
      },
      {
        path: 'address',
        element: <AddressForm/>
      },
      {
        path: 'food-manage',
        element: <FoodManager/>
      },
      {
        path: 'orders',
        element: <OrdersPage/>
      },
      {
        path: 'my-order',
        element: <UserOrders/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'signup',
        element: <Signup/>
      },
    ]
  },
])

function App() {
  return (
    <RouterProvider router={browserRouter} />
  )
}

export default App