import React, { useEffect, useState } from 'react'
import './mypost.css'
import { Link } from 'react-router-dom';


const MyPost = () => {
    const [data, setData] = useState([]); // Initialize data as an array

    console.log(data)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth = localStorage.getItem('user');
                const userrrr = JSON.parse(auth);
                let id = userrrr._id
                console.log(id)
                
                let result = await fetch(`http://localhost:5000/mypost/${id}`, {
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
    //     return <div></div>;
    // }


    function refreshPage() {
        window.location.reload();
    }
    const deletePost = async (id) => {
        var result = await fetch(`http://localhost:5000/mypost/${id}`, {
            method: "Delete"
        }, refreshPage());
        result = await result.json();
        console.log("hhhh")
        window.location.reload();
        if (result) {
            alert("product deleted....")
        }

    }



    return (
        <div className='myPost_container'>
        <div style={{ marginTop: "20px", marginBottom: "10px", position: "fixed", bottom: 70 }}><Link to={"/feed"} ><button className='btn btn-danger' style={{ width: 100 }}>Feed</button></Link></div>
            {data.map((item, index) => (
                <div className='mypost' key={item._id}>
                    <div className='mypost_min'>
                        <div style={{ fontSize: 20,fontWeight:"500",color:"white" }}>{item.post}</div>
                        <div style={{ fontSize: 13, fontWeight: '400' }} className='mt-2 mb-1' >Created : OWN</div>
                        <div style={{ fontSize: 13, marginLeft: "200px" }} className='mt-2 mb-1'>Date : {(item.updatedAt).slice(0,10)}</div>

                        <button className='mt-3 buttonap btn btn-light' style={{ width: "95%" }} onClick={() => deletePost(item._id)}>Delete</button>

                        {item.isapprove==="no"?<Link to={"/update/" + item._id}><button className='mt-3 mb-2 buttonap btn btn-light' style={{ width: "95%" }} >Update</button></Link>:<Link to={"/update/" + item._id}><button style={{ width: "95%",border:"none" }} className='buttonmp' disabled >Update</button></Link>}
                        
                    </div>

                </div>
            ))}
        </div>
    );
}

export default MyPost;








// import React, { useEffect, useState } from 'react'
// import './mypost.css'
// import { Link } from 'react-router-dom';

// const MyPost = () => {
//     const [data, setData] = useState([]); // Initialize data as an array

//     console.log(data)
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const auth = localStorage.getItem('user');
//                 let id = auth.slice(8, 32)
//                 let result = await fetch(`http://localhost:5000/mypost/${id}`, {
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


//     function refreshPage() {
//         window.location.reload();
//     }
//     const deletePost=async(id)=>{
//         var result = await fetch(`http://localhost:5000/mypost/${id}`, {
//             method: "Delete"
//         },refreshPage());
//         result = await result.json();
//         console.log("hhhh")
//         window.location.reload();
//         if (result) {
//             alert("product deleted....")
//         }

//     }



//     return (
//         <div>
//             {data.map((item, index) => (
//                 <div className='mypost' key={item._id}>
//                     <p>{item.post}</p>
//                     <p>Date:{item.updatedAt}</p>
//                     <p>Created:own</p>
//                     <button onClick={() => deletePost(item._id)}>Delete</button>
//                     <br />
//                     <button><Link to={"/update/" + item._id}>Update</Link></button>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default MyPost;
