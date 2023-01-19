
import './App.css';
import LandingPage from './Pages/LandingPage';
import{Routes,Route,redirect} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import {useSelector } from 'react-redux'
import Home from './Pages/home/Home';
import Profile from './Pages/profile/Profile';

import { useEffect } from 'react';
import Messenger from './Pages/messenger/Messenger';
import AdminLoginPage from './Pages/admin/adminLogin/AdminLoginPage';
import AdminStructure from './Pages/admin/adminStructure/AdminStructure';
import AdminDashboard from './Components/Admin/adminDashboard/adminDashboard';
import UserManagement from './Components/Admin/userManagement/UserManagement';
import PostManagement from './Components/Admin/postManagement/PostManagement';
import ErrorPage from './Pages/error/ErrorPage';




function App() {
  const user = useSelector((state)=>{
    return state.userData.data
  })

  return (
   
      <div className="App">
        <Routes>
         <Route path='/feed' element={<Home/>}/> 
         
          <Route path='/' element={<LandingPage/>} />
          
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/profile/:username' element={ <Profile/>}/>
          <Route path='/messenger' element={ <Messenger/>}/>



          <Route path='/adminlogin' element={ <AdminLoginPage/>}/>
          <Route path='/admin' element={ <AdminStructure/>}>
          <Route path='dashboard' element={ <AdminDashboard/>}/>
          <Route path='usermanagement' element={ <UserManagement/>}/>
          <Route path='postmanagement' element={ <PostManagement/>}/>
          </Route>
          
          
          <Route path="*" element={ <ErrorPage/>}/>
        </Routes>
    
    
      </div>
   
  );
}

export default App;
