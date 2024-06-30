import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import GetVetService from './GetVetService';
import { AllService } from '../../GetVetsService';
import axios from 'axios';
import { json } from 'react-router-dom';

export default function AddVetService() {
  let{getVetsService,vetService,setvetService}=useContext(AllService)
  const [name, setName] = useState('');
  const [description, setdescription] = useState('');
  const [Id, setId] = useState(0);
  const [price, setprice] = useState('');
  const [flag, setflag] = useState(true);
let token =localStorage.getItem('Token')
//delete a service
function ignoreService(id) {
  axios.delete(`http://fluffypet.runasp.net/api/Vets/DeleteVetService/${id}`,{
    headers: {
        'Authorization': 'Bearer ' + token
    }}).then((data)=>{
  
    console.log(data.status)
    getVetsService()
 }).catch((err)=>{
 console.log(err)
 })
}
//update service 
function Update(id,name,descreption,price) {
 setflag(false)
 setId(id)
  setName(name);
  setdescription(descreption);
  setprice(price);
 console.log('data',Id,name,descreption,price)
}
//-----------
function UpdateService() {
  const dataupdated = {
       'id': 0,
      name:name,
    description: description,
    price:parseInt(price) 
    
  };

 
  axios.put(`http://fluffypet.runasp.net/api/Vets/UpdateVetService/${Id}`,JSON.stringify(dataupdated),{
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }}).then((data)=>{
   
    console.log(data.status)
    getVetsService()
    setName('');
    setdescription('');
    setprice('');
    setflag(true)
 }).catch((err)=>{
 console.log(err)
 })
}
//-----------
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the data object
    const data = {
      name: name,
      description: description,
      price: parseInt(price),
    };



    // Set the API endpoint URL
    const apiUrl = 'http://fluffypet.runasp.net/api/Vets/AddVetService';

    // Set the request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response.ok) {
        console.log('Request successful!');
        toast.success("Service Added successfully!");
        getVetsService()
  
       
        setName('');
  setdescription('');
  setprice('');
      } else {
        console.error('Request failed:', response.status);
      }
      const responseData = await response.json();
      console.log('Response data:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
    <div className="container">
    
      <form onSubmit={handleSubmit}>
       

        
<div className="d-flex">
  
<label className='mt-3 me-2' htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control mt-2  me-2"
        />
         <label className='mt-3 me-2' htmlFor="price">price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          required
          className="form-control mt-2"
        />

</div>
       
        <label className='mt-3' htmlFor="description">description:</label>
        <textarea
          type="description"
          id="description"
          name="description"
          value={description}
         rows={5}
          onChange={(e) => setdescription(e.target.value)}
          required
       className="form-control  mt-2"
        />
   {flag?  <button  className='btn btn-warning text-light fw-bolder mt-3'  type="submit">Submit</button>:   <button onClick={() => UpdateService()} className='btn btn-warning text-light fw-bolder mt-3 ' type='button'>update service</button>}
       
     
      </form>
      
    </div>
    <div className='    m-5 '>
        <table className="table table-light   ">
    <thead >
      <tr className='mx-auto'  >
        
       
      
        <th scope="col" className=' bg-warning text-white'>Id</th>
        <th scope="col" className=' bg-warning text-white' >service </th>
        <th scope="col "  className=' bg-warning text-white'>Descreption</th>
        <th scope="col "  className=' bg-warning text-white'>Price</th>
        <th scope="col "  className=' bg-warning text-white'>Update</th>
        <th scope="col "  className=' bg-warning text-white'>Delete</th>
  
  
      </tr>
    </thead>
    {vetService?.map(service=>{
    
      return<>
     
     <tbody className='' >
      
     <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
                <td><button onClick={()=>Update(service.id,service.name,service.description,service.price)} className='btn btn-warning text-white'>update</button></td>
                <td><button onClick={()=>ignoreService(service.id)} className='btn btn-danger text-white'>Delete</button></td>
              </tr>
    
   
    </tbody>
              
      
      </>
      
  })}
    
  </table>
        </div>
  
    </>
  );
}