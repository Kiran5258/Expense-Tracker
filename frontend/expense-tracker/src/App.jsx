import React from 'react'

import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import Login from '../src/pages/Auth/Login';
import Signup from '../src/pages/Auth/Signup';
import Home from '../src/pages/Dashboard/Home'
import Income from '../src/pages/Dashboard/Income'
import Expense from '../src/pages/Dashboard/Expense';
import Userprovider from './context/UserContext';
export default function App() {
  return (
    <div>
      <Userprovider>
      <Router>
        <Routes>
          <Route path='/'element={<Root/>}/>
          <Route path='/login'exact element={<Login/>}/>
          <Route path='/signup'exact element={<Signup/>}/>
          <Route path='/dashboard'exact element={<Home/>}/>
          <Route path='/income' exact element={<Income/>}/>
          <Route path='/expense'exact element={<Expense/>}/>
       </Routes>
      </Router>
      </Userprovider>
    </div>
  )
}

const Root=()=>{
  const isAuthenticated=!!localStorage.getItem('token');
  return isAuthenticated ?(
    <Navigate to={'/dashboard'}/>
  ):(
    <Navigate to={'/login'}/>
  )
}
