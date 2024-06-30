import React, { useContext, useEffect, useState } from 'react'
import { ButtonContext } from '../../DashSidebarBtn/DashSidebarBtn'
import axios from 'axios'

import { Link, json, params } from 'react-router-dom'
import { array } from 'yup'
import { Button } from 'bootstrap'

export default function DashAllProduct() {
 
  const [AllProduct, setAllProduct] = useState([])
    const token=localStorage.getItem('Token')
    console.log(token)
 
    async function AdminAcceptProduct(ProductId)
    {
      let x = await axios.post(`http://fluffypet.runasp.net/api/Admin/Accept-Product?ProductId=${ProductId}`,null, {
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
let data=await axios.get('http://fluffypet.runasp.net/api/Admin/Get_All_Products?pageSize=100',{headers:{
    'Authorization': 'Bearer ' + token
}}).then((data)=>{
 console.log(data.data.data)
     setAllProduct(data.data.data)

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
  <thead  >
    <tr  >
      
     
    
      <th scope="col" className=' bg-warning text-white'>image</th>
      <th scope="col" className=' bg-warning text-white'>species</th>
      <th scope="col" className=' bg-warning text-white' >name </th>
      <th scope="col "  className=' bg-warning text-white'>price</th>
      <th scope="col" className=' bg-warning text-white'>Honer</th>
      <th scope="col "  className=' bg-warning text-white'>state</th>
      <th scope="col "  className=' bg-warning text-white'>Details</th>
      <th scope="col "  className=' bg-warning text-white'>Accept user</th>


    </tr>
  </thead>
  {AllProduct?.map(product=>{
  
    return< >
   
   <tbody  className='' >
    
    <tr  >
      
      
      
      
      <td >{<div className='d-flex align-items-md-center '>
      {(product.images)?<div className='thumbnail rounded-circle overflow-hidden'><img src={'http://fluffypet.runasp.net/'+product.images[0].imageUrl} className='w-100   rounded rounded-circle'  />
      
      </div>:<div className='bg-warning-subtle rounded-circle overflow-hidden' style={{width:'40px',height:'40px'}}>{}</div>}
        
        </div>
        }</td>

<td className=''>{product.categoryName}</td>
      <td className=''>{product.name}</td>
      <td className=''>{product.price}</td>
      <td>{product.firstName+' '+product.lastName}</td>

      <td >{product.isAccepted?'Enable ':'Admin not Accept'}</td>

      <td ><div >
        <Link to={'/DashUserDetail/'+product.id}>
        <i  className="fa-regular fa-eye SuserDe ms-3"></i>
        </Link>
     
    
        </div></td>
        
      <td>  {product.isAccepted?'':<button onClick={()=>AdminAcceptProduct(product.id)} className='btn btn-outline-warning Acceptbutton ms-2'>Accept</button>}</td>
    </tr>
  
 
  </tbody>
            
  
    </>
    
})}
  
</table>
      </div>
      </>
  )
}