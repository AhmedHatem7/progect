import React, { useCallback, useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useQuery } from 'react-query'
import { FallingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'

export default function Order() {
   
    let navigate=useNavigate()
    const[errorMsg,setErrorMsg]=useState('')
    const[loading,setLoading]=useState(false)
    const token=localStorage.getItem('tkn')
    const [governorates, setGovernorates] = useState([]);
    const [areas, setAreas] = useState([]);
    const{cartId,userCart}=useContext(cartContext)

    function getDeliveryMethods(){
        return axios.get('http://fluffypet.runasp.net/api/Cart/GetAllDeliveryMethod',{
         headers:{
             Authorization:`Bearer ${token}`
         }
        })
     }
     const{data,isLoading}=useQuery('getDeliveryMethods',getDeliveryMethods)
     console.log('methods',data?.data) 

     useEffect(() => {
        fetchGovernorates();
      }, []);
    
      const fetchGovernorates = async () => {
        try {
          const response = await axios.get('http://fluffypet.runasp.net/api/GovernorateArea/All-Governorates');
          setGovernorates(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
        }
      };
    
      const fetchAreasByGovernorate = async (governorateId) => {
        try {
          const response = await axios.get(`http://fluffypet.runasp.net/api/GovernorateArea/Get-Areas-By-${governorateId}`);
          setAreas(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
        }
      };


       function sendOrder(values){
        setLoading(true)
      axios.post('http://fluffypet.runasp.net/api/Orders/create-order',values).then(({res}) => {
         console.log(res)
       }).catch((error)=>{
        setErrorMsg(error.res?.data.message)
        setLoading(false)
        
       })
      }
    function validationSchema(){
      let schema = new Yup.object().shape({
        shipToAddress:Yup.object().shape({
            firstName:Yup.string().min(2,"minimum 2 characters").max(13,"maximum 13 characters").required(),
            lastName:Yup.string().min(2,"minimum 2 characters").max(13,"maximum 13 characters").required(),
            address:Yup.string().min(5).required(),
        })

       
      })
      return schema
    }
    let order=useFormik({
      initialValues:{
        deliveryMethodId:'',
        firstName:'',
        lastName:'',
        GovernorateId:'',
        AreaId:'',
        address:'',
      },
       validationSchema ,
      onSubmit:(values)=>{
     console.log(values)
     sendOrder(values)
      }
    })
    console.log('dirty:',order.dirty)
    console.log('isValid:', order.isValid)


    // if(isLoading){
    //     return <div className='d-flex vh-100  bg-opacity-50 justify-content-center align-items-center' >
    //     <FallingLines
    //               color="#F9BA1D"
    //               width="100"
    //               visible={true}
    //               ariaLabel="falling-circles-loading"
    //          />
    //       </div>
    //    }
  return <>
      <div  className="w-50 shadow p-3 mb-5  rounded m-auto">
      
            
            <h3 className=' text-center adding py-1'>order   </h3>
            
         
        <form onSubmit={order.handleSubmit}>
        {/* <div className="form__group field">
    <input type="input" className="form__field" placeholder="Name" required=""/>
    <label htmlFor="name" className="form__label ">Name :</label>
</div> */}

          <label className=' lable' htmlFor="firstName">firstName: </label>
          <input type='text' name='firstName' id='firstName' className='form-control py-2 my-3' placeholder='enter firstName' onChange={order.handleChange} onBlur={order.handleBlur}/>
         {order.errors.firstName&&order.touched.firstName?<div className='alert alert-danger'>{order.errors.firstName}</div>:''}


          <label className=' lable' htmlFor="lastName">lastName: </label>
          <input type='text' name='lastName' id='lastName' className='form-control py-2 my-3' placeholder='enter lastName' onChange={order.handleChange} onBlur={order.handleBlur}/>
          {order.errors.lastName&&order.touched.lastName?<div className='alert alert-danger'>{order.errors.lastName}</div>:''}

           
         <div onChange={order.handleChange}>
          <label className=' lable' htmlFor="GovernorateId">Governorate</label>
          <select id='GovernorateId' className="form-select py-2 my-2" aria-label="Default select example" name="GovernorateId"   onBlur={order.handleBlur}  onChange={(event) => {
          const selectedGovernorateId = event.target.value;
          fetchAreasByGovernorate(selectedGovernorateId);
          }}>
         <option value="" >Select a governorate</option>
         {governorates.map((GovernorateId) => (
         <option key={GovernorateId.id} value={GovernorateId.id}>
         {GovernorateId.name}
          </option>
          ))}
        </select>
     {order.errors.GovernorateId&&order.touched.GovernorateId?<div className='alert alert-danger'>{order.errors.GovernorateId}</div>:''}
       </div>

<div>
 <label className=' lable' htmlFor="AreaId">Area</label>
 <select id='AreaId' className="form-select py-2 my-2 "   aria-label="Default select example"  name="AreaId" onBlur={order.handleBlur}  onChange={order.handleChange}>
   <option value="" >Select an area</option>
   {areas.map((AreaId) => (
     <option key={AreaId.id} value={AreaId.id}>
       {AreaId.name}
     </option>
   ))}
 </select>
 {order.errors.AreaId&&order.touched.AreaId?<div className='alert alert-danger'>{order.errors.AreaId}</div>:''}
</div>

          <label className=' lable' htmlFor="address">address: </label>
          <input type='text' name='address' id='address' className='form-control py-2 my-3' placeholder='enter address' onChange={order.handleChange} onBlur={order.handleBlur}/>
           {order.errors.address&&order.touched.address?<div className='alert alert-danger'>{order.errors.address}</div>:''}

         
           <div>
      <h3>Choose a delivery method:</h3>
      <ul >
        {data?.data.map((delivery, index) => (
          <li key={index} className='d-flex justify-content-between'>
            
            <input className="form-check-input"
              type="radio"
              name="deliveryMethodId"
              value={delivery.id}
              onChange={order.handleChange}
              onBlur={order.handleBlur}
            />
            <span>
            {delivery.name}
            </span>
            <span>
               : 
            </span>
            <span>
            {delivery.price} Egp
            </span>
            <span>
            ({delivery.estimatedDeliveryTime})
            </span>
         
          </li>
        ))}
        </ul>
        
      
      
    </div>

       {errorMsg?<div className='alert alert-danger'>{errorMsg}</div>:''}
      
         
          <button disabled={!(order.dirty&&order.isValid)} type='submit' className='btn bg-main text-white '>
            {loading? <i className='fa fa-spinner fa-spin'></i>:'send'}
          </button>
        </form>
      </div>
     
     
    </>
  
}
