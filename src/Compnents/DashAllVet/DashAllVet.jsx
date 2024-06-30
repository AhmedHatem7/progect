import React, { useContext, useEffect, useState } from 'react'
import { ButtonContext } from '../../DashSidebarBtn/DashSidebarBtn'
import axios from 'axios'

import { Link, json, params } from 'react-router-dom'
import { array } from 'yup'
import { Button } from 'bootstrap'

export default function DashAllVet() {
 
    const [AllVet, setAllVet] = useState([])
    const [filteredAndMappedArray, setfilteredAndMappedArray] = useState([])
    const token=localStorage.getItem('Token')
    console.log(token)
 
    async function AdminAcceptuser(UserEmail)
    {
      let x = await axios.post(`http://fluffypet.runasp.net/api/Admin/Accept-User?UserEmail=${UserEmail}`,null, {
    headers: {
        'Authorization': 'Bearer ' + token
    }}).then((data)=>{
  
    console.log(data)
    getAllUser()
 }).catch((err)=>{
 console.log(err)
 })
    }
// async function Acc(email){
//   await AdminAcceptuser(email)
// }
   async function getAllUser()
   {
let data=await axios.get('http://fluffypet.runasp.net/api/Admin/Get_All_Users?pageSize=1000000000',{headers:{
    'Authorization': 'Bearer ' + token
}}).then((data)=>{
   
    setAllVet(data.data.data)

}).catch((err)=>{
console.log(err)
})
   }

useEffect(()=>{
    getAllUser()
},[AllVet])


const filteredVet = AllVet?.filter(Vet => Vet.roles == 'Vet');
console.log('user after filter',filteredVet)
  return (
  < >
    
{console.log(filteredVet)}



<div className=' p-2 w-100 '>
      <table className="table table-light  ">
  <thead >
    <tr  >
      
     
    
      <th scope="col" className=' bg-warning text-white'>Email</th>
      <th scope="col" className=' bg-warning text-white' >username </th>
      <th scope="col "  className=' bg-warning text-white'>Role</th>
      <th scope="col "  className=' bg-warning text-white'>state</th>
      <th scope="col "  className=' bg-warning text-white'>Details</th>
      <th scope="col "  className=' bg-warning text-white'>Accept user</th>


    </tr>
  </thead>
  {filteredVet?.map(user=>{
  
    return<>
   
   <tbody className='' >
    
    <tr  >
      
      
      
      
      <td>{<div className='d-flex align-items-md-center '>
      {(user.image)?<div className='thumbnail rounded-circle overflow-hidden'><img src={'http://fluffypet.runasp.net/'+user.image} className='w-100   rounded rounded-circle'  />
      
      </div>:<div className='bg-warning-subtle rounded-circle overflow-hidden' style={{width:'40px',height:'40px'}}>{}</div>}
        <div className='ms-2'>{user.email}</div>
        </div>
        }</td>
        <td className=''>{user.userName}</td>
      <td>{user.roles}</td>
      <td >{user.adminAccepted?'Enable ':'Admin not Accept'}</td>

      <td ><div >
        <Link to={'/DashUserDetail/'+user.id}>
        <i  className="fa-regular fa-eye SuserDe ms-3"></i>
        </Link>
     
    
        </div></td>
      <td>  {user.adminAccepted?'':<button onClick={()=>AdminAcceptuser(user.email)} className='btn btn-outline-warning Acceptbutton ms-2'>Accept</button>}</td>
    </tr>
  
 
  </tbody>
            
    
    </>
    
})}
  
</table>
      </div>

  </>
  )
}
/*

<div className=' p-2 w-100 '>
      <Table class="table ">
  <thead>
    <tr >
      <th scope="col">#</th>
      <th scope="col" >username </th>
      <th scope="col">Email</th>
      <th scope="col">state</th>


    </tr>
  </thead>
  <tbody>
    <tr>
      
      <th>1</th>
      <td>{user.userName}</td>
      <td>{user.email}</td>
      <td>{user.roles}</td>
    </tr>
  
 
  </tbody>
</Table>
      </div>
    -------
    {Allusers?.map(user=>{
    return<>
   
       
            
    
    </>
    
})}
*/
/*

 */