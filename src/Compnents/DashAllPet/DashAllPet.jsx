import React, { useContext, useEffect, useState } from 'react'
import { ButtonContext } from '../../DashSidebarBtn/DashSidebarBtn'
import axios from 'axios'

import { Link, json, params } from 'react-router-dom'
import { array } from 'yup'
import { Button } from 'bootstrap'

export default function DashAllPet() {
 
  const [Allpets, setAllpets] = useState([])
    const token=localStorage.getItem('Token')
    console.log(token)
 
    async function AdminAcceptpet(petId)
    {
      let x = await axios.post(`http://fluffypet.runasp.net/api/Admin/Accept-Pet?petId=${petId}`,null, {
    headers: {
        'Authorization': 'Bearer ' + token
    }}).then((data)=>{
  
    console.log(data)
    getAllPets()
 }).catch((err)=>{
 console.log(err)
 })
    }

   async function getAllPets()
   {
let data=await axios.get('http://fluffypet.runasp.net/api/Admin/Get_All_Pets?pageSize=100',{headers:{
    'Authorization': 'Bearer ' + token
}}).then((data)=>{
 console.log(data.data.data)
     setAllpets(data.data.data)

}).catch((err)=>{
console.log(err)
})
   }

useEffect(()=>{
    getAllPets()
},[])
  return (
  < >
    



<div className=' p-2 w-100 '>
      <table className="table table-light  text-center">
  <thead >
    <tr  >
      
     
    
      <th scope="col" className=' bg-warning text-white'>image</th>
      <th scope="col" className=' bg-warning text-white'>Gender</th>
      <th scope="col" className=' bg-warning text-white'>species</th>
      <th scope="col" className=' bg-warning text-white' >Age </th>
      <th scope="col "  className=' bg-warning text-white'>Honer</th>
      <th scope="col "  className=' bg-warning text-white'>state</th>
      <th scope="col "  className=' bg-warning text-white'>Details</th>
      <th scope="col "  className=' bg-warning text-white'>Accept user</th>


    </tr>
  </thead>
  {Allpets?.map(pet=>{
  
    return<>
   
   <tbody className='' >
    
    <tr  >
      
      
      
      
      <td>{<div className='d-flex align-items-md-center '>
      {(pet.images)?<div className='thumbnail rounded-circle overflow-hidden'><img src={'http://fluffypet.runasp.net/'+pet.images[0].imageUrl} className='w-100   rounded rounded-circle'  />
      
      </div>:<div className='bg-warning-subtle rounded-circle overflow-hidden' style={{width:'40px',height:'40px'}}>{}</div>}
        
        </div>
        }</td>
      {pet.gender==1 ?  <td className=''>male</td> :   <td className=''>female</td>}
        {pet.species==1?<td className=''>Dog</td>:pet.species==2?<td className=''>Cat</td>:pet.species==3?<td className=''>Bird</td>:
        pet.species==4?<td className=''>fish</td>:pet.species==5?<td className=''>Rabbit</td>:pet.species==6?<td className=''>Hamster</td>:
        pet.species==7?<td className=''>GuineaPig</td>:pet.species==8?<td className=''>Reptile</td>:pet.species==9?<td className=''>Horse</td>:''}
        <td className=''>{pet.age}</td>
      <td>{pet.firstName+' '+pet.lastName}</td>
      <td >{pet.isAccepted?'Enable ':'Admin not Accept'}</td>

      <td ><div >
        <Link to={'/DashUserDetail/'+pet.id}>
        <i  className="fa-regular fa-eye SuserDe ms-3"></i>
        </Link>
     
    
        </div></td>
        
      <td>  {pet.isAccepted?'':<button onClick={()=>AdminAcceptpet(pet.id)} className='btn btn-outline-warning Acceptbutton ms-2'>Accept</button>}</td>
    </tr>
  
 
  </tbody>
            
    
    </>
    
})}
  
</table>
      </div>
      </>
  )
}