import React from 'react'
import "./App.css"
import Signup from './compnents/Signup';
import Login from './compnents/Login';
import Feed from './compnents/feed/Feed';
import MyPost from './compnents/mypost/MyPost';
import Allpost from "./compnents/allpost/Allpost.jsx";
import Update from './compnents/update/Update.jsx';
import ForAdmin from './compnents/allpost/ForAdmin.jsx'
import  ApproveByAdmin  from './compnents/approvedByAdmin/ApproveByAdmin.jsx';
import AllUsers from './compnents/allusers/AllUsers.jsx';
import { Routes, Route } from 'react-router-dom';
import PublicFeed from './compnents/feed/PublicFeed.jsx';

//boostrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";



import PrivateComponent from './compnents/PrivateComponent';

const App = () => {
  return (
    <div className='app'>
      {/* <Signup/> */}
      {/* <Login/> */}
      {/* <Feed/> */}

      {/* <Routes>
        <Route exact path='/signup' Component={Signup}></Route>
        <Route exact path='/login' Component={Login}></Route>
        <Route exact path='/feed' Component={Feed}></Route>
      </Routes> */}

      <Routes>

        <Route element={<PrivateComponent />} >

           <Route exact path='/' Component={Signup} />
          <Route exact path='/feed' Component={Feed} />
          <Route exact path='/mypost' Component={MyPost} />
          <Route exact path='/allpost' Component={Allpost} />
          <Route exact path='/update/:id' Component={Update} />
          <Route exact path='/approvebyadmin' Component={ApproveByAdmin} />
          <Route exact path='/foradminallpost' Component={ForAdmin} />
          <Route exact path='/allUsers' Component={AllUsers} />
          <Route exact path='/publicfeed' Component={PublicFeed} />
          

        </Route>
        <Route exact path='/signup' Component={Signup} />
        <Route exact path='/login' Component={Login} />

      </Routes>

    </div>
  )
}

export default App
