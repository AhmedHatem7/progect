import React, { useContext, useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import homecss from './Home.module.css';
import MainSlider from '../Mainslider/Mainslider';
import axios from 'axios';
import DocSlider from '../Mainslider/DocSlider';
import Productslider from '../Mainslider/Productslider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { FallingLines } from 'react-loader-spinner';
import GetProducts from '../getProducts/GetProducts';
import Footer from '../Footer/Footer';

export default function Home() {
  const [Accepetedpet, setAccepetedpet] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [AcceptedProduct, setAcceptedProduct] = useState([]);
 let token=localStorage.getItem('tkn')
 console.log(token)
 const [AllVet, setAllVet] = useState([]);
 const [Loadine, setLoadine] = useState([]);



 async function getAlldoctors() {
   try {
     

     const response = await axios.get(
       'http://fluffypet.runasp.net/api/Vets/Get_All_Vets?pageSize=8',
       {
         headers: {
           Authorization: 'Bearer ' + token,
         },
       }
     );
     setAllVet(response.data.data);
     console.log(response.data.data)
       } catch (err) {
     console.log(err);
   }
 }
 useEffect(() => {
   getAlldoctors();
 }, []);

/* get pets */

const tkn=localStorage.getItem('tkn')
const{addToCart}=useContext(cartContext)

  async function getAccepetedpet(){
    const params=new URLSearchParams({
              pageNumber:currentPage,
              pageSize:'30',
             
           })
         return  await axios.get(`http://fluffypet.runasp.net/api/Pet/Get_All_Pets_Accepted?${params.toString()}`).then((data)=>{
       console.log('data is',data.data)
       setAccepetedpet(data.data.data)

}).catch((err)=>{
console.log(err)
})
}

const handlePageChanges = (pageNumber) => {
  setCurrentPage(pageNumber);
};

useEffect(() => {
  getAccepetedpet();
}, [currentPage]);

async function addProdToCart(id,isPet){
  const add=await addToCart(id,isPet)
  console.log('add',add)
  if(add){
    toast.success('Added to cart successfully.',{duration:2000,position:'top-center',style:{}})
   }else{
    toast.error('something wrong!')
   }
}
if(!Accepetedpet){
return <div className='d-flex vh-100  bg-opacity-50 justify-content-center align-items-center' >
<FallingLines
          color="#F9BA1D"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
     />
  </div>
}
/**end of pets */
/** get product */

/**end of product */

 



  return (
    <>

<div className='mt-4 '>

        <div className="container">
        <div className='d-flex'>
          <div className='w-50'>
          <MainSlider/>
          </div>
           

          <div className='w-50'>
            <DocSlider/>
          <Productslider/>
          </div>
        </div>
        
    </div>
        <div className="d-flex justify-content-between  upperdoc w-100 mt-5">
          <div   className="container m-auto ">
             <div className='ms-5 text-center'>  <h1 className='doctextis' >Fluffy <span className='fontat'>pets</span> </h1> </div>
             <div className='ms-5 text-center'>  <h2 className='doctextis mt-4'>Healthy  care</h2> </div>
             <div className='ms-5 text-center'>  <h2 className='doctextis mt-4'>Healthy live</h2> </div>
          <p className='text-center para mt-5'> 
          Prompt veterinary diagnosis and treatment </p>
          <p className='text-center'>is essential in minimising any impact of pain, injury or disease</p>
          <p className='text-center para mt-3'> 
          Prompt veterinary diagnosis and treatment</p>
          <p className='text-center'> is essential in minimising any impact of pain, injury or disease</p>
        
          </div>
          
          <div className='w-50 h-100 '>
            <img src={require('../../assets/images/slickvet3.jpg')} alt="" />
          </div>
         
        </div>
  
      </div>
      <section className='petsSSection container mt-5 '>
        <div className="Amainpetstart d-flex ">

          <div className="w-50  startLeft  d-flex  justify-content-center align-items-center">
            <div className='cart-bycecle' ><i className="fa-solid fa-cart-shopping"></i></div>
          <div className='ms-3'><h2>Buy your pets</h2></div>  
          </div>
          <Link to={'/addpet'} className="w-50 d-flex  startRight justify-content-between align-items-center ">
       <div className='d-flex align-items-center ms-3 '>
        <div> <i class="fa-solid fa-dog Adog"></i></div>
        <div className=''><h2>Sell your pets</h2></div>  
       </div>   
       <div><i className="fa-solid fa-arrow-right Arrow"></i></div>

          </Link>

        </div>
        
        <div className="container position-relative mt-5 ">
        <div className="row ">
          {
            Accepetedpet.map((pet,index)=>{
                
             return <div key={index} className="col-md-3 pet ">
              <div className='ov'>
              <Link to={`/petDetails/${pet.id}`}>
               
               <div className='mx-auto'>
                 <figure>
                 {
                  pet.images[0]?.imageUrl ? 
                 
                  <img className='w-100 imgborder' src={`http://fluffypet.runasp.net/${pet.images[0]?.imageUrl}`} alt={pet.title} height={'200px'} />
                       
               
                  :
                  <img className='w-100 imgborder' src={'noImg'} />
                  }  
                   </figure>
                 <h3 className='h6 my-2 text-main'>{pet.title}</h3>
                 <h4 className='h6'>{pet.price} <i className="fa-solid fa-sterling-sign "></i></h4> 
                 
                 
               
               </div> 
               </Link> 
               <button onClick={()=>addProdToCart(pet.id,true)} className='btn bg-main text-white my-3 m-auto d-block'>+ add to cart</button>

              </div>
              
               
           </div>
             }) 
           }
           
        </div>
       
      <div className='position-absolute next start-50 translate-middle mt-5 '>
      <button  className='btn btn-outline-warning mx-1 ' onClick={() => handlePageChanges(currentPage - 1)}>Previous</button>
      <button  className='btn btn-outline-warning mx-1' onClick={() => handlePageChanges(currentPage + 1)}>Next</button>
      </div>
     
  </div>

      </section>

      <section className='doccartma container pb-5  '>
      <div className="doctortitle d-flex justify-content-center align-items-center   ">
        <div  className='h1'><i className="fa-solid fa-house-chimney-medical Adochouse  "></i></div>
        <div  className='Adochouse ms-2'><h1>veterinary</h1></div>
        </div>  
<div className="row   ">

{AllVet.map((user)=>{ return<>
         
  <div className="col-md-4 mt-5"  key={user.id}>
<div>
<div  className="doccaet dochome " style={{height:'300px', width:'280px'}} >
<Link to={'/OneDoctor/'+user.id}>
<img src={'http://fluffypet.runasp.net/' + user.photo} className=' w-100 h-100 border border-bottom-3 ' alt="" />
        </Link>
<div class=" card-body doccaet  w-100 ">
<div className="d-flex justify-content-between align-items-center pt-2 pb-2">
<h5 class="ms-2 card-title texttitle "><span className='texttitle'>Doctor: </span>{user.firstName+" "+user.lastName}</h5>
<button  className='btn btn-warning text-white me-2 '> <a href={`https://wa.me/+20${user.phoneNumber}`} target='_blank' className='text-white'> <span>chat</span> <i className="fa-brands fa-whatsapp "></i></a> </button>
</div>



</div>
</div>
</div>
</div>
</>




})}
</div>
</section>
<div className="Arate mt-5 d-flex justify-content-around align-items-center ">

<div className="Ausers">
<h1><i className="fa-solid fa-users APlus"></i></h1>

<div className="Acount d-flex justify-content-center align-items-center">
 <div><i class="fa-solid fa-plus  dAPlus "></i></div>  
<div className='text-white'><h2>800</h2></div>

</div>
</div>
<div className="Apets">
<i className="fa-solid fa-cat APlus"></i>
<div className="Acount d-flex justify-content-center align-items-center">
<div><i class="fa-solid fa-plus   dAPlus" ></i></div>  
<div className='text-white'><h2>500</h2></div>
</div>
</div>
<div className="Avetrenary">
<i className="fa-solid fa-stethoscope APlus"></i>
<div className="Acount d-flex justify-content-center align-items-center">
<div><i class="fa-solid fa-plus   dAPlus" ></i></div>  
<div className='text-white'><h2>50</h2></div>
</div>
</div>
<div className="Aproduct">
<i className="fa-brands fa-shopify APlus ms-3"></i>
<div className="Acount d-flex justify-content-center align-items-center">
<div><i class="fa-solid fa-plus   dAPlus" ></i></div>  
<div className='text-white'><h2>200</h2></div>
</div>
</div>
</div>
  <section className='AProducts  pb-5' >
  <div className="Amainpetstart d-flex mt-5 container ">

<div className="w-50  startLeft  d-flex  justify-content-center align-items-center">
  <div className='cart-bycecle' ><i className="fa-solid fa-cart-shopping"></i></div>
<div className='ms-3'><h2>Buy your product</h2></div>  
</div>
<Link to={'/addProduct'} className="w-50 d-flex  startRight justify-content-between align-items-center ">
<div className='d-flex align-items-center ms-3 '>
<div> <i className="fa-brands fa-shopify APlus ms-3"></i></div>
<div className='ms-3 mt-2'><h2>Sell your product</h2></div>  
</div>   
<div><i className="fa-solid fa-arrow-right Arrow"></i></div>

</Link>

</div>
<div className='mt-5'>
<GetProducts/>
</div>

  </section>
  




    </>
    
  )
}


















//



  {/* <div className="row">
        {AllVet.map((user)=>{
          return<>
          <div className="col-md-4" key={user.id}>
 <div  class="doccaet " style={{height:'300px', width:'340px'}} >
  <img src={'http://fluffypet.runasp.net/' + user.photo} className=' w-100 h-100 border border-bottom-3 ' alt="" />
  <div class=" card-body doccaet  w-100 ">
    <div className="d-flex justify-content-between align-items-center pt-2 pb-2">
    <h5 class="ms-2 card-title texttitle "><span className='texttitle'>Doctor: </span>{user.firstName+" "+user.lastName}</h5>
    <button  className='btn btn-success text-white me-2 '> <a href={`https://wa.me/+20${user.phoneNumber}`} target='_blank' className='text-white'> <span>chat</span> <i className="fa-brands fa-whatsapp "></i></a> </button>
    </div>
    
   
  
  </div>
 </div>
</div>
          </>
 
        })}
      </div> */}




      
      {/* <div className="row   text-center">
    <h2  className={homecss.docword}>Gallery</h2>
      {Accepetedproductt?.map(product=>{
        return<>
        <div className="col-md-3">
        <div className={homecss.card }>
<div className={homecss.image}>
<img src={`http://fluffypet.runasp.net/`+product.images[0].imageUrl} className='w-100  h-100  '  alt="" />

    <div className={homecss.txt}>
        <div className={homecss.icons}>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-pinterest"></i>
            <i className="fa-brands fa-linkedin"></i>
        </div>
    </div>
</div>
</div>
         
 <div className={homecss.cardbody}>
  <div className={homecss.prodtext}>
  <h3> Honer:{` `+product.userName+` `}</h3>
  <h3> product:{` `+product.name+` `}</h3>
  <h3> category:{` `+product.categoryName+` `}</h3>
  <h3> price:{` `+product.price+` `}</h3>
 
  
  </div>
  <button  className={homecss.btn}>Buy</button>
  
 
 </div>
        </div>
        
        </>
      })}
        
        </div> */}



        {/* <div className='position-absolute top-100 start-50 translate-middle pagination'>
      <button  className='btn btn-dark ' onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
      <button  className='btn btn-dark ' onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div> */}
