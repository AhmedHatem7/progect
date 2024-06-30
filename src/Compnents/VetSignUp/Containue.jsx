

import React,{useContext} from 'react'; //ال هستخدمه
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { idContext } from '../../context/IdContext/IdContext';
import { useNavigate } from 'react-router-dom'

export default function Containue() {
  
  let navigate=useNavigate()
  
  const  {Vetid, setVetid} = useContext(idContext)
  
  const initialValues = {
    servicesOffered: [
      { name: '', description: '', price: '' },
  
    ],
    workingHours: [
      {
        weekDay:[],
        startTime: '',
        endTime: '',
      }
    ]
      
  };
  function validationSchema(){
    let schema=new Yup.object().shape({
 
    servicesOffered: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Service name is required'),
        description: Yup.string().required('Service description is required'),
        price: Yup.number()
          .typeError('Price must be a number')
          .positive('Price must be a positive number')
          .required('Price is required'),
      })
    ),
    workingHours: Yup.array().of(
      Yup.object().shape({
      weekDay: Yup.array()
        .of(Yup.number().integer('weekDay must be integers'))
        .required('weekDay are required'),
      startTime: Yup.string().required('Start time is required'),
      endTime: Yup.string().required('End time is required'),
    }),
    
  )
  });
  return schema
  }
  const handleSubmit = async (values) => {
    try {
      const  queryParams= new URLSearchParams({
        vetID:Vetid
      })
      const response =await axios.post(`http://fluffypet.runasp.net/Complete-Data-As-Vet?${queryParams.toString()}`, values);
      console.log('data submitted successfully:',response.data)
     
      formik.resetForm();
    } catch (error) {
      console.error(error);
    }
    console.log(values)
    
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  console.log('dirty:',formik.dirty)
  console.log('isValid:', formik.isValid)
  return (
    <>
    <div className=' div ' >
    
      <form onSubmit={formik.handleSubmit}>
        <div className='container p-4 '>
        <div className='row d-flex justify-content-between gy-3'>
          <div className='col-md-5  '>
              {/* Services */}
         <h5 className='d-flex justify-content-center text'>Service Offered</h5>

        {formik.values.servicesOffered.map((service, index) => (
          
          <div  key={index} > 
            <div className='div-7 '>
            <label className='lable'  htmlFor={`servicesOffered[${index}].name`}>Service Name</label>
            <input className='form-control py-2 my-2' 
              id={`servicesOffered[${index}].name`}
              name={`servicesOffered[${index}].name`}
              type="text"
              value={formik.values.servicesOffered[index].name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} 
              placeholder='Service Name'
            />
            {formik.errors.servicesOffered &&
              formik.errors.servicesOffered[index] &&
              formik.touched.servicesOffered &&
              formik.touched.servicesOffered[index] && (
                <div className='alert alert-danger'>{formik.errors.servicesOffered[index].name}</div>
              )}

            <label className='lable'  htmlFor={`servicesOffered[${index}].description`}>
              Description
            </label>
            <input className='form-control py-2 my-2'
              id={`servicesOffered[${index}].description`}
              name={`servicesOffered[${index}].description`}
              type="text"
              value={formik.values.servicesOffered[index].description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Service Description'
            />
            {formik.errors.servicesOffered &&
              formik.errors.servicesOffered[index] &&
              formik.touched.servicesOffered &&
              formik.touched.servicesOffered[index] && (
                <div>{formik.errors.servicesOffered[index].description}</div>
              )}

            <label className='lable'  htmlFor={`servicesOffered[${index}].price`}>Price</label>
            <input className='form-control py-2 my-2'
              id={`servicesOffered[${index}].price`}
              name={`servicesOffered[${index}].price`}
              type="number"
              value={formik.values.servicesOffered[index].price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Service Price'
            />
            {formik.errors.servicesOffered &&
              formik.errors.servicesOffered[index] &&
              formik.touched.servicesOffered &&
              formik.touched.servicesOffered[index] && (
                <div>{formik.errors.servicesOffered[index].price}</div>
              )}
              <button className='submit  px-4 my-2'
          type="button"
          onClick={() =>
            formik.setFieldValue('servicesOffered',formik.values.servicesOffered.filter(
              (_, i) => i !== index)) }
            >
             delete service
          </button>
            </div>
          
          </div>
        ))}
        <div className='d-flex justify-content-center my-2 '>
        <button  className='div-17 py-2 px-4'
          type="button"
          onClick={() =>
            formik.setFieldValue('servicesOffered', [
              ...formik.values.servicesOffered,
              { name: '', description: '', price: '' },
            ])
          }
        >
          Add Service
        </button>
        </div>
         
          </div>
          
          <div className='col-md-5'>
         <h5 className='d-flex justify-content-center text'>Working Hours </h5>

            {/* workingHours */}

        {formik.values.workingHours.map((workingHour, index) => (
          
          <div  key={index}>
         
          <div className='div-7'>

          <label className='lable' htmlFor={`workingHours[${index}].weekDay`}>weekDay</label>
        <select className="form-select py-2 my-2" 
          id={`workingHours[${index}].weekDay`}
          name={`workingHours[${index}].weekDay`}
          multiple
          value= {formik.values.workingHours[index].weekDay}
          onChange={(e) => {
            const weekDayValues = Array.from(e.target.selectedOptions, (option) => parseInt(option.value, 10));
            formik.setFieldValue(`workingHours[${index}].weekDay`, weekDayValues);
          }}
          onBlur={formik.handleBlur}
        >
           <option value="">select day</option>
          <option value={1}>saturday</option>
          <option value={2}>sunday</option>
          <option value={3}>monday</option>
          <option value={4}>tuesday</option>
          <option value={5}>wednesday</option>
          <option value={6}>thursday</option>
          <option value={7}>friday</option>
        </select>
        {formik.errors.workingHours &&
              formik.errors.workingHours[index] &&
              formik.touched.workingHours &&
              formik.touched.workingHours[index] && (
                <div>{formik.errors.workingHours[index].weekDay}</div>
              )}
                   
        {/* {formik.errors.workingHours &&formik.errors.workingHours.weekDay && formik.touched.workingHours && formik.touched.workingHours.weekDay && (
          <div>{formik.errors.workingHours.weekDay}</div>
        )} */}

        <label className='lable' htmlFor={`workingHours[${index}].startTime`}>Start Time</label>
        <input className='form-control py-2 my-2'
          id={`workingHours[${index}].startTime`}
          name={`workingHours[${index}].startTime`}
          type='time'
          value={formik.values.workingHours[index].startTime}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.workingHours &&
              formik.errors.workingHours[index] &&
              formik.touched.workingHours &&
              formik.touched.workingHours[index] && (
                <div>{formik.errors.workingHours[index].startTime}</div>
              )}
        <label className='lable'  htmlFor={`workingHours[${index}].endTime`}>End Time</label>
        <input className='form-control py-2 my-2'
          id={`workingHours[${index}].endTime`}
          name={`workingHours[${index}].endTime`}
          value={formik.values.workingHours[index].endTime}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type='time'
        />
        {formik.errors.workingHours &&
              formik.errors.workingHours[index] &&
              formik.touched.workingHours &&
              formik.touched.workingHours[index] && (
                <div>{formik.errors.workingHours[index].endTime}</div>
              )}


          <button className='submit  px-4 my-2'
          type="button"
          onClick={() =>
            formik.setFieldValue('workingHours',formik.values.workingHours.filter(
              (_, i) => i !== index)) }
            >
             delete day
          </button>
          </div>
        
          </div>
         
        ))}
        <div className='d-flex justify-content-center my-2 '>
        <button  className='div-17 py-2 px-4'
          type="button"
          onClick={() =>
            formik.setFieldValue('workingHours', [
              ...formik.values.workingHours,
              {  weekDay: [],
                startTime: '',
                endTime: '', },
            ])
          }
        >
          Add Day
        </button>
        </div>
       
          </div>
          <div className='d-flex justify-content-center my-3 '>
        <button className=' submit w-50 py-2'  type="submit">Submit</button>
         
        
         </div>
        </div>
        </div>
       
        
      </form>
    </div>
      
    </>
  );
};



    
