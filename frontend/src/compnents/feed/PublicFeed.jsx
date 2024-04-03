import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const PublicFeed = () => {

    const [data, setData] = useState([])
    console.log(data)

    const auth = localStorage.getItem('user');
    const userData = JSON.parse(auth);
    const user = userData.role

    useEffect(() => {
        publicPost()
    }, [])

    const publicPost = async () => {
        try {

            let result = await fetch(`http://localhost:5000/approvedPost`, {
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



    return (
        <div className='allPost_container'>
        <div style={{ marginTop: "20px",marginBottom:"10px", position:"fixed", bottom:70 }}><Link to={"/feed"} ><button className='btn btn-danger' style={{ width:100 }}>Feed</button></Link></div>
            {data.map((item, index) => (
                <div className='allpost'>
                    <div className='allpost_min'>
                        <div style={{ fontSize: 20, fontWeight: '600', color: 'white', }}>{item.post}</div>
                        <div style={{ fontSize: 15, fontWeight: '400'}} className='mt-2 mb-1'>Created By : {item.username}</div>
                        <div style={{ fontSize: 15, fontWeight: '400'}}>Approved By : {item.adminName}</div>
                        <div style={{ fontSize: 13, marginLeft:"200px" }} className='mt-2 mb-1'>Date : {(item.updatedAt).slice(0, 10)}</div>
                        

                        {/* {user === "admin" ? <div> <button className='mt-2 mb-2 buttonap' style={{ width: 208 }} >Make public</button></div> : null} */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PublicFeed
