import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../pages/Navbar/Navbar'
import Footer from '../pages/Footer/Footer'

const NavFootLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default NavFootLayout