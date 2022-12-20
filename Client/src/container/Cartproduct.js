import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../app.css'


const Cartproduct = () => {

const width = window.screen.width;

  const navigate = useNavigate();
  const [data, setdata] = useState([])
 // const url = 'http://localhost:5000'
 const url = 'https://e-commerce-application-theta.vercel.app'

  const AllcartItem = async () => {

    try {

      if (!localStorage.getItem('itoken')) {
        navigate('/');
      }

      const response = await fetch(`${url}/api/cartitem`, {
        method:'GET',
        headers: {
          "auth-token": localStorage.getItem('itoken')
        }

      })


      // console.log(response.json);
      const json = await response.json();
      setdata(json);
  

    } catch (error) {
      console.log("Error is occured in cartproudct", error);
      // navigate('/');
    }
  }

  useEffect(() => {
    AllcartItem();
    // renderlist();
  }, [])

  const renderlist = data.map((element) => {
    return (
      <div className={width>600?"four wide column":"ten wide column"} key={element._id}>
        <div className="ui link cards">
          <div className="card">
            <div className="image">
              <img src={element.img} alt={element.itemname} />
            </div>
            <div className="content">
              <div className="header"> {element.itemname}</div>
              <div className="meta price"> $ {element.price}</div>
              {/* <div className="meta"> {description}</div> */}
            </div>
          </div>
        </div>
      </div>
    );
  })



  return (
    <>
      <div className='margintop ui container center'> <h3> ALL YOUR PRODUCT </h3>
        <div className='ui grid container'>
          <br />
          {/* { data ?{renderlist}: <h4>There is no previous Order </h4>}  */}
          {renderlist}
        </div>
        <div>
          <div className='ui button'> CheckOut </div>
        </div>
      </div>
    </>
  )
}

export default Cartproduct