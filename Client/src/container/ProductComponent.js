import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);

const width = window.screen.width;

  const renderlist = products.map((product) => {

    // const { _id, itemname, description, price, img } = product;
    const { _id, itemname, price, img } = product;
    return (
      // <div className="ten wide column" key={_id}>
       <div className={width>600?"four wide column":"ten wide column"} key={_id}>
        <Link to={`items/${_id}`}>
        <div className="ui link cards">
          <div className="card">
            <div className="image">
              <img src={img} width='50' height='50' alt={itemname} />
            </div>
            <div className="content">
              <div className="header"> {itemname}</div>
              <div className="meta price"> $ {price}</div>
              {/* <div className="meta"> {description}</div> */}
            </div>
          </div>
        </div>
          </Link> 
      </div>
    );
  });

  return (
    <> 

      {renderlist}
   
    </>
  )
}

export default ProductComponent