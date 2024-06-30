import axios from 'axios'
import * as Yup from "yup"
import React, { useContext, useState } from 'react'
import { useFormik , ErrorMessage } from 'formik'
import "../../style.css"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { idContext } from '../../context/IdContext/IdContext'
export default function SignIn() {
  
  let navigate=useNavigate()
  const[errorMsg,setErrorMsg]=useState('')
  const[loading,setLoading]=useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const{userId,setUserId}=useContext(idContext)
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    function validationSchema(){
        let schema=new Yup.object({
         
        Email:Yup.string().email('the email is invalid').required()
        // .test("Email","This email has already been registered")
        ,
        Password:Yup.string()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,'Invalid Password.').required(),
       
        
    })
    return schema
    }
    let signin=useFormik({
            
            initialValues:{
          
            Email:'',
            Password:'',
           

        },
        validationSchema,
        onSubmit: async (values)=>{
      setLoading(true)

          const formData = new FormData();
        
          formData.append('Email', values.Email);
          formData.append('Password', values.Password);
          
          try {
            setLoading(true)
            const response = await axios.post('http://fluffypet.runasp.net/Login', formData);
            console.log('res',response)
            if(response.data.message=="Success"){
              localStorage.setItem('tkn',response.data.token)
              setUserId(response.data.id)
              navigate('/home')
            }
            console.log('Form data submitted successfully:', response.data);
            // Handle successful response
          } catch (error) {
            setErrorMsg(error.response.data)
            console.error('Form data submission failed:', error);
            // Handle error response
      setLoading(false)

          }
        
          // sendDataToApi(values)
         console.log(values)
        }
    })
    console.log('dirty:',signin.dirty)
  console.log('isValid:', signin.isValid)
  
  return (
    <>

<div className="container div1 ">
            <div className="row  rowgap">
                <div className="col-md-5 ">
                    <div className='image'>
                    <div className='column-2  '>
                    <img className='img' src='https://cdn.builder.io/api/v1/image/assets/TEMP/80697d3cc2f7e974b9b5e552191d0b4124628549bf94f38f17e37f69a60374ee?apiKey=e0cc20aac9224525bd5bb3c74a1747db&'/>
                    </div>
                    <h1 className='div-5'>fluffy pets</h1>
                   
                 <p className='div-6'>On this site you can buy your pet and you can also <br/> learn everything related to treatment and products <br/> for your animal</p>
                    </div>
                </div>
                <div className="col-md-5">
                <div className='div-7'>
                  <h1 className='welcome'>Welcome back</h1>
        <h2 className='div-8'>sign in</h2>
        <form onSubmit={signin.handleSubmit}>
              
              <div className="input-container">
             <label htmlFor="Email">E-mail:</label>
            <input type='email'name='Email' placeholder='enter email' id='Email' autoComplete="username" className='form-control py-3 my-3 div-13 input' onChange={signin.handleChange} onBlur={signin.handleBlur}/>
            <span className="icon-container"><i className="fa-solid fa-envelope"></i></span>
            </div>
            {signin.errors.Email&&signin.touched.Email?<div className='alert alert-danger'>{signin.errors.Email}</div>:''}

             <div className="input-container  ">
             <label htmlFor="Password">Password:</label>
            <input  type={passwordVisible ? 'text' : 'password'} name='Password' autoComplete="current-password" placeholder='enter password' id='Password' className='form-control py-3 my-3 div-13 input' onChange={signin.handleChange} onBlur={signin.handleBlur}/>
            <span className="icon-container" onClick={togglePasswordVisibility}>
                {passwordVisible ? <i className="fa-solid fa-eye"></i> :<i className="fa-solid fa-eye-slash "></i>  }
            </span>            
             </div>
            {signin.errors.Password&&signin.touched.Password?<div className='alert alert-danger '>{signin.errors.Password}</div>:''}
            
            {errorMsg?<h3 className='color '>{errorMsg}</h3>:''}

            
          <button disabled={!(signin.dirty&&signin.isValid)} type='submit' className='btn btn-warning py-3 w-100  '>
            {loading? <i className='fa fa-spinner fa-spin'></i>:<h5  className=' text-white'>sign in</h5>}
          </button>
          <div className=' text-center'> 
          <Link className='div-16 linkNoLine' to='/forgotPassword'>forgotten password?</Link>
            
          </div>
         
          <div className='rowgap  '>
            <div className='impty w-40 my-4'></div>
            <h3 className='or py-1'>or</h3>
            <div className='impty w-40 my-4'></div>
          </div>
          
          
        
             <div className='d-flex justify-content-center'>
          <button   className='btn div-17 py-3 my-3 ' onClick={ ()=>navigate('/role')} > {loading? <i className='fa fa-spinner fa-spin'></i>:'create new account'}</button>
           
          </div> 
        </form>
        </div>
        </div>
        </div>
      </div>
    </>
  )
}


// import axios from 'axios'
// import * as Yup from "yup"
// import React, { useState,useRef, useEffect, useContext } from 'react'
// import 'react-phone-number-input/style.css'
// import { useFormik , Field, Form, ErrorMessage } from 'formik'
// import "../../style.css"
// import { useNavigate } from 'react-router-dom'
// import { idContext } from '../../context/IdContext/IdContext'
// export default function SignUp() {
//   let navigate=useNavigate()
//    const[errorMsg,setErrorMsg]=useState('')
//    const[loading,setLoading]=useState(false)    
//    const [passwordVisible, setPasswordVisible] = useState(false);
//    const togglePasswordVisibility = () => {
//       setPasswordVisible(!passwordVisible);
//     };

//     function validationSchema(){
//         let schema=new Yup.object({
//         Email:Yup.string().email().required(),
//         Password:Yup.string()
//         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,'min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit,at least one special char.').required(),
      
//     })
//     return schema
//     }
//     let register=useFormik({
            
//             initialValues:{
          
//             Email:'',
//             Password:'',
          
//         },
//         validationSchema,
//         onSubmit: async (values)=>{
//           const formData = new FormData();
//           formData.append('Email', values.Email);
//           formData.append('Password', values.Password);
         
//           try {
//             setLoading(true)
//             const response = await axios.post('http://fluffypet.runasp.net/Login', formData);
//             console.log('Form data submitted successfully:', response.data);
//             if(response.data.message=="Success"){  
//               localStorage.setItem('tkn',response.data.token)           
//             navigate('/home')
//             }
//           } catch (error) {
//             setErrorMsg(error.response.data)
//             console.error('Form data submission failed:', error);
//             setLoading(false)
//           }
//          console.log(values)
//         }
//     })
//     console.log('dirty:',register.dirty)
//   console.log('isValid:', register.isValid)
 
 
//   return (
//     <>
//       <div className="w-100 m-auto  div"> 
//       .
//         <div className='w-50 m-auto div-7 my-3'>
//         <h1 className='register'>Register Now:</h1>

//         <form onSubmit={register.handleSubmit}>

// <div >
// <label htmlFor="Email" className='text-white lable'>E-mail</label>
// <input type='email'name='Email' placeholder='enter email' id='Email' className='form-control py-2 my-2' onChange={register.handleChange} onBlur={register.handleBlur}/>
// {register.errors.Email&&register.touched.Email?<div className='alert alert-danger'>{register.errors.Email}</div>:''}
// </div>

// <div className="input-container ">
// <label htmlFor="Password" className='text-white lable'>Password</label>
// <input type={passwordVisible ? 'text' : 'password'} name='Password' autoComplete="new-password" placeholder='enter password' id='Password' className='form-control py-2 my-2' onChange={register.handleChange} onBlur={register.handleBlur}/>
// <span className="password-container" onClick={togglePasswordVisibility}>
//      {passwordVisible ? <i className="fa-solid fa-eye"></i> :<i className="fa-solid fa-eye-slash "></i>  }
// </span> 
// </div>
// {register.errors.Password&&register.touched.Password?<div className='alert alert-danger'>{register.errors.Password}</div>:''}


// {errorMsg?<div className='alert alert-danger'>{errorMsg}</div>:''}

// <button  disabled={!(register.dirty&&register.isValid)} type='submit' className='btn btn-warning main-btn text-white '>
// {loading? <i className='fa fa-spinner fa-spin'></i>:'sign up'}
// </button>
// </form>
//         </div>
//        .
//       </div>
//     </>
//   )
// }
