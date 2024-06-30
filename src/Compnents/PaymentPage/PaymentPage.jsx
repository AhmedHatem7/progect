// import React, { useState } from 'react';
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import styles from './PaymentPage.module.css';

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import  { idContext } from '../../context/IdContext/IdContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  let{IntentId,setIntentId}=useContext(idContext)
    const token=localStorage.getItem('Token')
   let navigat=useNavigate()
  
   
//     function createsubscription(id)
//     {
//         const formData = new FormData();
//         console.log('ddddd',id)
//         formData.append('paymentIntentId',id);
//         const response = axios.post('http://fluffypet.runasp.net/api/Payments/create-subscription',formData,{
//             headers:{
//                 Authorization: 'Bearer ' + token,
//             }
//         })
//         .then((response)=>{
//             console.log('res',response)

//         })
//         .catch((err)=>{
// console.log(err)
//         })

//     }


    // try {
       
    //     const response = axios.post('http://fluffypet.runasp.net/api/Payments/create-subscription', formData);
    //     console.log('res',response)
    //     if(response.data.message=="Success")
    //     {
        
    //     }
    //     console.log('Form data submitted successfully create :', response.data);
    //     // Handle successful response
    //   } catch (error) {
       
    //     console.error('Form data submission failed:', error);
    //     // Handle error response
  

    //   }


    async function createpaymentintent() {
        
          
     
          const response = await axios.post(
            'http://fluffypet.runasp.net/api/Payments/create-payment-intent',
            {
              headers: {
                'Authorization': 'Bearer ' + token,
              },
            }
          ).then((data)=>{
            console.log(data.data)
            setIntentId(data.data.id);
            console.log(data.data.id,'ooooh id')
            navigat('/paymentcomplete')
          
         
          }).catch((err)=>{
console.log(err)
          })
      }
  
     
  return (
    <>

 <section className='DefineAboutSapscrption mx-auto'>
    <div className="DefineAboutSapscrptionTitle text-center ">
        <span className='d-flex justify-content-end  ' ><span className='h5 mt-2 me-3'>Adopation</span> <span className='mt-2 ps-2 Asubscripe '>subscripe</span>  </span>
  
    </div>
    <div className="DefineAboutSapscrptionSubTitle ">
    <p className='mt-3'>for adopation you must subscripe now</p>
    <p className='fontat'>subscripe now</p>

    </div>
    <div className="subscborder"></div>
<div className="d-flex justify-content-between align-items-center mt-4">
<h6 className=' ms-4'>Breader</h6>
<i className="fa-solid fa-check cheakicon me-3"></i>
</div>
<div className="d-flex justify-content-between align-items-center mt-1">
<h6 className=' ms-4'>Adopation</h6>
<i className="fa-solid fa-check cheakicon me-3"></i>
</div>
<div className="d-flex justify-content-center h4 mt-3">1 month/30$</div>
<div className="d-flex justify-content-end mt-3  ">
<button onClick={()=>createpaymentintent()} className=' me-2 btn btn-warning text-white'>Subscribe</button>
</div>

 </section>
    </>
  )
}
























































// const PaymentPage = () => {
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       setError('Stripe is not properly initialized. Please try again later.');
//       return;
//     }

//     setProcessing(true);

//     try {
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: elements.getElement(CardElement),
//       });

//       if (error) {
//         setError(`Payment error: ${error.message}`);
//       } else {
//         // Handle the successful payment
//         console.log('Payment method:', paymentMethod);
//       }
//     } catch (error) {
//       setError(`Payment error: ${error.message}`);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Payment</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.cardElement}>
//           <CardElement />
//         </div>
//         {error && <div className={styles.error}>{error}</div>}
//         <button
//           type="submit"
//           disabled={processing}
//           className={`${styles.button} ${processing ? styles.processing : ''}`}
//         >
//           {processing ? 'Processing...' : 'Pay'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;