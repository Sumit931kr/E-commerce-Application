import React from 'react'
import Header from './container/Header'
import ProductListing from './container/ProductListing'
import ProductDetail from './container/ProductDetail'
import Cartproduct from './container/Cartproduct';
import Login from './container/login/login';
import Register from './container/register/register';
import './app.css'

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
          <Route path='/' exact element={<ProductListing/>} />
          <Route path='/items/:productId' exact element={<ProductDetail/>} />
          <Route path='/cartproduct' exact element={<Cartproduct/>}/>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/register' exact element={<Register/>} />
          <Route path='/checkout' exact element={<Cartproduct/>}/>
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