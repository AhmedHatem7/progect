import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function OneDoctor() {
    const token=localStorage.getItem('Token')
    let{id}=useParams()
    console.log(id)
    const [Comment, setComment] = useState('');
  const [AllComments, setAllComments] = useState([]);
    const [DoctorDetalis, setDoctorDetalis] = useState([])
    const [DoctorWorkingHours, setDoctorWorkingHours] = useState([])
    const [DoctorService, setDoctorService] = useState([])
    async function getAllcomments() {
   

        try {
          const response = await axios.get(`http://fluffypet.runasp.net/api/VetComments/All_Comments_For_Vet/${id}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          setAllComments(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {
        getAllcomments();
        console.log(AllComments, 'All coment');
      }, []);
    


   async  function GetUserDetails(){
   await axios.get(`http://fluffypet.runasp.net/api/Vets/Show_Vet_Details${id}`,null,{
    headers:{
      'Authorization': 'Bearer ' + token
  }}).then((data)=>{
   
    console.log(data.data) 
       setDoctorDetalis(data.data)
       setDoctorWorkingHours(data.data.workingHours)
       setDoctorService(data.data.servicesOffered )
       console.log(DoctorWorkingHours,'is')
       console.log(DoctorService,'is')

  }).catch((err)=>{
  console.log(err)
  })
    }
    useEffect(()=>{
      GetUserDetails()
    },[])
  return (
    <div>
        <div className="DoctorDetailsPhoto  d-flex justify-content-between  mt-3">
            <div className='w-50'>
              <div className="container text-center mt-5">
            <h2 className='mt-3'>We Find <span className='h1'> <span className='fontat'>Best</span> Doctor</span></h2>
            <h2 className='mt-4'>For your <span className='h1 fontat'> Pets</span></h2>
            <p className='mt-5'>Proper care can prevent common diseases,</p>
             <p>address health issues promptly,</p>
             <p>and ensure a higher quality of life</p>
             <button className='btn btn-warning text-light mt-4'> Book Now</button>
              </div>
          
            </div>
            <div className="  tests w-50 position-relative ">

            </div>
        </div>
        <div className="text-center mt-5 fontat "><h1>Doctor Details</h1></div>
        <div className="d-flex DoctorDetailsPhoto container  ">
            <div className=' w-50'>  <img src={'http://fluffypet.runasp.net/' + DoctorDetalis?.photo} className=' w-100  h-100 mt-3 ' alt="" /></div>
      
        <div className='w-50 ms-5 '>

           
            <h3 className='mt-5 text-center'>  <span className='fontat h1'> Dr:</span><span className='fontat h1'>{DoctorDetalis.firstName +" " +DoctorDetalis.lastName}</span>  </h3>
            <h4  className='mt-5'> <span className=''>phoneNumber</span> :  <span className=''>{DoctorDetalis?.phoneNumber}</span> </h4>
            <h4 className='mt-3'>  Email : {DoctorDetalis.email}      </h4>
            <h5 className='mt-3'>specialization : {DoctorDetalis.specialization}</h5>
            <div className='d-flex  mt-3 '>
            <button  className='btn  p-3 btn-warning text-white me-2 mt-4  '> <a href={`https://wa.me/+20${DoctorDetalis?.phoneNumber}`} target='_blank' className='text-white'> <span>Contact us</span> <i className="fa-brands fa-whatsapp "></i></a> </button>
            <button  className='btn  p-3 btn-warning text-white me-2 mt-4 ms-3 '> <a href={`mailto:${DoctorDetalis?.email}` } target='_blank' className='text-white'> <span>Send massage by mail</span> <i className="fa-brands fa-whatsapp "></i></a> </button>

            </div>
           


            
            </div>
        </div>
        <h2 className='fontat text-center mt-5'>Working Hours</h2>


<div className='docWorkHOurs mt-5 '>
   <div className="">
    <div className=" d-flex justify-content-center" >
    {DoctorWorkingHours?.map((day)=>{
return<>

<div className='onedayde text-center mb-5  '>
{(day.weekDay==1)?<div className='h1 text-light'>satarday</div>:(day.weekDay==2)?<div className='h1 text-light'> Sunday</div>:(day.weekDay==3)?<div className='h1 text-light'>Monday</div>:
(day.weekDay==4)?<div className='h1 text-light'>Tuseday</div>:(day.weekDay==5)?<div className='h1 text-light'>wednesday</div>:(day.weekDay==6)?<div className='h1 text-light'>thratday</div>
:(day.weekDay==7)?<div className='h1 text-light'>friday</div>:''}
<h1><i className="fa-regular fa-clock clock"></i></h1>
<div className='d-flex justify-content-center'>
<h2 className='text-white'>{day.startTime}:</h2>
<h2 className='text-white'>{day.endTime}</h2>
</div>
</div>

</>

 })}
    </div>
   </div>


</div>
         
 <h1 className='text-center fontat mt-5'>service</h1>
<div className="container">
<div className="row  m-3 ">
    {DoctorService?.map((service)=>{
        
        return<>
        <div className="col-md-4  ">
      <div className="card " style={{width: '18rem',height:'12rem'}}>
  <div className="card-body servicecard">
    <h5 className="card-title">service : {service.name}</h5>
    <h5 className="card-subtitle mb-2  text-white">price :{service.price}</h5>
<h5>description :<span>{service.description}</span> </h5>
    
  </div>
</div>

        </div>
        

        </>
    })}
</div>
</div>
<h2 className='fontat text-center mt-5'>commuity</h2>
{AllComments.map((comment, index) => (
  
  <div key={index} className="comment-card container mt-3 ">
    <div className="comment-header">
      <div className="comment-avatar">
        <img src={require('../../assets/images/Dr_-Mike-is-called-out-for-hypocrisy-after-he_s-seen-partying-maskless.jpg')} className='' alt="Avatar" />
      </div>
      <div className="comment-info">
        <h5 className="comment-author">{comment.vetName}</h5>
        <p className="comment-date">June 18, 2024</p>
      </div>
    </div>
    <div className="comment-body">
      <p>{comment.comment}</p>
    </div>
    <div className="comment-actions">
      <button onClick={() => {
          const commentSection = document.querySelector('.comment-card');
          commentSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          window.scrollBy(0,-50); // Adjust the scroll position by -50px
        }} className="btn btn-outline-primary btn-sm">Reply</button>
     
    </div>
  </div>
))}

    </div>
  )
}
const getWeekDay = (dayNumber) => {
    switch (dayNumber) {
      case 1:
        return 'Saturday';
      case 2:
        return 'Sunday';
      case 3:
        return 'Monday';
      case 4:
        return 'Tuesday';
      case 5:
        return 'Wednesday';
      case 6:
        return 'Thursday';
      case 7:
        return 'Friday';
      default:
        return '';
    }
  };
  
/*
email
: 
"709f53fa7c@emailcbox.pro"
firstName
: 
"Ahmed"
id
: 
"7ddbc1ff-86de-4770-b1b4-51913b78feb9"
isAvailable
: 
true
lastName
: 
"Atef"
phoneNumber
: 
"01147075920"
photo
: 
"/images/Photo/10430a58-228b-4512-8b9b-60eceb19abbcDr_-Mike-is-called-out-for-hypocrisy-after-he_s-seen-partying-maskless.jpg"
servicesOffered
: 
[]
specialization
: 
"cats dogs"
*/