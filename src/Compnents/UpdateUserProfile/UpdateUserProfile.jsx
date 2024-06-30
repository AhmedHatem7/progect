// import React, { useContext, useEffect, useState } from 'react'
// import { idContext } from '../../context/IdContext/IdContext';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from "yup"
// import toast from 'react-hot-toast'

// export default function UpdateUserProfile() {
//   const token=localStorage.getItem('tkn')
//   const [FirstName, setFirstName] = useState('');
//   const [LastName, setLastName] = useState('');
//   const [UserName, setUserName] = useState('');
//   const [PhotoUrl, setPhotoUrl] = useState('');
//   const [ImageIDCard, setImageIDCard] = useState('');
//   const [GovernorateId, setGovernorateId] = useState('');
//   const [AreaId, setAreaId] = useState('');
//   const [Address, setAddress] = useState('');
//   const [PhoneNumber, setPhoneNumber] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [governorates, setGovernorates] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [email,setEmail]=useState('')

//   function getUserInfo(){
   
//     axios.get(`http://fluffypet.runasp.net/Get-Current-User`,{
//       headers:{
//         Authorization: `Bearer ${token}`
//       }
//     }).then((res)=>{
//        console.log('account',res)
//        setEmail(res.data.email)
//        setFirstName(res.data.firstName)
//        setLastName(res.data.lastName)
//        setUserName(res.data.userName)
//        setGovernorateId(res.data.governorate)
//        setAreaId(res.data.area)
//        setAddress(res.data.address)
//        setPhoneNumber(res.data.phoneNumber)
//        setPhotoUrl(res.data.image)
//     }).catch((error)=>{
//        console.log('account error',error)
//     })
//   }
//   useEffect(()=>{
//     getUserInfo()
//   },[email])
 
  
//   useEffect(() => {
//     fetchGovernorates();
//   }, []);

//   const fetchGovernorates = async () => {
//     try {
//       const response = await axios.get('http://fluffypet.runasp.net/api/GovernorateArea/All-Governorates');
//       setGovernorates(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchAreasByGovernorate = async (governorateId) => {
//     try {
//       const response = await axios.get(`http://fluffypet.runasp.net/api/GovernorateArea/Get-Areas-By-${governorateId}`);
//       setAreas(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const handleEdit = () => {
//     setIsEditing(true);
//   };
//   // const handleSave = () => {
//   //   // Perform validation if needed

//   //   // Save the updated values to the server or perform necessary actions
//   //   setIsEditing(false);
//   // };

//   const handleSave = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('FirstName', FirstName);
//         formData.append('LastName', LastName);
//         formData.append('UserName', UserName);
//         formData.append('GovernorateId', GovernorateId);
//         formData.append('AreaId', AreaId);
//         formData.append('Address', Address);
//         formData.append('PhoneNumber', PhoneNumber);

//         const params=new URLSearchParams({
//           email:email,
//        })
//         try {
//           const response = await axios.post(`http://fluffypet.runasp.net/Edit-User-Profile?${params.toString()}`, formData,{
//             headers:{
//               Authorization: `Bearer ${token}`
//             }
//           });
//           console.log('yaaaaaaaay',response)
//           if (response.status === 200) {
//             alert('Profile updated successfully!');
//           } else {
//             alert('Error 1 updating profile');
//           }
//         } catch (error) {
//           console.error('update error',error);
//           alert('Error updating profile');
//         }
    
//         setIsEditing(false);
//       };

//   const handleCancel = () => {
//     setIsEditing(false);
//   };

  
//   return <>
//        <div  className="w-50 shadow p-3 mb-5  rounded m-auto" >
//       <h2 className=' text-center adding py-1'>User Profile</h2>
//       <form >
//       <div>
     

//         <div >
//           <label htmlFor='FirstName'>FirstName:</label>{' '}
//           {isEditing ? (
//             <input
//             id='FirstName'
//             name='FirstName'
//             className='form-control py-2 my-3'
//               type="text"
//               value={FirstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           ):
//           FirstName
//           }
//         </div>
//         <div >
//           <label htmlFor='LastName'>LastName:</label >{' '}
//           {isEditing ? (
//             <input
//             className='form-control py-2 my-3'
//               name='LastName'
//               id='LastName'
//               type="text"
//               value={LastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           ) : (
//             LastName
//           )}
//         </div>
        
//         <div >
//           <label htmlFor='UserName'>UserName:</label>{' '}
//           {isEditing ? (
//             <input
//             className='form-control py-2 my-3'
//             name='UserName'
//             id='UserName'
//               type="text"
//               value={UserName}
//               onChange={(e) => setUserName(e.target.value)}
//             />
//           ) : (
//             UserName
//           )}
//         </div>
//         <div >
//         <label  htmlFor="GovernorateId">Governorate:</label>{' '}
//           {isEditing ? (
            
            
//             <select id='GovernorateId' value={GovernorateId} className="form-select py-2 my-2" aria-label="Default select example" name="GovernorateId"   onChange={(event) => {
//              setGovernorateId(event.target.value)
//              const selectedGovernorateId = event.target.value;
//               fetchAreasByGovernorate(selectedGovernorateId);
//             }}>
//               <option value="" >Select a governorate</option>
//               {governorates.map((GovernorateId) => (
                
//                 <option key={GovernorateId.id} value={GovernorateId.id}>
//                   {GovernorateId.name}
//                 </option>
//               ))}
//             </select>
          
//           ) : (
//             GovernorateId
//           )}
//         </div>

//         <div >
//         <label  htmlFor="AreaId">Area:</label>{' '}
//           {isEditing ? (
//            <select id='AreaId' className="form-select py-2 my-2 " value={AreaId} aria-label="Default select example"  name="AreaId"  onChange={(event)=>{
//             setAreaId(event.target.value)
//            }}>
//              <option value="" >Select an area</option>
//              {areas.map((AreaId) => (
//                <option key={AreaId.id} value={AreaId.id} >
//                  {AreaId.name}
//                </option>
//              ))}
//            </select>
         
//           ) : (
//             AreaId
//           )}
//         </div>
//         <div >
//           <label htmlFor='Address'>Address:</label>{' '}
//           {isEditing ? (
//             <input
//             className='form-control py-2 my-3'
//               name='Address'
//               id='Address'
//               type="text"
//               value={Address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           ) : (
//             Address
//           )}
//         </div>
//         <div >
//           <label htmlFor='PhoneNumber'>PhoneNumber:</label>{' '}
//           {isEditing ? (
//             <input
//             className='form-control py-2 my-3'
//               name='PhoneNumber'
//               id='PhoneNumber'
//               type="text"
//               value={PhoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//           ) : (
//             PhoneNumber
//           )}
//         </div>
//       </div>
//       {isEditing ? (
//         <div>
//           <button className='btn btn-warning main-btn'  onClick={handleSave} >Save</button>
//           <button className='btn ' onClick={handleCancel}>Cancel</button>
//         </div>
//       ) : (
//         <button className='btn ' onClick={handleEdit}>Edit</button>
//       )}
//       </form>
      
//     </div>
//     </>
 
// }




import React, { useContext, useEffect, useState } from 'react';
import { idContext } from '../../context/IdContext/IdContext';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

export default function UpdateUserProfile() {
  const token = localStorage.getItem('tkn');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [UserName, setUserName] = useState('');
  const [PhotoUrl, setPhotoUrl] = useState('');
  const [ImageIDCard, setImageIDCard] = useState('');
  const [GovernorateId, setGovernorateId] = useState('');
  const [AreaId, setAreaId] = useState('');
  const [Address, setAddress] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [governorates, setGovernorates] = useState([]);
  const [areas, setAreas] = useState([]);
  const [email, setEmail] = useState('');
  const [editPhoto,setEditPhoto]=useState(false)
     function getUserInfo(){
   
        axios.get(`http://fluffypet.runasp.net/Get-Current-User`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }).then((res)=>{
           console.log('account',res)
           setEmail(res.data.email)
           setFirstName(res.data.firstName)
           setLastName(res.data.lastName)
           setUserName(res.data.userName)
           setGovernorateId(res.data.governorate)
           setAreaId(res.data.area)
           setAddress(res.data.address)
           setPhoneNumber(res.data.phoneNumber)
           setPhotoUrl(res.data.image)
        }).catch((error)=>{
           console.log('account error',error)
        })
      }
  const formik = useFormik({
    initialValues: {
      PhotoUrl:PhotoUrl,
      FirstName: FirstName,
      LastName: LastName,
      UserName: UserName,
      GovernorateId: GovernorateId,
      AreaId: AreaId,
      Address: Address,
      PhoneNumber: PhoneNumber,
    },
    validationSchema: Yup.object().shape({
      FirstName: Yup.string().required('First name is required'),
      LastName: Yup.string().required('Last name is required'),
      UserName: Yup.string().required('Username is required'),
      GovernorateId: Yup.string().required('Governorate is required'),
      AreaId: Yup.string().required('Area is required'),
      Address: Yup.string().required('Address is required'),
      PhoneNumber: Yup.string().required('Phone number is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append('PhotoUrl', values.PhotoUrl);
        formData.append('FirstName', values.FirstName);
        formData.append('LastName', values.LastName);
        formData.append('UserName', values.UserName);
        formData.append('GovernorateId', values.GovernorateId);
        formData.append('AreaId', values.AreaId);
        formData.append('Address', values.Address);
        formData.append('PhoneNumber', values.PhoneNumber);

        const params = new URLSearchParams({
          email: email,
        });

        const response = await axios.post(`http://fluffypet.runasp.net/Edit-User-Profile?${params.toString()}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          alert('Profile updated successfully!');
        } else {
          alert('Error 1 updating profile');
        }
      } catch (error) {
        console.error('update error', error);
        alert('Error updating profile');
      }

      setSubmitting(false);
      setIsEditing(false);
    },
  });

  useEffect(() => {
    getUserInfo();
  }, [email]);

  useEffect(() => {
    fetchGovernorates();
  }, []);

  const fetchGovernorates = async () => {
    try {
      const response = await axios.get('http://fluffypet.runasp.net/api/GovernorateArea/All-Governorates');
      setGovernorates(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAreasByGovernorate = async (governorateId) => {
    try {
      const response = await axios.get(`http://fluffypet.runasp.net/api/GovernorateArea/Get-Areas-By-${governorateId}`);
      setAreas(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
   
  const editingPhoto=()=>{
    setEditPhoto(true)
  }

 
  return (
    <div className="w-50 shadow p-3 mb-5 rounded m-auto">
      <h2 className="text-center adding py-1">User Profile</h2>
      <form >
        <div >
          {isEditing? (<div className='container editPhotoBox my-3'>
              <div className="row d-flex justify-content-between">
                <div className="col-md-2"> <img className='w-100 editPhoto ' src={`http://fluffypet.runasp.net/${PhotoUrl}`}/></div>
                <div className="col-md-7">
                  <h3>{UserName}</h3>
                  <h5 className='governrate'>{FirstName+ ' '+ LastName}</h5>
                </div>
                 <div className="col-md-3 d-flex justify-content-center align-items-center">
                  <button className='btn editPhotobtn  text-white ' onClick={editingPhoto}>Change photo</button>
                 </div>
              </div>
            </div>)
         :<div className='w-25 m-auto'><img className='w-100 profilePhoto ' src={`http://fluffypet.runasp.net/${PhotoUrl}`}/> </div>  }
     
          <div>
            <label className='lable' htmlFor="FirstName ">FirstName : </label>{' '}
            {isEditing ? (
              <input
                id="FirstName"
                name="FirstName"
                className="form-control py-2 my-3"
                type="text"
                value={formik.values.FirstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            ) : (
              FirstName
            )}
            {formik.touched.FirstName && formik.errors.FirstName ? (
              <div className="text-danger">{formik.errors.FirstName}</div>
            ) : null}
          </div>
          <div>
            <label className='lable' htmlFor="LastName">LastName :</label>{' '}
           {isEditing ? (
              <input
                id="LastName"
                name="LastName"
                className="form-control py-2 my-3"
                type="text"
                value={formik.values.LastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            ) : (
              LastName
            )}
            {formik.touched.LastName && formik.errors.LastName ? (
              <div className="text-danger">{formik.errors.LastName}</div>
            ) : null}
          </div>
          <div>
            <label className='lable' htmlFor="UserName">UserName :</label>{' '}
            {isEditing ? (
              <input
                id="UserName"
                name="UserName"
                className="form-control py-2 my-3"
                type="text"
                value={formik.values.UserName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            ) : (
              UserName
            )}
            {formik.touched.UserName && formik.errors.UserName ? (
              <div className="text-danger">{formik.errors.UserName}</div>
            ) : null}
          </div>
          <div>
            <label className='lable' htmlFor="GovernorateId">Governorate :</label>{' '}
            {isEditing ? (
              <select
                id="GovernorateId"
                name="GovernorateId"
                className="form-select py-2 my-2"
                value={formik.values.GovernorateId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select a governorate</option>
                {governorates.map((GovernorateId) => (
                  <option key={GovernorateId.id} value={GovernorateId.id}>
                    {GovernorateId.name}
                  </option>
                ))}
              </select>
            ) : (
              GovernorateId
            )}
            {formik.touched.GovernorateId && formik.errors.GovernorateId ? (
              <div className="text-danger">{formik.errors.GovernorateId}</div>
            ) : null}
          </div>
          <div>
            <label className='lable' htmlFor="AreaId">Area :</label>{' '}
            {isEditing ? (
              <select
                id="AreaId"
                name="AreaId"
                className="form-select py-2 my-2"
                value={formik.values.AreaId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select an area</option>
                {areas.map((AreaId) => (
                  <option key={AreaId.id} value={AreaId.id}>
                    {AreaId.name}
                  </option>
                ))}
              </select>
            ) : (
              AreaId
            )}
            {formik.touched.AreaId && formik.errors.AreaId ? (
              <div className="text-danger">{formik.errors.AreaId}</div>
            ) : null}
          </div>
          <div>
            <label className='lable' htmlFor="Address">Address :</label>{' '}
            {isEditing ? (
              <input
                id="Address"
                name="Address"
                className="form-control py-2 my-3"
                type="text"
                value={formik.values.Address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            ) : (
              Address
            )}
            {formik.touched.Address && formik.errors.Address ? (
              <div className="text-danger">{formik.errors.Address}</div>
            ) : null}
          </div>
          <div>
            <label className='lable' htmlFor="PhoneNumber">PhoneNumber :</label>{' '}
            {isEditing ? (
              <input
                id="PhoneNumber"
                name="PhoneNumber"
                className="form-control py-2 my-3"
                type="text"
                value={formik.values.PhoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            ) : (
              PhoneNumber
            )}
            {formik.touched.PhoneNumber && formik.errors.PhoneNumber ? (
              <div className="text-danger">{formik.errors.PhoneNumber}</div>
            ) : null}
          </div>
        </div>
        {isEditing ? (
          <div>
            <button className="btn btn-warning main-btn" onClick={formik.handleSubmit}>
              Save
            </button>
            <button className="btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn btn-outline-warning main-btn my-2" onClick={handleEdit}>
            Edit
          </button>
        )}
      </form>
    </div>
  );
}