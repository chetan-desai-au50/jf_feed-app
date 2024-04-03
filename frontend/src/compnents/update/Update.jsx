import React, { useEffect, useState } from 'react';
import './update.css';
import { useParams,useNavigate, Navigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';

const Update = () => {
    const params=useParams();
    // console.log(params)
    // console.log(params)
    const [post, setPost] = useState('');
    const navigate=useNavigate()

    useEffect(()=>{
        getProductDetail();
    },[]);

    let getProductDetail=async()=>{
        console.log(params)

        let result= await fetch(`http://localhost:5000/mypostupdate/${params.id}`);
        result=await result.json();
        console.log(result);

        setPost(result.post)
    }




    const updateProduct = async (e) => {
        e.preventDefault()
        try {
            // Log the current value of post
            console.log(post);

            if (post.length < 3) {
                return toast.error("required MINLENGTH is 3...")
            }

    
            // Make a PUT request to update the product
            const result = await fetch(`http://localhost:5000/mypostupdate/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ post }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            // Check if the request was successful
            if (!result.ok) {
                throw new Error(`Failed to update product. Status: ${result.status}`);
            }
    
            // Parse the response data
            const data = await result.json();
            
            // Log the updated data
            console.log(data);
    
            // Navigate to '/mypost' after successful update
            navigate('/mypost');
        } catch (error) {
            // Log and handle any errors that occur during the update process
            console.error('Error updating product:', error);
            // Handle the error appropriately (e.g., show an error message to the user)
        }
    }
    




    return (
        <div className='Update'>
            <div><Toaster></Toaster></div>
            <form className='up'>
                <div className='up2'>
                    <input placeholder='UPDATE YOUR POST' className='inputU'
                    onChange={(e) => { setPost(e.target.value) }} value={post}></input>
                </div>

                <button className='buttonU' onClick={updateProduct}>UPDATE POST</button>
            </form>
        </div>
    )
}

export default Update
