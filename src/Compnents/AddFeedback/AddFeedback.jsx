import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
 import { useParams } from 'react-router-dom';

function AddFeedback() {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setcomment] = useState('');
  const {reviewedUser}=useParams()
  const token = localStorage.getItem('tkn')
  const handleRatingChange = (value) => {
       setRating(value);
     };
  
     const handlecommentChange = (event) => {
       setcomment(event.target.value);
     };
  
     const handleSubmit = async (event) => {
       event.preventDefault();
  
       try {
         const response = await axios.post(`http://fluffypet.runasp.net/api/Feedbacks/AddFeedback/${reviewedUser}`, { rating, comment },{headers:{
           Authorization:`Bearer ${token}` ,
          
          }});
         console.log('feedback added',response.data); 
          // Reset the form after successful submission
         setRating(0);
         setcomment(''); 
       } catch (error) {
         console.error('Error sending feedback:', error);
       }
     };
  function handleButtonClick() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return  <>
     
      <button onClick={handleButtonClick}>Add Feedback</button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered // Add the centered prop to center the modal
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <p>Modal Content</p> */}
          <div className='w-75 m-auto'>
       <h3>Rating: {rating}</h3>
       <div className='my-3'>
         {[1, 2, 3, 4, 5].map((value) => (
           <span
             key={value}
             onClick={() => handleRatingChange(value)}
             style={{ cursor: 'pointer' }}
           >
             {value <= rating ?<span className='text-main'><i className="fa-solid fa-star"></i>  </span> : <span className='text-main'><i className="fa-regular fa-star"></i> </span>}
           </span>
         ))}
       </div>
       <form onSubmit={handleSubmit}>
         <textarea className='form-control'
           value={comment}
           onChange={handlecommentChange}
           placeholder="Enter your feedback"
           required
         />
         <button className='btn btn-warning main-btn my-3' type="submit">Send</button>
       
       </form>
     </div>
          
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleCloseModal}>
            cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
 
}

export default AddFeedback;


