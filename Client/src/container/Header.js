import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { cart } from '../redux/actions/productActions'
import './header.css'
import Searchbar from './searchbar'

const Header = () => {

    const dispatch = useDispatch();
    // const [cartnumberr, setcartnumberr] = useState([])

    // const url = 'http://localhost:5000'
    const url = 'https://e-commerce-application-theta.vercel.app'
    const cartnumber = useSelector((state) => state.cart);
    // console.log(cartnumber);

    const logout = () => {
        localStorage.removeItem('itoken');
        window.location.reload();
    }

    const run = async () => {

        const response = await fetch(`${url}/api/cartitem`, {
            method: 'GET',
            headers: {
                "auth-token": localStorage.getItem('itoken')
            }

        })

        // console.log(response.json);
        const json = await response.json();
        dispatch(cart(json.length));
    }

    const searchproduct = () => {
        console.log("ll")
    }


    useEffect(() => {
        run();
    }, [])

    return (<>
        <div className='ui fixed menu'>
            <div className='ui container center'>
                <Link to='/'>
                    <h2>Fakeshop</h2>
                </Link>
            </div>
            {(localStorage.getItem('itoken')) ?
                <>
                    <Searchbar />
                    <div className='name'>
                        <div>{localStorage.getItem('name').charAt(0)}</div>
                    </div>
                    <div className='ui button' id='lg' onClick={logout}> LogOut </div>
                    <div className='cart'>
                        <Link to='/checkout'>
                            <i className="fa-solid fa-cart-shopping fa-2xl"></i>
                            <div className='cartnumber'>
                                {cartnumber}
                                {/* {count} */}
                            </div>
                        </Link>
                    </div>
                </>
                :
                <div style={{"display":"flex"}}>
                    <div className='ui button'>
                        <Link to='/login'>Login</Link>
                    </div>
                    <div className='ui button'>
                        <Link to='/register'>Register</Link>
                    </div>
                </div>
            }
        </div>
    </>
    )
}

export default Header
