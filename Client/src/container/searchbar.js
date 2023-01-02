import React, { useState } from 'react'
// import Noteitem from './Noteitem';
// import noteContext from '../context/notes/noteContext';
import "../app.css"

import { Link } from 'react-router-dom';


function Searchbar() {
    // const {setSome} = props


    const url = 'http://localhost:5000'
    //  const url = 'https://e-commerce-application-theta.vercel.app'

    const width = window.screen.width;

    const [searchData, setSearchData] = useState([])

    // const [showicons, setshowicons] = useState(true)
    const [searchToggler, setsearchToggler] = useState(true);

    const handleSearchToggler = () => {
        setsearchToggler(!searchToggler)
        // getNotes();
    }



    const searchProject = async (text) => {

        const response = await fetch(`${url}/api/searchitem/${text}`, {
            method: 'GET'
        })

        const json = await response.json();
        setSearchData(json);

    }


    const handleSearch = async (e) => {

        if (e.target.value === "") {
            setSearchData([])

        }
        else {
            searchProject(e.target.value)
        }

    }
    // let idd = "inp";

    const searchRestore = () => {
        document.getElementById('input').value = "";

    }

    return (
        <>
            <div className="searchbarContainer">
                <div onClick={handleSearchToggler} className="searchlogo">
                    <button onClick={handleSearchToggler} type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModale"><i className='fa fa-search' /></button>
                </div>
            </div>
            <div className="modal fade" onClick={searchRestore} id="exampleModale" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="searchForm">
                                <input type="search" id='input' name='searchText' onChange={handleSearch} />
                            </div>
                            <button type="button" className="btn-close" onClick={searchRestore} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {searchData.map((product) => {
                                const { _id, itemname, price, img } = product;
                                return (
                                    // <div className="ten wide column" key={_id}>
                                    <div className={width > 600 ? "four wide column" : "ten wide column"} key={_id} data-bs-dismiss="modal">
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
                            })}
                            {/* <ProductComponent /> */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={searchRestore} data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Searchbar