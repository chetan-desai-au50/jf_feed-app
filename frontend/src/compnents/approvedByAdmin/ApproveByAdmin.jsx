import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ApproveByAdmin = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        getApprovedDataByAdmin();
    }, [])


    const getApprovedDataByAdmin = async () => {
        try {
            const auth = localStorage.getItem('user');
            const userrrr = JSON.parse(auth);
            let id = userrrr._id
            console.log("get_Approved_Data_By_Admin : ", id)

            let result = await fetch(`http://localhost:5000/approveByAdmin/${id}`, {
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

            {data.map((item, index) => (
                <div className='allpost' >
                <div style={{ marginTop: "20px", marginBottom: "10px", position: "fixed", bottom: 70, marginLeft:"130px" }}><Link to={"/feed"} ><button className='btn btn-danger' style={{ width: 100 }}>Feed</button></Link></div>
                    <div className='allpost_min'>
                        <div className='mt-2' style={{ fontSize: 20 ,fontWeight: '500', color: 'white', }}>{item.post}</div>
                        
                        <div style={{ fontSize: 15,fontWeight: '400' }} className='mt-2'>Created By:  {item.username}</div>
                        <div style={{ fontSize: 14,fontWeight: '400' }} className=''>Approve By : OWN</div>
                        <div style={{ fontSize: 13, marginLeft:"200px" }} className='mt-3 mb-1' >Date : {(item.updatedAt).slice(0, 10)}</div>

                        {/* <div> <button className='mt-2 mb-2 buttonap' style={{ width: 208 }} >Delete</button>
                            <br />
                            <button className='mt-2 mb-2 buttonap' style={{ width: 208 }} >Approve</button></div> */}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default ApproveByAdmin


// {/* <div className='allPost_container'>
//             {data.map((item, index) => (
//                 <div className='allpost' key={item._id}>
//                     <div className='allpost_min'>
//                         <div style={{ fontSize: 17 }}>{item.post}</div>
//                         <div style={{ fontSize: 13 }} className='mt-3 mb-1'>Date : {(item.updatedAt).slice(0, 10)}</div>
//                         <div style={{ fontSize: 13 }}>Created : {item.username}</div>

//                         {user === "admin" ? <div> <button className='mt-2 mb-2 buttonap' style={{ width: 208 }} onClick={() => deletePost(item._id)}>Delete</button>
//                             <br />
//                             <button className='mt-2 mb-2 buttonap' style={{ width: 208 }} onClick={() => approvePost(item._id)} >Approve</button></div> : null}
//                     </div>
//                 </div>
//             ))}
//         </div> */}
