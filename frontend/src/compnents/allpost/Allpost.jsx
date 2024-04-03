import React, { useEffect, useState } from 'react';
import './allpost.css'
import { Link } from 'react-router-dom';

const Allpost = () => {
    const [data, setData] = useState([]); // Initialize data as an array
    const [approveData, setApprovedata] = useState("")

    console.log("ssss",data)

    // console.log(data)
    console.log(approveData.username)
    console.log(approveData.post)
    console.log(approveData.userId)



    const auth = localStorage.getItem('user');
    const userData = JSON.parse(auth);
    const user = userData.role
    console.log("is Admin", user)



    useEffect(() => {
        const fetchData = async () => {
            try {
                // const auth = localStorage.getItem('user');
                // let id = auth.slice(8, 32)
                const auth = localStorage.getItem('user');
                const userrrr = JSON.parse(auth);
                let id = userrrr._id
                console.log("id : ",id)
                let result = await fetch(user === "admin" ? `http://localhost:5000/notApprovePost/no` : `http://localhost:5000/isApprove_yes/${id}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                result = await result.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    // if (data.length === 0) {
    //     return <div>Loading...</div>;
    // }

    function refreshPage() {
        window.location.reload();
    }
    const deletePost = async (id) => {
        var result = await fetch(`http://localhost:5000/posts/${id}`, {
            method: "Delete"
        }, refreshPage());
        result = await result.json();
        console.log("hhhh")
        window.location.reload();
        if (result) {
            alert("product deleted....")
        }

    }

    const approvePost = async (val) => {
        
        try {

            let result = await fetch(`http://localhost:5000/getSinglePost/${val}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json();
            // console.log(result)
            setApprovedata(result);  //usestate
            // console.log(approveData)
            postApprovePost(result)

        } catch (error) {
            console.error('Error fetching data:', error);
        }



    }


    const postApprovePost = async (val) => {
        const auth = localStorage.getItem('user');
        const userData = JSON.parse(auth);
        let username = val.username
        let adminId = userData._id
        console.log("adimn:",adminId)
        let post = val.post
        let postid = val._id//we got this from approve post
        let isapprove = "yes"
        let adminName=userData.username
        console.log("adminName:",adminName)

        let result = await fetch(`http://localhost:5000/update_isapprove/${postid}`, {
            method: 'put',
            body: JSON.stringify({ isapprove, adminId,adminName}),
            headers: {
                'Content-Type': 'application/json'
            }
        }, refreshPage());

        result = await result.json();
        console.log('approved post posted:', result)
    }






    return (
        <div className='allPost_container'>
        <div style={{ marginTop: "20px",marginBottom:"10px", position:"fixed", bottom:70 }}><Link to={"/feed"} ><button className='btn btn-danger' style={{ width:100 }}>Feed</button></Link></div>
            {data.map((item, index) => (
                <div className='allpost' key={item._id}>
                    <div className='allpost_min'>
                        <div style={{ fontSize: 22,color:"white" ,fontWeight:"600"}} className='mt-1'>{item.post}</div>
                        <div style={{ fontSize: 15, fontWeight: '400'}}className='mt-2 mb-1'>Created : {item.username}</div>
                        <div style={{ fontSize: 15 }} className='mt-2 mb-1'>Date : {(item.updatedAt).slice(0, 10)}</div>
                        

                        {user === "admin" ? <div> <button className='mt-3 buttonap btn btn-light' style={{ width: "95%" }} onClick={() => deletePost(item._id)}>Delete</button>
                            <br />
                            <button className='mt-3 mb-2 buttonap btn btn-light' style={{ width: "95%" }} onClick={() => approvePost(item._id)} >Approve</button></div> : null}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Allpost





//
// import React, { useEffect, useState } from 'react';
// import './allpost.css'

// const Allpost = () => {
//     const [data, setData] = useState([]); // Initialize data as an array
//     console.log(data)


//     const auth = localStorage.getItem('user');
//     const userData = JSON.parse(auth);
//     const user=userData.role
//     console.log("is Admin",user)


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // const auth = localStorage.getItem('user');
//                 // let id = auth.slice(8, 32)
//                 let result = await fetch(`http://localhost:5000/posts`, {
//                     method: 'get',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 })
//                 result = await result.json();
//                 setData(result);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }
//         fetchData();
//     }, [])

//     if (data.length === 0) {
//         return <div>Loading...</div>;
//     }


//   return (
//     <div>
//             {data.map((item, index) => (
//                 <div className='allpost' key={item._id}>
//                     <p>{item.post}</p>
//                     <p>Date:{item.updatedAt}</p>
//                     <p>Created:{item.username}</p>

//                    {user==="admin"? <div><button>delete</button><br/><button>Approve</button></div> :""}
//                 </div>
//             ))}
//         </div>
//   )
// }

// export default Allpost

