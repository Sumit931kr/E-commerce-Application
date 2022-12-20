import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom'
import { selectedProduct, removeSelectedProduct, cart } from '../redux/actions/productActions';
import '../app.css'

const ProductDetail = (props) => {

  const { productId } = useParams();
  const dispatch = useDispatch();


// const url = 'http://localhost:5000'
const url = 'https://e-commerce-application-theta.vercel.app'
  const product = useSelector((state) => state.product)

  // const { id, itemname, description, price, img } = product
  const { itemname, description, price, img } = product


  const fetchProductDetail = async (id) => {
    const response = await fetch(`${url}/api/items/${productId}`,)
      .then(res => res.json())
      .catch((err) => { console.log("ERROR ", err) })

    dispatch(selectedProduct(response));
  }



  const Addtocart = async (id) => {
    await fetch(`${url}/api/items/${productId}`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('itoken')
      }
    })
      .then(res => res.json())
      .catch((err) => { console.log("ERROR ", err) })
    // console.log(response);
  }



  const cartnumber = () => {
    document.getElementById('sec').style.display = 'block';
    Addtocart();
    dispatch(cart(1))
    document.getElementById('fir').style.display = 'none';
  }



  useEffect(() => {
    fetchProductDetail();
    return () => {
      dispatch(removeSelectedProduct());
    }
    // eslint-disable-next-line
  }, [productId])

  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={img} alt="imagee" />
              </div>
              <div className="column rp">
                <h1>{itemname}</h1>
                <h2>
                  <span className="ui teal tag label">$ {price}</span>
                </h2>
                {/* <h3 className="ui brown block header">{category}</h3> */}
                <p>{description}</p>
                {localStorage.getItem('itoken') ?
                  <>
                    <div className="ui button" tabIndex="0" id='fir' onClick={cartnumber}>
                      <div className="visible content" id='order-btn'>Add to Cart</div>
                    </div>
                    <Link to='/'>
                      <div className="ui button" tabIndex="0" id='sec'>
                        <div className="visible content" id='order-btn'>Back to Shopping</div>
                      </div>
                    </Link>
                  </>
                  :
                  <Link to='/login'>
                   <button >Login First to Order</button>
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail