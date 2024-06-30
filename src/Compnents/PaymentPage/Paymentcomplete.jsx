import React, { useContext, useState } from 'react'
import { idContext } from '../../context/IdContext/IdContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Paymentcomplete() {
  let{IntentId,setIntentId}=useContext(idContext)
  let token =localStorage.getItem('Token')
  const [showModal, setShowModal] = useState(false);
  const navigate=useNavigate()

  function handleButtonClick() {
    confirmPayment()
  
  }

  function handleCloseModal() {
    setShowModal(false);}
  console.log(IntentId)
  function confirmPayment()
    {
     
        const formData = new FormData();
       
        formData.append('paymentIntentId',IntentId);
         axios.post('http://fluffypet.runasp.net/api/Payments/confirm-payment-intent',formData,{
            headers:{
                Authorization: 'Bearer ' +token,
            }
        })
        .then((response)=>{
            console.log('res',response)
            createsubscription()

        })
        .catch((err)=>{
console.log(err)
        })

    }

    function createsubscription()
    {
     
        const formData = new FormData();
       
        formData.append('paymentIntentId',IntentId);
         axios.post('http://fluffypet.runasp.net/api/Payments/create-subscription',formData,{
            headers:{
                Authorization: 'Bearer ' +token,
            }
        })
        .then((response)=>{
            console.log('res from creat subcreption',response)
            setShowModal(true);
            setTimeout(()=>{
              navigate('/Home')
           },3000)

        })
        .catch((err)=>{
console.log(err)
        })

    }



  return (
    <>
<div className="d-flex justify-content-center ">
<div className="paymentleftside">
 <h2 className='text-center mt-5'>Fluffy pets</h2>
 <h2 className='ms-3 mt-5'>30$/1month</h2>
 
</div>
 <div className="completepaysection">
  <div className="completepaysectioninside">
  <h6>Pay with card</h6>
<div className="  " >     
            <input type='email' name='Email' placeholder='Email        Ahmed@yahoo.com  ' id='Email'  className='form-control payinput ' />
            </div>
            <div className="input-container mt-2">
             <label htmlFor="Cardnumber">card information</label>
            <input type='number' id='Cardnumber'  placeholder='4242 4242 4242 4242 '   className='form-control    '/>
     
            </div>
            <div className="d-flex justify-content-center">
            <div className="input-container ">
            
            <input type='text' id='Cardnumber'  placeholder='MM/YY'   className='form-control    '/>
          
            </div>
            <div className="input-container ">
            
            <input type='number' id='Cardnumber'  placeholder='cvc '   className='form-control    '/>
            </div>
            </div>
            <div className="input-container mt-2">
             <label htmlFor="Cardname">Name on card</label>
            <input type='text' id='Cardname'  placeholder=''   className='form-control    '/>
     
            </div>
            <div className="input-container mt-2">
             <label htmlFor="Cardname">country or region</label>
            <input type='text' id='Cardname'  placeholder=''   className='form-control    '/>
     
            </div>
            <div className="text-center  ">
            <button onClick={ handleButtonClick} className="btn btn-primary mt-3 w-100  text-white ">Pay</button>
            </div>
      
  </div>
  <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered // Add the centered prop to center the modal
      >
        <Modal.Header >
          <Modal.Title>Statue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="d-flex justify-content-center"> <h4 >Sucsses</h4></div>
         <div className="successPament mx-auto bg-success text-white">
          
          <i className="fa-solid fa-check"></i></div>
          <p className="d-flex justify-content-center"> Your subscreption is expire to 1 month</p>
        </Modal.Body>
        <Modal.Footer>
        
        </Modal.Footer>
      </Modal>

 </div>


 







 </div>
    </>
  )
}
