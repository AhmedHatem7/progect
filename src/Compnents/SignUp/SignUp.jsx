import axios from 'axios'
import * as Yup from "yup"
import React, { useState,useRef, useEffect, useContext } from 'react'
import 'react-phone-number-input/style.css'
import { useFormik , Field, Form, ErrorMessage } from 'formik'
import "../../style.css"
import { useNavigate } from 'react-router-dom'
import { idContext } from '../../context/IdContext/IdContext'
export default function SignUp() {
  let navigate=useNavigate()
    const [value, setValue] = useState()
   const[errorMsg,setErrorMsg]=useState('')
   const[loading,setLoading]=useState(false)
    const [file, setFile] = useState();

    const [governorates, setGovernorates] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const  {userId, setUserId} = useContext(idContext)
    
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const togglePasswordVisibility2 = () => {
      setPasswordVisible2(!passwordVisible2);
    };
      // const handleFileChange = (event) => {
      //   setSelectedFile(event.target.files[0]);
      // };
    
    
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
  
   
    const [filee, setFilee] = useState();
    function handleChangee(e) {
        console.log(e.target.files);
        setFilee(URL.createObjectURL(e.target.files[0]));
    }

    function validationSchema(){
        let schema=new Yup.object({
          
          PhotoUrl: Yup.mixed().required('Photo is required'),
          ImageIDCard: Yup.mixed().required('Photo is required'),
            FirstName:Yup.string().min(2,"minimum 2 characters").max(13,"maximum 13 characters").required(),
            LastName:Yup.string().min(2,"minimum 2 characters").max(13,"maximum 13 characters").required(),
            UserName:Yup.string().min(5,"minimum 5 characters")
            .max(15,"maximum 15 characters") .matches(/^(?=.*[_-])(?=.*[0-9].*[0-9].*[0-9]).*$/, 'Username must have at least one underscore or dash and three numbers').required("You must enter a username")
            // .test("Unique", "This username has already been taken",(values) => {
            //   return duplicateNameCheck(fabricTypeList, values);
            // }
            // )
            ,
        Email:Yup.string().email().required()
        // .test("Email","This email has already been registered")
        ,
        Password:Yup.string()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,'min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit,at least one special char.').required(),
        ConfirmPassword:Yup.string().oneOf([Yup.ref("Password")]).required(),
       
        
        Address:Yup.string().min(5).required(),
        PhoneNumber:Yup.string()
        .matches(/^((\\+[1-12]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/).required(),
        
    })
    return schema
    }
    let register=useFormik({
            
            initialValues:{
            PhotoUrl:null,
            ImageIDCard:null,
            FirstName:'',
            LastName:'',
            UserName:'',
            Email:'',
            Password:'',
            ConfirmPassword:'',
            GovernorateId: '',
            AreaId: '',
            Address:'',
            PhoneNumber:'',
           

        },
        validationSchema,
        onSubmit: async (values)=>{
          const formData = new FormData();
          formData.append('PhotoUrl', values.PhotoUrl);
          formData.append('ImageIDCard', values.ImageIDCard);
          formData.append('FirstName', values.FirstName);
          formData.append('LastName', values.LastName);
          formData.append('UserName', values.UserName);
          formData.append('Email', values.Email);
          formData.append('Password', values.Password);
          formData.append('GovernorateId', values.GovernorateId);
          formData.append('AreaId', values.AreaId);
          formData.append('ConfirmPassword', values.ConfirmPassword);
          formData.append('Address', values.Address);
          formData.append('PhoneNumber', values.PhoneNumber);
          try {
            setLoading(true)
            const response = await axios.post('http://fluffypet.runasp.net/Register-As-User', formData);
            console.log('Form data submitted successfully:', response.data);
            if(response.data.message=='Please Look in your email box'){
              setUserId(response.data.id)
             localStorage.setItem('tkn',response.data.token)
            navigate('/home')
            }
          } catch (error) {
            setErrorMsg(error.response.data)
            console.error('Form data submission failed:', error);
            setLoading(false)
          }
         console.log(values)
         console.log(userId)
        }
    })
    console.log('dirty:',register.dirty)
  console.log('isValid:', register.isValid)
 
  const handleFileChange = (event) => {
    register.setFieldValue('PhotoUrl', event.currentTarget.files[0]);
  };
  return (
    <>




      <div className="w-100 m-auto  div"> 
      .
        <div className='w-50 m-auto div-7 my-3'>
        <h1 className='register'>Register Now:</h1>

        <form onSubmit={register.handleSubmit}>

        
{/* <PhotoInput name="PhotoUrl"/> */}


{/* <div className="mb-3 lablestyle">

<label htmlFor="PhotoUrl" className="form-label text-white  lable ">
 
   photo</label>
<input  className="form-control inputstyle " name='PhotoUrl' type="file" id="PhotoUrl" onChange={(event) => {
register.setFieldValue('PhotoUrl', event.currentTarget.files[0]);
}} onBlur={register.handleBlur}  /> 


<img src={file} />
{register.errors.PhotoUrl&&register.touched.PhotoUrl?<div className='alert alert-danger'>{register.errors.PhotoUrl}</div>:''}
</div> */}
     <div className="photo-input-container">
              <label htmlFor="PhotoUrl" className="photo-input-label">
                
              {register.values.PhotoUrl ? (
                
              <img
               src={URL.createObjectURL(register.values.PhotoUrl)}
               alt="Selected Photo"
               className="selected-photo"
               />
              ) : (
                <span className="choose-photo-text ">
                   <div className='camera'><i className="fa-solid fa-image"></i> </div> 
                  Your Photo</span>
                  )}
            </label>
            <input
               name='PhotoUrl'
               id="PhotoUrl"
               type="file"
               accept="image/*"
               onChange={handleFileChange}
               onBlur={register.handleBlur}
               className="photo-input"
            />
           {register.errors.PhotoUrl&&register.touched.PhotoUrl?<div className='alert alert-danger'>{register.errors.PhotoUrl}</div>:''}

    </div>

    {/* <div className="form__group field">
    <input type="input" className="form__field" placeholder="Name" required=""/>
    <label htmlFor="name" className="form__label ">Name</label>
</div> */}


<div >
<label  htmlFor="FirstName" className='text-white lable'>First Name</label>
<input type='text'name='FirstName' placeholder='enter your first name' id='FirstName' className='form-control py-2 my-2' onChange={register.handleChange} onBlur={register.handleBlur} required=""/>
{register.errors.FirstName&&register.touched.FirstName?<div className='alert alert-danger'>{register.errors.FirstName}</div>:''}
 </div>

 <div>
<label htmlFor="LastName" className='text-white lable'>Last Name</label>
<input type='text'name='LastName' placeholder='enter your last name' id='LastName' className='form-control py-2 my-2' onChange={register.handleChange} onBlur={register.handleBlur} />
{register.errors.LastName&&register.touched.LastName?<div className='alert alert-danger'>{register.errors.LastName}</div>:''}
</div>

<div>
<label htmlFor="UserName" className='text-white lable'>User Name</label>
<input type='text'name='UserName' autoComplete="username" placeholder='enter username' id='UserName' className='form-control py-2 my-2' onChange={register.handleChange} onBlur={register.handleBlur}/>
{register.errors.UserName&&register.touched.UserName?<div className='alert alert-danger'>{register.errors.UserName}</div>:''}
</div>

<div >
<label htmlFor="Email" className='text-white lable'>E-mail</label>
<input type='email'name='Email' placeholder='enter email' id='Email' className='form-control py-2 my-2' onChange={register.handleChange} onBlur={register.handleBlur}/>
{register.errors.Email&&register.touched.Email?<div className='alert alert-danger'>{register.errors.Email}</div>:''}
</div>

<div className="input-container ">
<label htmlFor="Password" className='text-white lable'>Password</label>
<input type={passwordVisible ? 'text' : 'password'} name='Password' autoComplete="new-password" placeholder='enter password' id='Password' className='form-control py-2 my-2' onChange={register.handleChange} onBlur={register.handleBlur}/>
<span className="password-container" onClick={togglePasswordVisibility}>
     {passwordVisible ? <i className="fa-solid fa-eye"></i> :<i className="fa-solid fa-eye-slash "></i>  }
</span> 
</div>
{register.errors.Password&&register.touched.Password?<div className='alert alert-danger'>{register.errors.Password}</div>:''}

<div className="input-container ">
<label htmlFor="ConfirmPassword" className='text-white lable'>RePassword</label>
<input type={passwordVisible2 ? 'text' : 'password'} name='ConfirmPassword' autoComplete="new-password" placeholder='enter rePassword' id='ConfirmPassword' className='form-control py-2 my-2' onChange={register.handleChange} onBlur={register.handleBlur}/>
<span className="password-container" onClick={togglePasswordVisibility2}>
     {passwordVisible2 ? <i className="fa-solid fa-eye"></i> :<i className="fa-solid fa-eye-slash "></i>  }
</span> 
</div>
{register.errors.ConfirmPassword&&register.touched.ConfirmPassword?<div className='alert alert-danger'>{register.errors.ConfirmPassword}</div>:''}

<div onChange={register.handleChange}>
 <label className='text-white lable' htmlFor="GovernorateId">Governorate</label>
 <select id='GovernorateId' className="form-select py-2 my-2" aria-label="Default select example" name="GovernorateId"   onBlur={register.handleBlur}  onChange={(event) => {
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
 {register.errors.GovernorateId&&register.touched.GovernorateId?<div className='alert alert-danger'>{register.errors.GovernorateId}</div>:''}
</div>

<div>
 <label className='text-white lable' htmlFor="AreaId">Area</label>
 <select id='AreaId' className="form-select py-2 my-2 "   aria-label="Default select example"  name="AreaId" onBlur={register.handleBlur}  onChange={register.handleChange}>
   <option value="" >Select an area</option>
   {areas.map((AreaId) => (
     <option key={AreaId.id} value={AreaId.id}>
       {AreaId.name}
     </option>
   ))}
 </select>
 {register.errors.AreaId&&register.touched.AreaId?<div className='alert alert-danger'>{register.errors.AreaId}</div>:''}
</div>


<div>
<label htmlFor="Address" className='text-white lable'>Address</label>
<input type='text'name='Address' placeholder='enter your Address '  id='Address' className='form-control py-2 my-2' onChange={register.handleChange} onBlur={register.handleBlur}/>
{register.errors.Address&&register.touched.Address?<div className='alert alert-danger'>{register.errors.Address}</div>:''}
</div>

<div>
<label htmlFor="PhoneNumber" className='text-white lable'>Phone Number</label>
<input type='text'name='PhoneNumber' placeholder='enter your Phone Number' id='PhoneNumber' className='form-control py-2 my-2' onChange={register.handleChange} onBlur={register.handleBlur}/>
{register.errors.PhoneNumber&&register.touched.PhoneNumber?<div className='alert alert-danger'>{register.errors.PhoneNumber}</div>:''}

</div>

<div className="mb-1">
<label htmlFor="ImageIDCard" className="form-label text-white lable">ID Photo</label>
<input className="form-control" name='ImageIDCard' type="file" id="ImageIDCard" onChange={(event) => {
register.setFieldValue('ImageIDCard', event.currentTarget.files[0]);
}} onBlur={register.handleBlur}/>
<img src={filee} />
{register.errors.ImageIDCard&&register.touched.ImageIDCard?<div className='alert alert-danger'>{register.errors.ImageIDCard}</div>:''}
</div>


{/* <div className="">
<label htmlFor="PhotoUrl" className="form-label text-white lable">Your Photo</label>
<input className="form-control" name='PhotoUrl' type="file" id="PhotoUrl" onChange={(event) => {
register.setFieldValue('PhotoUrl', event.currentTarget.files[0]);
}} onBlur={register.handleBlur}/>
<img src={filee} />
{register.errors.PhotoUrl&&register.touched.PhotoUrl?<div className='alert alert-danger'>{register.errors.PhotoUrl}</div>:''}
</div> */}





{/* <PhoneInput className='w-50'
placeholder="Enter phone number"
value={value}
onChange={setValue}/>

<button className='btn btn-danger ' type='submit'>click</button> */}

{errorMsg?<div className='alert alert-danger'>{errorMsg}</div>:''}

<button  disabled={!(register.dirty&&register.isValid)} type='submit' className='btn btn-warning main-btn text-white '>
{loading? <i className='fa fa-spinner fa-spin'></i>:'sign up'}
</button>
</form>
        </div>
       .
      </div>
    </>
  )
}
