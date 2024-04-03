import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllUsers = () => {




    const [data, setData] = useState([])

    useEffect(() => {
        getApprovedDataByAdmin();
    }, [])


    const getApprovedDataByAdmin = async () => {
        try {
            const auth = localStorage.getItem('user');
            const userrrr = JSON.parse(auth);
            let id = userrrr._id
            console.log("logged_user",id)

            let result = await fetch(`http://localhost:5000/users/${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json();
            console.log(result)
            setData(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    function refreshPage() {
        window.location.reload();
    }

    const makeUser=async(val)=>{
        try {
            // Log the current value of post
            console.log(val);

            const role="user"
    
            // Make a PUT request to update the product
             const result = await fetch(`http://localhost:5000/role_user/${val}`, {
                method: 'PUT',
                 body: JSON.stringify({ role }),
                 headers: {
                     'Content-Type': 'application/json'
                 }
            },refreshPage());
    
            // Check if the request was successful
            if (!result.ok) {
                throw new Error(`Failed to update role Status: ${result.status}`);
            }
    
            // Parse the response data
            const udata = await result.json();
            
            // Log the updated data
            console.log(udata);

        } catch (error) {
            // Log and handle any errors that occur during the update process
            console.error('Error updating role:', error);
            // Handle the error appropriately (e.g., show an error message to the user)
        }
    }

    const makeAdmin=async(val)=>{
        try {
            // Log the current value of post
            console.log(val);

            const role="admin"
    
            // Make a PUT request to update the product
             const result = await fetch(`http://localhost:5000/role_user/${val}`, {
                method: 'PUT',
                 body: JSON.stringify({ role }),
                 headers: {
                     'Content-Type': 'application/json'
                 }
            },refreshPage());
    
            // Check if the request was successful
            if (!result.ok) {
                throw new Error(`Failed to update product. Status: ${result.status}`);
            }
    
            // Parse the response data
            const udata = await result.json();
            
            // Log the updated data
            console.log(udata);

        } catch (error) {
            // Log and handle any errors that occur during the update process
            console.error('Error updating role:', error);
            // Handle the error appropriately (e.g., show an error message to the user)
        }
    }






    return (
        <div>
            <div className='allPost_container'>
            <div style={{ marginTop: "20px", marginBottom: "10px", position: "fixed", bottom: 70 }}><Link to={"/feed"} ><button className='btn btn-danger' style={{ width: 100 }}>Feed</button></Link></div>
                {data.map((item,index)=>(
                    <div className='allpost' key={item._id}>
                    <div className='allpost_min'>
                        <div style={{ fontSize: 20,fontWeight:"500",color:"white" }}>Username : {item.username}</div>
                        <div style={{ fontSize: 13 }} className='mt-2 mb-1'>Role : <span style={{ fontSize: 16 }}> {item.role}</span></div>
                        <div style={{ fontSize: 14 }}>Email :  {item.email} </div>

                        <div>{item.role==="user"?<button onClick={()=>makeAdmin(item._id)} className='mt-3 mb-2 buttonap btn btn-light' style={{ width: "95%" }} >Make admin</button>:<button onClick={()=>makeUser(item._id)} className='mt-3 mb-2 buttonap' style={{ width: 208 }} >Make user</button>} </div>
                    </div>
                </div>
                ))}
                

            </div>
        </div>
    )
}

export default AllUsers
