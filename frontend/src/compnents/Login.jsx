import React, { useEffect, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';




const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // if(username===""){
    //     return toast.error("username is empty...")
    // }else{}

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/feed')
        }
    }, [])

    const onLogin = async (e) => {
        //console.log(email,pass)
        e.preventDefault()
        console.log(username)
        if(!username && !password){
            return toast.error("fill all input areas...")
        }
        if(username === ""){
            return toast.error("fill USERNAME input area...")
        }
        if(password === ""){
            return toast.error("fill PASSWORD input area...")
        }

        let result = await fetch("http://localhost:5000/login", {
            method: 'post',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.log("result",result)
        if(!result._id ){
            return toast.error("Username and Password is not matching...")
        }

        if (result) {
            navigate('/feed')
        }
        localStorage.setItem('user', JSON.stringify(result));
        console.log(result.name)

    }

    return (
        <div className="login">
        <div><Toaster/></div>
        
            <form className='login-min'>
            <h5 className='' style={{color:"grey", marginTop:"20px", marginBottom:"30px"}}>Login Here</h5>
                <div className="login-form">
                
                    <div>
                        <input placeholder='USERNAME' className='form-control inputtag' type='text'
                            onChange={(e) => setUsername(e.target.value)} value={username}></input>
                    </div>

                    <div>
                        <input placeholder='PASSWORD' type='password'  className='form-control inputtag'
                            onChange={(e) => setPassword(e.target.value)} value={password}></input>
                    </div>
                </div>

                <div className='loginButton'>
                      <span> <Link to={"/signup"} ><button className='buttonl btn btn-outline-danger'>Register</button></Link></span>  <span> <button className='buttonl btn btn-outline-success' onClick={onLogin}>Login</button></span>
                </div>
            </form>


        </div>
    )
}

export default Login
