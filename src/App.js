import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './components/Users';
import NavbarComp from './components/NavbarComp';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Productos from './components/Productos';
import Home from './components/Home';
import UserId from './components/UserId';


function App() {
  return(
    <div>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavbarComp/>}>
            <Route index element={ <Home /> } />
            <Route path='Users' element={<Users/>}/>
            <Route path='Productos' element={<Productos/>}/>
            <Route path='UserId' element={<UserId/>}/>

          </Route>
        </Routes>
    </BrowserRouter>

   </div>
  )
 
}

export default App;
