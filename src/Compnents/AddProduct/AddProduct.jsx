import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import axios from 'axios'
import { useFormik } from 'formik'

export default function AddPet() {
  const token=localStorage.getItem('tkn')
   let navigate=useNavigate()
   const[errorMsg,setErrorMsg]=useState('')
   const[loading,setLoading]=useState(false)
   const [categories, setCategories] = useState([]);
   
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

useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://fluffypet.runasp.net/api/Categories/Get_All_Categories');
      setCategories(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

   function validationSchema(){
    let schema=new Yup.object({
      
      Images:  Yup.array().of(
        Yup.object().shape({
        imageUrl: Yup.mixed().test('fileType', 'Invalid file format', (value) => {
          if (!value) return true; // Skip validation if no file is selected
          
          const supportedFormats = /(jpg|jpeg|png)$/;
          return supportedFormats.test(value.type);
        }),
        })
        ).required('Images are required'), 
      Description:Yup.string().min(20,"minimum 20 characters").required('pet description is required'),
      Name:Yup.string().min(4,"minimum 4 characters").required('pet title is required'),
      Price:Yup.number().required('price is required'),

})

return schema
}
let adding=useFormik({
        
        initialValues:{
            CategoryId:'',
            Images:[
              {imageUrl:''},
            ],
            Description:'',
            Name:'',
            Price:'',
      
    },
    validationSchema,
    onSubmit: async (values)=>{
      const formData = new FormData();
      formData.append('VaccinationCertificate', values.VaccinationCertificate);
      values.Images.forEach((imageObj) => {
        formData.append('images', imageObj.imageUrl);
      });
      formData.append('CategoryId', values.CategoryId);
      formData.append('Description', values.Description);
      formData.append('Name', values.Name);
      formData.append('Price', values.Price);
      try {
        setLoading(true)
        const response = await axios.post('http://fluffypet.runasp.net/api/Products/Add_New_Product', formData,{
          headers:{
            'Authorization': `Bearer ${token}`  
          }
        });
        console.log('Form data submitted successfully:', response.data);
       
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
      

        <div className='w-50 shadow p-3 mb-5  rounded m-auto'>
        <h1 className='text-center adding my-2'>Add a product</h1>
 
        <form onSubmit={adding.handleSubmit}>


<div className='my-1'>
  <h4 className=' my-3'>Add one or more Pictures of your product</h4>
  {adding.values.Images.map((imageObj, index) => (
        <div key={index} className="photo-input-container"
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
                product Photo</div>
                  )}
            </label>
          <input
          className="photo-input"
          id={`Images[${index}].imageUrl`}
            type="file"
            name={`Images[${index}].imageUrl`}
            onChange={(event) => adding.setFieldValue(`Images[${index}].imageUrl`, event.target.files[0])}
          />
           <button className='btn btn-outline-danger my-2 lable' type="button" onClick={() => handleRemoveImage(index)}>
           <i className="fa-solid fa-trash mx-1"></i>
            Remove
          </button>
          {adding.errors.Images && adding.errors.Images[index] && (
            <div style={{ color: 'red' }}>{adding.errors.Images[index].imageUrl}</div>
          )}
        </div>
      ))}
      <div className='addbox'>
      <button className='btn btn-warning main-btn text-white' type="button" onClick={handleAddImage}>
        Add Image
      </button> 
      </div>
 
</div>

<div onChange={adding.handleChange}>
 <label className=' lable' htmlFor="CategoryId">Category</label>
 <select id='CategoryId' className="form-select py-2 my-2" aria-label="Default select example" name="CategoryId"   onBlur={adding.handleBlur}  onChange={(event) => {
   const selectedCategoryId = event.target.value;
 }}>
   <option value="" >Select a category</option>
   {categories.map((CategoryId) => (
     
     <option key={CategoryId.id} value={CategoryId.id}>
       {CategoryId.name}
     </option>
   ))}
 </select>
 {adding.errors.CategoryId&&adding.touched.CategoryId?<div className='alert alert-danger'>{adding.errors.CategoryId}</div>:''}
</div>

<div>
<label htmlFor="Name" className=' lable'>Name</label>
<input type='text'name='Name' autoComplete="Name" placeholder='enter Name' id='Name' className='form-control py-2 my-2' onChange={adding.handleChange} onBlur={adding.handleBlur}/>
{adding.errors.Name&&adding.touched.Name?<div className='alert alert-danger'>{adding.errors.Name}</div>:''}
</div>

<div>
<label htmlFor="Description" className=' lable'>Description</label>
<textarea type='text'name='Description' autoComplete="Description" placeholder='enter Description' id='Description' className='form-control py-2 my-2' onChange={adding.handleChange} onBlur={adding.handleBlur}/>
{adding.errors.Description&&adding.touched.Description?<div className='alert alert-danger'>{adding.errors.Description}</div>:''}
</div>

<div>
<label htmlFor="Price" className=' lable'>Price</label>
<input type='number'name='Price' autoComplete="Price" placeholder='enter Price' id='Price' className='form-control py-2 my-2' onChange={adding.handleChange} onBlur={adding.handleBlur}/>
{adding.errors.Price&&adding.touched.Price?<div className='alert alert-danger'>{adding.errors.Price}</div>:''}
</div>


 


{errorMsg?<div className='alert alert-danger'>{errorMsg}</div>:''}

<button  disabled={!(adding.dirty&&adding.isValid)} type='submit' className='btn btn-warning main-btn text-white '>
{loading? <i className='fa fa-spinner fa-spin'></i>:'Add product'}
</button>
</form>
        </div>
       
    </>
  
}


