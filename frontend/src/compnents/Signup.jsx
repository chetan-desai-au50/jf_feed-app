import React, { useEffect, useState } from 'react'
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';



const Signup = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    //  const [role, setRole] = useState("user");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/feed')
        }
    }, [])

    const collectdata = async (e) => {
        e.preventDefault();
        // setEmail("")
        // setUsername("")
        // setPassword("")
        // setPhone("")
        console.log(username, email, password, phone);
        try {

            if(!username && !password && !email && !phone){
                return toast.error("fill all input areas...")
            }
            if (username === "") {
                return toast.error("fill USERNAME Input Area...")
            }
            if (password === "") {
                return toast.error("fill PASSWORD Input Area...")
            }
            if (email === "") {
                return toast.error("fill EMAIL Input Area...")
            }
            if (phone === "" ) {
                return toast.error("fill PHONE Input Area...")
            }
            if(phone.length!==10){
                return toast.error("PHONE NO. minLength is 10...")
            }



            let result = await fetch("http://localhost:5000/signup", {
                method: 'post',
                body: JSON.stringify({ username, email, password, phone }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            result = await result.json();
            if (result.error) {
                throw new Error(result.error)
            }
            console.log('result', result)

            //to redirect product page i used below code
            if (result) {
                navigate('/feed')
            };

            //to store data into the local storage ,it happens when u push sign up button
            localStorage.setItem("user", JSON.stringify(result));

        } catch (error) { 
            toast.error(error.message)
        }


    }


    return (
        <div className="signup">
            <div><Toaster /></div>
            <form className='signup_min'>
                <div className="signup-form">
                    <h5 className='mb-4' style={{color:"grey"}}>Registration</h5>
                    <div>
                        <input placeholder='USERNAME' className='form-control inputtag'
                            value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    </div>

                    <div>
                        <input placeholder='PASSWORD' type='password' className='form-control inputtag'
                            value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

                    <div>
                        <input placeholder='EMAIL ID' className='form-control inputtag'
                            value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>

                    <div >
                        <input placeholder='PHONE NO.' className='form-control inputtag' type='number'
                            value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                    </div>


                </div>

                <div className='signupButton'>
                    <span> <button className='buttonS btn btn-outline-success' onClick={collectdata}>Register</button></span>  <span><Link to={"/login"} ><button className='buttonS btn btn-outline-danger' >Login</button></Link></span>
                </div>

            </form>
        </div>
    )
}

export default Signup;




// import React, { useEffect, useState } from 'react'
// import './signup.css';
// import { Link, useNavigate } from 'react-router-dom';



// const Signup = () => {

//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [phone, setPhone] = useState("");
//     const [role, setRole] = useState("");

//     const navigate = useNavigate();

//     useEffect(() => {
//         const auth = localStorage.getItem('user');
//         if (auth) {
//             navigate('/feed')
//         }
//     }, [])

//     const collectdata = async (e) => {
//         e.preventDefault();
//         setEmail("")
//         setUsername("")
//         setPassword("")
//         setPhone("")
//         console.log(username, email, password, role, phone)


//         let result = await fetch("http://localhost:5000/signup", {
//             method: 'post',
//             body: JSON.stringify({ username, email, password, role, phone }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         result = await result.json();
//         console.log('result', result)

//         //to redirect product page i used below code
//         if (result) {
//             navigate('/feed')
//         };

//         //to store data into the local storage ,it happens when u push sign up button
//         localStorage.setItem("user", JSON.stringify(result));

//     }


//     return (
//         <div className="signup">
//             <form className='signup_min'>
//                 <div className="signup-form">
//                     <div>
//                         <input placeholder='USERNAME' className='inputtag'
//                             value={username} onChange={(e) => setUsername(e.target.value)}></input>
//                     </div>

//                     <div>
//                         <input placeholder='PASSWORD' type='password' className='inputtag'
//                             value={password} onChange={(e) => setPassword(e.target.value)}></input>
//                     </div>

//                     <div>
//                         <input placeholder='EMAIL ID' className='inputtag'
//                             value={email} onChange={(e) => setEmail(e.target.value)}></input>
//                     </div>

//                     <div >
//                         <input placeholder='PHONE NO.' className='inputtag' type='number'
//                             value={phone} onChange={(e) => setPhone(e.target.value)}></input>
//                     </div>

//                     <div >
//                         {/* <input placeholder='ROLE' className='inputtag'
//                             value={role} onChange={(e) => setRole(e.target.value)}></input> */}
//                         <select name="Roles" className='inputtag'
//                         value={role} onChange={(e) => setRole(e.target.value)} >
//                             <option value="" disabled selected>ROLES</option>
//                             <option value="admin">Admin</option>
//                             <option value="user">User</option>
//                         </select>
//                     </div>

//                 </div>

//                 <div className='signupButton'>
//                     <span> <button className='buttonS' onClick={collectdata}>Login</button></span>  <span><Link to={"/login"} ><button className='buttonS' >Register</button></Link></span>
//                 </div>



//             </form>



//         </div>
//     )
// }

// export default Signup;
