import React, { useState } from 'react';
import { useContext } from 'react';
import { AllWorkhour } from '../../GetVetsWorkhour';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddWorkingHours() {
  let {getWorksHour, WorksHour, setWorksHour}=useContext(AllWorkhour)
  console.log(WorksHour,'workhours')
  const [endTime, setEndTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [Flag, setFlag] = useState(true);
  const [Id, setId] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  let token = localStorage.getItem('Token');
//update working hours
function Showdata(id,weekDay,startTime,endTime){
  setStartTime(startTime)
  setEndTime(endTime)
 
  setSelectedOptions(weekDay)
  setId(id)
  setFlag(false)
}
function UpdateWorhkingHours() {
  const dataupdated = {
     
    weekDay:selectedOptions,
    startTime: startTime,
    endTime:endTime
    
  };

 
  axios.put(`http://fluffypet.runasp.net/api/Vets/UpdateWorkingHours/${Id}`,JSON.stringify(dataupdated),{
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }}).then((data)=>{
   
    console.log(data.status)
    getWorksHour()
    setEndTime('');
    setStartTime('');
    setSelectedOptions('');
    setFlag(true)
 }).catch((err)=>{
 console.log(err)
 })
}


  //delete a service
function ignoreDay(id) {
  axios.delete(`http://fluffypet.runasp.net/api/Vets/DeleteWorkingHours/${id}`,{
    headers: {
        'Authorization': 'Bearer ' + token
    }}).then((data)=>{
  
    console.log(data.status)
    toast.warn("Dayed Deleted successfully!");
    getWorksHour()
 }).catch((err)=>{
 console.log(err)
 })
}
  const APIForm = () => {
 
   // Delete Day
    const handleSubmit = async (event) => {
      event.preventDefault();

      // Create the data object
      const data = {
        "id": 0,
        weekDay: selectedOptions,
        startTime: startTime,
        endTime: endTime,
      };

      // Set the API endpoint URL
      const apiUrl = 'http://fluffypet.runasp.net/api/Vets/AddWorkingHours';
 
      // Set the request options
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      try {
        const response = await fetch(apiUrl, requestOptions);
        if (response.ok) {
          toast.success("Dayed Added successfully!");
          console.log('Request successful!');
          getWorksHour()
          // Clear the input fields after successful submission
          setStartTime('');
          setEndTime('');
          setSelectedOptions([]);
        } else {
          console.error('Request failed:', response.status);
        }
        const responseData = await response.json();
        console.log('Response data:', responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleOptionChange = (event) => {
      const options = event.target.options;
      const selectedOptions = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedOptions.push(parseInt(options[i].value));
        }
      }
      setSelectedOptions(selectedOptions);
    };

    return (
      <>
      <div className="">
   
        <div className="container  mt-5">
            
          <form onSubmit={handleSubmit}>
            <label htmlFor="options" >Week days:</label>
            <select
              id="options"
              name="options"
              
              value={selectedOptions}
              onChange={handleOptionChange}
              required
              className="form-select form-select-lg mb-3"
            >
              <optgroup label="options" className='pb-2' >
                <option value={1}>Saturday</option>
                <option value={2}>Sunday</option>
                <option value={3}>Monday</option>
                <option value={4}>Tuesday</option>
                <option value={5}>Wednesday</option>
                <option value={6}>Thursday</option>
                <option value={7}>Friday</option>
              </optgroup>
            </select>

            <label htmlFor="startTime" className='mt-2'>Start Time:</label>
            <input
              type="text"
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="form-control mt-2"
            />

            <label htmlFor="endTime" className='mt-2'>End Time:</label>
            <input
              type="text"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="form-control mt-2"
            />
{Flag? <button className="btn btn-warning mt-3 text-light fw-bold" type="submit">
              Submit
            </button>: <button onClick={()=>UpdateWorhkingHours()} className="btn btn-warning mt-3 text-light fw-bold" type="button">
             Update
            </button>}
           
           
          </form>
          </div>
      </div>
      <div className='    m-5 '>
        <table className="table table-light   ">
    <thead >
      <tr className='mx-auto'  >
        
       
      
        <th scope="col" className=' bg-warning text-white'>Id</th>
        <th scope="col" className=' bg-warning text-white' >Dayes </th>
        <th scope="col "  className=' bg-warning text-white'>Start time</th>
        <th scope="col "  className=' bg-warning text-white'>End time</th>
        <th scope="col "  className=' bg-warning text-white'>Update</th>
        <th scope="col "  className=' bg-warning text-white'>Delete</th>
  
  
      </tr>
    </thead>
    {WorksHour?.map(Day=>{
    
      return<>
     
     <tbody className='' >
      
     <tr key={Day.id}>
                <td >{Day.id}</td>
               <td> {Day.weekDay.map((day, index) => (
                        <span key={index}>{index > 0 ? ', ' : ''}{getWeekDay(day)}</span>
                      ))}</td>
                <td >{Day.startTime}</td>
                <td>{Day.endTime}</td>
              
                <td><button onClick={()=>Showdata(Day.id,Day.weekDay,Day.startTime,Day.endTime)} className='btn btn-warning text-white'>update</button></td>
                <td><button onClick={()=>ignoreDay(Day.id)}  className='btn btn-danger text-white'>Delete</button></td>
              </tr>
    
   
    </tbody>
              
      
      </>
      
  })}
    
  </table>
        </div>
  
        
      </>
    );
  };

  return (
    <div>
      <APIForm />
    </div>
  );
};
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

//