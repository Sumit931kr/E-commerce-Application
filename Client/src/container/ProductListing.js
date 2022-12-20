import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setProduct } from '../redux/actions/productActions';
import ProductComponent from './ProductComponent';
import '../app.css'


const ProductListing = () => {

  const dispatch = useDispatch();


  const url = 'http://localhost:5000'

  const fetchProducts = async () => {
    // const response = await fetch('https://fakestoreapi.com/products')
    const response = await fetch(`${url}/api/items`)
      .then(res => res.json())
      .catch((err) => { console.log("ERROR ", err) })

    dispatch(setProduct(response));
  }
  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className='ui grid container'>
      <br />
      <ProductComponent />
    </div>
  )
}

export default ProductListing