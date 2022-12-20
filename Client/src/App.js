import React,{useState} from 'react'
import './app.css'
import Header from './container/Header'
import ProductListing from './container/ProductListing'
import ProductDetail from './container/ProductDetail'
import Cartproduct from './container/Cartproduct';
import Login from './container/login/login';
import Register from './container/register/register';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App() {

  return (

    <div className='App'>
      <Router>
          <Header />
        <Routes>
          <Route path='/' element={<ProductListing/>} />
          <Route path='/items/:productId' element={<ProductDetail/>} />
          <Route path='/cartproduct' element={<Cartproduct/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>} />
          <Route path='/checkout' element={<Cartproduct/>}/>
          <Route>404 Not Found</Route>
        </Routes>
      </Router>
    </div>

  )


  // const container = useRef(null)


  //   useEffect(() => {
  //     const instance = lottie.loadAnimation({
  //       container: container.current,
  //       renderer: 'svg',
  //       loop: true,
  //       autoplay: true,
  //       animationData: require('./mobile.json')
  //     });

  //  return () => instance.destroy();
  // }, []);

  //   return (<>
  //   <div className='big'>

  //   <Navbar/>
  //   <span className='first'>Your Digital Market Agency</span>
  //   <span className='second'> <span id='grow'> Grow </span> Your Bussiness   </span>
  //   <div className='third'> with the help of Social media </div>
  //     <div className='img' ref={container} ></div>
  //     <button className='btn'>INTRODUCTION</button>
  //   </div>
  //   </>
  //   )
}

export default App