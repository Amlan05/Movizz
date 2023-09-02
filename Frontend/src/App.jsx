import { useEffect } from 'react'
import Header from './Components/Header'
import { Route, Routes } from 'react-router'

import HomePage from './Components/HomePage/HomePage'
import Movies from './Components/Movies/Movies'
import Admin from './Components/Admin/Admin'
import Auth from './Components/Auth/Auth'
import Booking from './Components/Booking/Booking'
import UserProfile from './Components/Profile/UserProfile'
import AddMovie from './Components/Movies/AddMovie'
import AdminProfie from './Components/Profile/AdminProfie'
import { useSelector, useDispatch } from 'react-redux'
import { userActions, adminActions } from './Store'

function App() {
const dispatch = useDispatch()

  useEffect( () => {
    if(localStorage.getItem("userId")){
      dispatch(userActions.login())
    }
    else if(localStorage.getItem("AdminId")){
      dispatch(adminActions.login())
    }
  },[])


  const isAdminLoggedIn = useSelector( (state) => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector( (state) => state.user.isLoggedIn)
  console.log("isAdminLoggedIn", isAdminLoggedIn)
  console.log("isuserLoggedIn", isUserLoggedIn)

  return (
    <>
     <Header></Header>
     <section>
      <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/movies" element={<Movies></Movies>}></Route>
        <Route path="/homepage" element={<HomePage></HomePage>}></Route>
        <Route path="/admin" element={<Admin></Admin>}></Route>
        <Route path="/auth" element={<Auth></Auth>}></Route>
        <Route path='/booking/:id' element={<Booking></Booking>}></Route>
        <Route path='/user' element={<UserProfile></UserProfile>}></Route>
        <Route path='/add' element={<AddMovie></AddMovie>}></Route>
        <Route path="admin-profile" element={<AdminProfie></AdminProfie>}></Route>

      </Routes>
     </section>

    </>
  )
}

export default App
