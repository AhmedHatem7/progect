import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function NewComment() {
  const [Comment, setComment] = useState('');
  const [AllComments, setAllComments] = useState([]);
  const [Vetid, setVetid] = useState('');
  const token = localStorage.getItem('Token');
  const vetren = '7ddbc1ff-86de-4770-b1b4-51913b78feb9';
 //delete comment 
 function Deletecomment(id) {
  axios.delete(`http://fluffypet.runasp.net/api/VetComments/DeleteComment/${id}`,{
    headers: {
        'Authorization': 'Bearer ' + token
    }}).then((data)=>{
   toast.error('post is deleted')
    console.log(data.status)
    getAllcomments();
 }).catch((err)=>{
 console.log(err)
 })
}
  async function getAllcomments() {
   

    try {
      const response = await axios.get(`http://fluffypet.runasp.net/api/VetComments/All_Comments_For_Vet/${vetren}`, {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the form data object
    const formData = new FormData();
    formData.append('Comment', Comment);

    try {
      const response = await axios.post(
        'http://fluffypet.runasp.net/api/VetComments/Vet_Add_Comment',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('post is Added successflly')
      console.log('Response:', response.data);
      console.log(response.data.vetId);
      setVetid(response.data.vetId);
      getAllcomments()
      setComment('')
      // Handle the successful response
    } catch (error) {
      console.error('Error:', error);
      // Handle the error response
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label className="mt-3" htmlFor="Comment">
            Add post:
          </label>
          <textarea
            type="text"
            id="Comment"
            name="Comment"
            rows={5}
            value={Comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="form-control mt-2"
          />

          <button className="btn btn-warning text-light fw-bolder mt-3 " type="submit">
          post
          </button>
        </form>
      </div>
{/* 
      {AllComments.map((comment, index) => (
  <div key={index} className="comment-container container mt-5">
    <div className="comment-header">
      <div className="comment-avatar">
        <img src="https://via.placeholder.com/50" alt="Avatar" />
      </div>
      <div className="comment-author">
        <h5>{comment.vetName}</h5>
        <p>June 18, 2024</p>
      </div>
    </div>
    <div className="comment-body">
      <p>{comment.comment}</p>
    </div>
    <div className="comment-actions">
      <button className="btn btn-outline-primary btn-sm">Reply</button>
      <button className="btn btn-outline-danger btn-sm">Delete</button>
    </div>
  </div>
))} */}


{AllComments.map((comment, index) => (
  
  <div key={index} className="comment-card container mt-3 ">
    <div className="comment-header">
      <div className="comment-avatar">
        <img src={`http://fluffypet.runasp.net/${comment.photo}`} className='' alt="Avatar" />
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
      <button onClick={()=>Deletecomment(comment.id)} type='button' className="btn btn-outline-danger btn-sm">Delete</button>
    </div>
  </div>
))}
    </>
  );
}