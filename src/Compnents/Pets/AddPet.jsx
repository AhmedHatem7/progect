import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'


export default function AddPet() {
  const token=localStorage.getItem('tkn')
   let navigate=useNavigate()
   const[errorMsg,setErrorMsg]=useState('')
   const[loading,setLoading]=useState(false)
   const[adoptedShow,setAdoptedShow]=useState(false)
   const[IsVaccinated,setIsVaccinated]=useState(false)

   //img under file1
const [filee, setFilee] = useState();
function handlimge1Change(e) {
    console.log(e.target.files);
    setFilee(URL.createObjectURL(e.target.files[0]));
}

   //handle array of images
const handleAddImage = () => {
  adding.setFieldValue('Images', [
    ...adding.values.Images,
    { imageUrl: null },
  ]);
};

const handleRemoveImage = (index) => {
  const newImages = [...adding.values.Images];
  newImages.splice(index, 1);
  adding.setFieldValue('Images', newImages);
};
 
const handleFileChange = (event,index) => {
  adding.setFieldValue(`Images[${index}].imageUrl`, event.currentTarget.files[0]);
};

const handleAdopted=()=>{
  setAdoptedShow(true);
}; 
const handleAdoptedHide=()=>{
  setAdoptedShow(false);
}; 

const handleIsVaccinated=()=>{
  setIsVaccinated(true);
};
const handleIsVaccinatedHide=()=>{
  setIsVaccinated(false);
};

   function validationSchema(){
    let schema=new Yup.object({
      
      VaccinationCertificate: Yup.mixed().test('fileType', 'Invalid file format', (value) => {
        if (!value) return true; // Skip validation if no file is selected
        
        const supportedFormats = /(jpg|jpeg|png)$/;
        return supportedFormats.test(value.type);
      }),
      Images:  Yup.array().of(
        Yup.object().shape({
        imageUrl: Yup.mixed().test('fileType', 'Invalid file format', (value) => {
          if (!value) return true; // Skip validation if no file is selected
          
          const supportedFormats = /(jpg|jpeg|png)$/;
          return supportedFormats.test(value.type);
        }),
        })
        ).required('Images are required'), 
      Gender:Yup.number().integer().required('gender is required') ,
      Species:Yup.number().integer().required('species is required') ,
      Age:Yup.string().required('pet age is required '),
      Description:Yup.string().min(20,"minimum 20 characters").required('pet description is required'),
      Title:Yup.string().min(5,"minimum 5 characters").max(30,"maximum 10 characters").required('pet title is required'),
      Price:Yup.number().required('price is required'),
      IsAdopted:Yup.boolean().required('IsVaccinated is required'),
      AdoptionPeriod:Yup.string()
       
})

return schema
}
let adding=useFormik({
        
        initialValues:{
            VaccinationCertificate:null,
            Images:[
              {imageUrl:''},
            ],
            Gender:'',
            Species:'',
            Age:'',
            Description:'',
            Title:'',
            Price:'',
            IsAdopted:'',
            AdoptionPeriod:0
      
    },
    validationSchema,
    onSubmit: async (values)=>{
      const formData = new FormData();
      formData.append('VaccinationCertificate', values.VaccinationCertificate);
      values.Images.forEach((imageObj) => {
        formData.append('images', imageObj.imageUrl);
      });
      formData.append('Gender', values.Gender);
      formData.append('Species', values.Species);
      formData.append('Age', values.Age);
      formData.append('Description', values.Description);
      formData.append('Title', values.Title);
      formData.append('Price', values.Price);
      formData.append('IsAdopted', values.IsAdopted);
      formData.append('AdoptionPeriod', values.AdoptionPeriod);
      try {
        setLoading(true)
        const response = await axios.post('http://fluffypet.runasp.net/api/Pet/Add_New_Pet', formData,{
          headers:{
            'Authorization': `Bearer ${token}`  
          }
        });
        console.log('Form data submitted successfully:', response);
        if(response.statusText == "OK"){
          
          toast.success('Your Pet Added successfully.',{position:'top-center'})
        } else{
          toast.error('error occured...',{position:'top-center'})
        }
        setTimeout(()=>{
           navigate('/home')
        },1500)
       
      } catch (error) {
        setErrorMsg(error.response.data)
        console.error('Form data submission failed:', error);
        setLoading(false)
      }
     console.log(values)
    }
})
console.log('dirty:',adding.dirty)
console.log('isValid:', adding.isValid)


  return <>
      
        <div  className="w-50 shadow p-3 mb-5  rounded m-auto">
        <h1 className=' text-center adding py-1'>add a pet   </h1>
        <form onSubmit={adding.handleSubmit}>

{/* 2 */}
<div>
  <h4 className=' my-3'>Add one or more Pictures of your pet</h4>
  {adding.values.Images.map((imageObj, index) => (
        <div key={index} className="photo-input-container"
        // onChange={adding.handleChange}
        onClick={() => document.getElementsByName(`Images[${index}].imageUrl`)[0]}
        > 
           <label htmlFor={`Images[${index}].imageUrl`} className="photo-input-label">
              {imageObj.imageUrl? (
              <img
               src={URL.createObjectURL(imageObj.imageUrl)}
               alt="Selected Photo"
               className="selected-photo"
               />
              ) : (
               
                   <div className="choose-photo-text ">
                <div className='camera'><i className="fa-solid fa-image"></i> </div>  
                  Your pet Photo</div>
                  )}
            </label>
          <input
          className="photo-input"
          id={`Images[${index}].imageUrl`}
            type="file"
            name={`Images[${index}].imageUrl`}
            onChange={(event) => adding.setFieldValue(`Images[${index}].imageUrl`, event.target.files[0])}
          />
           <button className='btn btn-outline-danger my-3' type="button" onClick={() => handleRemoveImage(index)}>
           <i className="fa-solid fa-trash mx-1"></i>
            Remove
          </button>
          {adding.errors.Images && adding.errors.Images[index] && (
            <div style={{ color: 'red' }}>{adding.errors.Images[index].imageUrl}</div>
          )}
        </div>
      ))}
      <div className='addbox'>
      <button className='btn btn-warning main-btn ' type="button" onClick={handleAddImage}>
        Add Image
      </button> 
      </div>
</div>

<div onChange={adding.handleChange} onBlur={adding.handleBlur} className='my-3'>
  <label htmlFor="" className='lable my-2'>Gender</label>
  <div>
  <div className="form-check form-check-inline genderBox  ">
  <input className="form-check-input " value='1' type="radio" name="Gender" id="Gender" />
  <label className="form-check-label " htmlFor="Gender">male</label>
</div>

<div className="form-check form-check-inline genderBox  mx-2 ">
  <input className="form-check-input " value='2' type="radio" name="Gender" id="Gender2" />
  <label className="form-check-label" htmlFor="Gender2">female</label>
</div>
  </div>

</div>
{adding.errors.Gender&&adding.touched.Gender?<div className='alert alert-danger'>{adding.errors.Gender}</div>:''}

<div onChange={adding.handleChange} onBlur={adding.handleBlur} >
  <label htmlFor="" className='lable my-2'>IsAdopted</label>
  <div>
  <div className="form-check form-check-inline genderBox" >
    <div onClick={handleAdopted}>
      <input className="form-check-input " value='true'  type="radio" name="IsAdopted" id="IsAdopted" />
    </div>
  <label className="form-check-label " htmlFor="IsAdopted">yes</label>
</div>

<div className="form-check form-check-inline genderBox  mx-2 ">
  <div onClick={handleAdoptedHide}>
  <input className="form-check-input " value='false' type="radio" name="IsAdopted" id="IsAdopted2" />
   
  </div>
  <label className="form-check-label" htmlFor="IsAdopted2">no</label>
</div>
  </div>

</div>
{adding.errors.IsAdopted&&adding.touched.IsAdopted?<div className='alert alert-danger'>{adding.errors.IsAdopted}</div>:''}

{adoptedShow?<div className='my-2'>
  
  <label htmlFor='AdoptionPeriod' className=' lable' > AdoptionPeriod:</label>
  <input type='text' name='AdoptionPeriod' autoComplete="AdoptionPeriod" placeholder='enter AdoptionPeriod' id='AdoptionPeriod' className='form-control py-2 my-3' onChange={adding.handleChange} onBlur={adding.handleBlur}/>
{adding.errors.AdoptionPeriod&&adding.touched.AdoptionPeriod?<div className='alert alert-danger'>{adding.errors.AdoptionPeriod}</div>:''}
</div>: '' }


<div onChange={adding.handleChange} className='my-2' >
  <label htmlFor="Species" className='my-2 lable'>Species</label>
<select className="form-select" aria-label="Default select example" id='Species' name='Species' onBlur={adding.handleBlur} >
  <option value=''>Open this select menu</option>
  <option value={1}>Dog</option>
  <option value={2}>Cat</option>
  <option value={3}>Bird</option>
  <option value={4}>Fish</option>
  <option value={5}>Rabbit</option>
  <option value={6}>Hamster</option>
  <option value={7}>GuineaPig</option>
  <option value={8}>Reptile</option>
  <option value={9}>Horse</option>
</select>
{adding.errors.Species&&adding.touched.Species?<div className='alert alert-danger'>{adding.errors.Species}</div>:''}

</div>

<div>
<label htmlFor="Age" className=' lable'>Age</label>
<input type='text'name='Age' autoComplete="Age" placeholder='enter Age' id='Age' className='form-control py-2 my-3' onChange={adding.handleChange} onBlur={adding.handleBlur}/>
{adding.errors.Age&&adding.touched.Age?<div className='alert alert-danger'>{adding.errors.Age}</div>:''}
</div>

<div>
<label htmlFor="Title" className=' lable'>Title</label>
<input type='text'name='Title' autoComplete="Title" placeholder='enter Title' id='Title' className='form-control py-2 my-3' onChange={adding.handleChange} onBlur={adding.handleBlur}/>
{adding.errors.Title&&adding.touched.Title?<div className='alert alert-danger'>{adding.errors.Title}</div>:''}
</div>

<div>
  <label htmlFor="Description" className=' lable'>Description</label>
  <textarea type='text'name='Description' autoComplete="Description" placeholder='enter Description' id='Description' className='form-control py-2 my-3' onChange={adding.handleChange} onBlur={adding.handleBlur}/>
  {adding.errors.Description&&adding.touched.Description?<div className='alert alert-danger'>{adding.errors.Description}</div>:''}
 </div>
 {
  <div>
  {adoptedShow ? <label htmlFor="Price" className=' lable'> your budget for breeder</label> : <label htmlFor="Price" className=' lable'>price</label>}
  <input type='number'name='Price'  autoComplete="Price" placeholder='enter Price' id='Price' className='form-control py-2 my-3' onChange={adding.handleChange} onBlur={adding.handleBlur}/>
  {adding.errors.Price&&adding.touched.Price?<div className='alert alert-danger'>{adding.errors.Price}</div>:''}
 </div> 
 }
 

  <div className="mb-1" onChange={handlimge1Change} >
          <label htmlFor="VaccinationCertificate" className="form-label  lable">VaccinationCertificate</label>
         <input className="form-control" name='VaccinationCertificate' type="file" id="VaccinationCertificate" onChange={(event) => {
          adding.setFieldValue('VaccinationCertificate', event.currentTarget.files[0]);
          }} onBlur={adding.handleBlur}/>
          <div >
           <img src={filee} className='w-100' />
            
          </div>
           {adding.errors.VaccinationCertificate&&adding.touched.VaccinationCertificate?<div className='alert alert-danger'>{adding.errors.VaccinationCertificate}</div>:''}
          </div>
 



  
{/* <div className="photo-input-container">
              <label htmlFor="PhotoUrl" className="photo-input-label">
                
              {adding.values.PhotoUrl ? (
                
              <img
               src={URL.createObjectURL(adding.values.PhotoUrl)}
               alt="Selected Photo"
               className="selected-photo"
               />
              ) : (
                <span className="choose-photo-text ">Your Photo</span>
                  )}
            </label>
            <input
               name='PhotoUrl'
               id="PhotoUrl"
               type="file"
               accept="image/*"
               onChange={handleFileChange}
               onBlur={adding.handleBlur}
               className="photo-input"
            />
           {adding.errors.PhotoUrl&&adding.touched.PhotoUrl?<div className='alert alert-danger'>{adding.errors.PhotoUrl}</div>:''}

    </div> */}


{errorMsg?<div className='alert alert-danger'>{errorMsg}</div>:''}
<button  disabled={!(adding.dirty&&adding.isValid||loading)} type='submit' className='btn btn-warning main-btn  '>
{loading? <i className='fa fa-spinner fa-spin'></i>:'Add Pet' }
</button>
</form>
        </div>
     
    </>
  
}


