import React, { useState } from "react";
import "./login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()
    // const url = 'http://localhost:5000'
    const url = 'https://e-commerce-application-theta.vercel.app'

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const handlechange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = async () => {

        try {
            const resposne = await fetch(`${url}/auth/loginUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email, password: user.password })

            })

            const json = await resposne.json();

            if(json.success){
                navigate('/');
                localStorage.setItem('itoken', json.authtoken)
                localStorage.setItem('name',json.name)
                window.location.reload();
            }
           else{
            setUser({
                email: "",
                password: ""
            })
            // console.log("Error is " ,error);
            alert('ERROR OCCURED')
           }

        } catch (error) {
            setUser({
                email: "",
                password: ""
            })
            console.log("Error is " ,error);
            alert('ERROR OCCURED')
        }
    }


    return (
        <div className="login">
            {/* {console.log("user", user)} */}
            <h2>Login</h2>
            <input type="text" name="email" value={user.email} placeholder="Enter Your Email" onChange={handlechange} />
            <input type="password" name="password" id="id_password" value={user.password} placeholder="Enter Your Password" onChange={handlechange} />
            {/* <i className="far fa-eye" id="togglePassword"></i> */}
            <div className="button" onClick={login}> Login</div>
            <div> or </div>
            <div className="button" onClick={() => navigate("/register")}> Register</div>

        </div>
    )
}

export default Login
