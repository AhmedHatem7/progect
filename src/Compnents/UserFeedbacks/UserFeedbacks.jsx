import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

export default function UserFeedbacks() {
  const token=localStorage.getItem('tkn')
  const [userId,setUserId]=useState()
    function userData(){
        try{
         const response = axios.get('http://fluffypet.runasp.net/Get-Current-User',{
            headers:{
                Authorization:  `Bearer ${token}`
            }
         })
         setUserId(response.data.id)
         console.log('dat',response.data)
        }catch(error){
          console.log(error)
        }
    }
    useEffect(()=>{
        userData()
    },[])
   
  async  function getFeedbacks(){
        try{
            const response=await axios.get(`http://fluffypet.runasp.net/api/Feedbacks/AllFeedbacks/${userId}`)
        }catch(error){
        console.log(error)
        }
    }
useEffect(()=>{
    getFeedbacks()
},[])
  return  <>
      
    </>
  
}
