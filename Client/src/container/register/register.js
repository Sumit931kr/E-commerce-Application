import React, { useState } from "react";
import "./register.css"
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate()

    // const url = 'http://localhost:5000'
    const url = 'https://e-commerce-application-theta.vercel.app'

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: "",
        address:"",
        pincode:null,
        mobile:null
    })
    const handlechange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = async () => {

        const { name, email, password, reEnterPassword } = user

        if (name && email && password && (password === reEnterPassword)) {
            try {
                const resposne = await fetch(`${url}/auth/createUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name:user.name ,email: user.email, password: user.password })

                })

                const json = await resposne.json();
                console.log(json)
                if (json.success) {
                    navigate('/');
                    localStorage.setItem('itoken', json.authtoken)
                    localStorage.setItem('name',json.name)
                    window.location.reload();
                }
                else{
                    setUser({
                        name: "",
                        email: "",
                        password: "",
                        reEnterPassword: "",
                        address:"",
                        pincode:null,
                        mobile:null
                    })
                    // console.log("Error is " ,error);
                    alert('ERROR OCCURED')
                   }

            } catch (error) {
                setUser({
                    name: "",
                    email: "",
                    password: "",
                    reEnterPassword: "",
                    address:"",
                    pincode:null,
                    mobile:null
                })
                console.log(error);
            }
        }
        else {
            alert("Invalid Input")
            setUser({
                name: "",
                email: "",
                password: "",
                reEnterPassword: "",
                address:"",
                pincode:null,
                mobile:null
            })
        }

    }

    return (
        <div className="register">

            <h2>Register</h2>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handlechange} required className="required"/>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handlechange} required />
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handlechange} required />
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-Password" onChange={handlechange} required />
            <input type="address" name='address' value={user.address} placeholder="Enter the Address" onChange={handlechange} style={{color:"black"}} />
            <input type="number" value={user.pincode} placeholder='Enter the Pincode' onChange={handlechange} minLength={6} />
            <input type="number" value={user.mobile} placeholder='Enter the Mobile number' onChange={handlechange} minLength={10} />
            <div className="button" onClick={register} >Register</div>
            <div> or </div>
            <div className="button" onClick={() => navigate("/login")}>Login</div>
        </div>
    )
}

export default Register
