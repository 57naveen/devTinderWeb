import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <>
     <NavBar/>
     <Outlet/>  {/* This Outlet is used to render the children component inside the parent component */}
     <Footer/>
    </>
  )
}

export default Body