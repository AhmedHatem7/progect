import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

export default function ProtectedRouts({children}) {
  let token=localStorage.getItem('tkn')
 try{
  const decoded = jwtDecode(token);
  if(decoded.roles!='User'){
    localStorage.clear()
    return <Navigate to='/signin'/>
  }
  console.log(decoded);
 }catch(err){
  localStorage.clear()
  return <Navigate to='/signin'/>
 }
 if (token){
  return children
 }
 return <Navigate to='/signin'/>
} 