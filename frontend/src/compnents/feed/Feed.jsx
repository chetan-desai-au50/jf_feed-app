import React, { useState } from 'react'
import './feed.css'

import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';

const Feed = () => {
  const auth = localStorage.getItem('user');
  const userData = JSON.parse(auth);
  const user = userData.role
  // const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  }

  const [post, setPost] = useState("")


  const onPost = async (e) => {
    e.preventDefault()
    setPost("")
    console.log(post)
    if (post.length < 3) {
      return toast.error("Required MinLegth is 3 ...")
    }

    const auth = localStorage.getItem('user');
    const userrrr = JSON.parse(auth);
    console.log(userrrr)


    // console.log(auth)
    let userId = userrrr._id
    let username = userrrr.username

    console.log("UserName:", userrrr.username, "userId:", userrrr._id)


    let result = await fetch("http://localhost:5000/post", {
      method: 'post',
      body: JSON.stringify({ post, userId, username }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    result = await result.json();
    console.log('result', result)


  }


  return (
    <div className='feed'>
      <div><Toaster /></div>
      {user === "user" ? <form className='mt-4 feed_form'>
        <input style={{ width: 320 }} placeholder='ENTER YOUR POST' className='form-control inputf' minLength="3"
          onChange={(e) => setPost(e.target.value)} value={post}></input>

        <div><button style={{ width: 300 }} className='btn btn-outline-success mt-3 buttonf'
          onClick={onPost}>Create Post</button></div>

      </form> : null}

      {user === "user" ? <Link to={"/mypost"}><button className='mt-5 buttonf btn btn-warning' style={{ width: 230 }}>View My Post</button></Link> : null}

      {user === "admin" ? <Link to={"/foradminallpost"}><button style={{ width: 230 }} className='mt-5 buttonf btn btn-warning ' >All Users posts</button></Link> : null}
      
      {user === "admin" ? <Link to={"/approvebyadmin"}><button style={{ width: 230 }} className='mt-3 buttonf btn btn-warning' >Approved posts</button></Link> : null}

      {user === "admin" ? <Link to={"/allUsers"} ><button style={{ width: 230 }} className='mt-3 buttonf btn btn-warning' >All Users</button></Link> : null}

      <div> <Link to={"/allpost"}><button className='mt-3 buttonf btn btn-warning' style={{ width: 230 }}>{user === "user" ? "My Approved posts" : "Approve Here"}</button></Link></div>

      <div><Link to={"/publicfeed"}><button className='mt-3 buttonf btn btn-warning' style={{ width: 230 }} >Public Feed</button></Link></div>

      <div className='mt-2'><button className='mt-5 buttonf btn btn-outline-danger' style={{ width: 300 }} onClick={logout}>Logout</button></div>

    </div>
  )
}

export default Feed








// import React, { useState } from 'react'
// import './feed.css'

// import { Link, useNavigate } from 'react-router-dom';
// import toast from "react-hot-toast";
// import { Toaster } from 'react-hot-toast';

// const Feed = () => {
//   const auth = localStorage.getItem('user');
//   const userData = JSON.parse(auth);
//   const user = userData.role
//   // const auth = localStorage.getItem('user');
//   const navigate = useNavigate();
//   const logout = () => {
//     localStorage.clear();
//     navigate('/signup');
//   }

//   const [post, setPost] = useState("")


//   const onPost = async (e) => {
//     e.preventDefault()
//     setPost("")
//     console.log(post)
//     if (post.length < 3) {
//       return toast.error("Required MinLegth is 3 ...")
//     }

//     const auth = localStorage.getItem('user');
//     const userrrr = JSON.parse(auth);
//     console.log(userrrr)


//     // console.log(auth)
//     let userId = userrrr._id
//     let username = userrrr.username

//     console.log("UserName:", userrrr.username, "userId:", userrrr._id)


//     let result = await fetch("http://localhost:5000/post", {
//       method: 'post',
//       body: JSON.stringify({ post, userId, username }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     result = await result.json();
//     console.log('result', result)


//   }


//   return (
//     <div className='feed'>
//       <div><Toaster /></div>
//       {user === "user" ? <form className='mt-4 feed_form'>
//         <input style={{ width: 200 }} placeholder='ENTER YOUR POST' className='inputf' minLength="3"
//           onChange={(e) => setPost(e.target.value)} value={post}></input>

//         <div><button style={{ width: 200 }} className='mt-3 buttonf'
//           onClick={onPost}>Create Post</button></div>

//       </form> : null}

//       {user === "user" ? <Link to={"/mypost"}><button className='mt-3 buttonf' style={{ width: 200 }}>View My Post</button></Link> : null}

//       {user === "admin" ? <Link to={"/foradminallpost"}><button style={{ width: 200 }} className='mt-3 buttonf' >All Users posts</button></Link> : null}
//       {user === "admin" ? <Link to={"/approvebyadmin"}><button style={{ width: 200 }} className='mt-3 buttonf' >Approved posts</button></Link> : null}
//       <div> <Link to={"/allpost"}><button className='mt-3 buttonf' style={{ width: 200 }}>{user === "user" ? "My Approved posts" : "All Pending Post's"}</button></Link></div>
//       {user === "admin" ? <Link to={"/allUsers"} ><button style={{ width: 200 }} className='mt-3 buttonf mb-5' >All Users</button></Link> : null}

//       <div className='pt-5'><button className='mt-5 buttonf' style={{ width: 200 }} onClick={logout}>Logout</button></div>

//     </div>
//   )
// }

// export default Feed