import React from 'react'
import { NavLink } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import UserProfile from '../../Compnents/UserProfile/UserProfile'

export default function AuthLayOut() {
  return (
    <>
    <UserProfile/>
    <Outlet/>
  </>
  )
}
