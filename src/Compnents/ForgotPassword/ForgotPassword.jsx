// import axios from 'axios';
// import { useFormik } from 'formik';
// import React, { useState } from 'react'
// import style from "./forgotStyle.module.css"
// import * as Yup from "yup"
// export default function ForgotPassword() {
//     const[errorMsg,setErrorMsg]=useState('')
//    const[loading,setLoading]=useState(false)

//     async function sendDataToApi(values){
//         try {
//             setLoading(true)
//         const response= await axios.post('http://fluffypet.somee.com/Forget-Passward',values)
//         console.log(response.data)
//         }catch (error) {
//             console.log( error);
//             setErrorMsg(error.response.data)
//             setLoading(false)           
//           }
//           console.log(values)
//     }
//     function validationSchema(){
//         let schema=new Yup.object({
//             Email:Yup.string().email().required()
//         })
//     return schema;
//     }
//     let forgot=useFormik({
//         initialValues:{
//             email:''
//         },
//         validationSchema ,
//     onSubmit:(values)=>{
//    console.log(values)
//    sendDataToApi(values)
//     }
//     })
//   return (
//     <>
       
//              <div className={style.box}>
//                 .
//              <div className={`w-50   ${style.innerBox} m-auto my-5 p-5 `}>
                
//                 <div className={style.imagecolumn }>
//                   <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bbceab33d20c87270164a5c7acd868b7ce38ec1d32e1463fdc2f4e46d5532fd?apiKey=e0cc20aac9224525bd5bb3c74a1747db&" alt="Forgot password illustration" className={style.forgotpasswordimage} />
//                 </div>

//                 <div>
//                 <h1 className={style.forgotpasswordtitle}>Forgot Password</h1>
//             <p className={style.forgotpassworddescription}>
//               Enter your email and we will send you a link to reset your password
//             </p>
//             <div className={style.emailinputcontainer}>
//               <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2d96679163fa5477192e14cce54a340634c7821484ff874dbf690e11b24e305?apiKey=e0cc20aac9224525bd5bb3c74a1747db&" alt="" className={style.emailicon} />
//               <input type="email" name='email' id="email" className={`${style.emailinput} form-control`} placeholder="Email address" onChange={forgot.handleChange} />
//             </div>
//             {errorMsg?<div className='alert alert-danger'>{errorMsg}</div>:''}
//             <div className='d-flex justify-content-center'>
//             <button disabled={!(forgot.dirty&&forgot.isValid)} type="submit"  className={style.submitbutton} onSubmit={forgot.handleSubmit} >
                
//             {loading? <i className='fa fa-spinner fa-spin'></i>:'submit'}
//                 </button>
//             </div>
//              </div>
//              </div>
//              </div>
//     </>
//   )
// }

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const ForgetPassword = () => {
  const[loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const[errorMsg,setErrorMsg]=useState('')
  function validationSchema(){
    let schema=new Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),

    })
    return schema;
  }
  

  // const handleSubmit = (values) => {
  //   axios
  //     .post('http://fluffypet.somee.com/Forget-Passward', values)
  //     .then((response) => {
  //     console.log(response.data)
  //       navigate('/resetPassword');
  //     })
  //     .catch((error) => {
  //     console.log(error)
  //     });
  // };

  const forgot = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: async (values)=>{
      const formData = new FormData();
      formData.append('email', values.email);
      try {
        setLoading(true)
        const response = await axios.post('http://fluffypet.somee.com/Forget-Passward', formData);
        console.log('Form data submitted successfully:', response.data);
      } catch (error) {
        setErrorMsg(error.response.data)
        console.error('Form data submission failed:', error);
        setLoading(false)
      }
     console.log(values)
    }
});
 console.log('dirty:',forgot.dirty)
  console.log('isValid:', forgot.isValid)


  return (
    <div>

      <h1>Forget Password</h1>
      <form onSubmit={forgot.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={forgot.handleChange}
          value={forgot.values.email}
        />
        {forgot.errors.email && <div id="feedback">{forgot.errors.email}</div>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgetPassword;