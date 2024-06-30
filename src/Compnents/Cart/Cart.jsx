import React, { useContext } from 'react'
import { cartContext } from '../../context/CartContext'
import { FallingLines } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import noImg from '../../assets/images/no-image-icon-15.png'
import { Link } from 'react-router-dom'

export default function Cart() {
    const{numOfCartItems,allProducts,deleteProduct,clearCart,updateCount}=useContext(cartContext)
    console.log('allProducts',allProducts)
    console.log('numOfCartItems',numOfCartItems)

  
  if(!allProducts){
    return <div className='d-flex vh-100  bg-opacity-50 justify-content-center align-items-center' >
  <FallingLines
            color="#F9BA1D"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
       />
    </div>
  }

  
  async function updateProductCount(id,newCount,bool){
    const res=await updateCount(id,newCount,bool)
    if (res){
     toast.success('cart updated successfully.',{position:'top-center'})
   }
   else{
     toast.error('error occured.',{position:'top-center'})
 
   }
   }
 
  async function deleteProductCart(productId){
   const deleteProd=await deleteProduct(productId)
   if (deleteProd){
    toast.success('product deleted from cart.',{position:'top-center'})
  }
  else{
    toast.error('error occured.',{position:'top-center'})
  }
  }
  const products=allProducts.filter((product)=>{return product.petId <1 }  )
  console.log('pepe',products)
  const pets=allProducts.filter((pet)=>{return pet.petId >0 }  )
  console.log('peto',pets)
  return <>
      
      {allProducts.length?  <div className="container">
        <h1>Shopping bag</h1>
        <button onClick={clearCart} className='btn btn-outline-danger'>clear</button>

        { pets.length?  pets.map((pet,index)=> <div key={index} className="row border-2 border-bottom  py-3 my-2  deleteIconBox">
              <div className="col-md-1 ">
                 <figure>
                {
                 pet.petImages[0].imageUrl ? 
                 <img className='w-100 imgborder' src={`http://fluffypet.runasp.net${pet.petImages[0]?.imageUrl}`} alt='' />
                 :
                 <img className='w-100 imgborder' src={noImg} />
                 }  
                  </figure>
              </div>
             <div className="col-md-7">
               <div >
               {/* <h4>{pet.productName}</h4> */}
               <h6 className='priceColor'>price: {pet.unitPrice} Egp</h6>
                 </div>
                
              </div>
               <div className="col-md-2">
                   <div className='d-flex justify-content-between countBorder '>

                   <button disabled={pet.quantity == 1} onClick={()=>updateProductCount(pet.petId,pet.quantity -1,true)}  className='btn btnDecoration '>
                  <i className="fa-solid fa-minus"></i>
                  </button>

                   <h3>{pet.quantity}</h3>
                   <button onClick={()=>updateProductCount(pet.petId,pet.quantity +1,true)} className='btn btnDecoration'>
                   <i className="fa-solid fa-plus"></i>
                   </button>
                   </div>
                  
              </div>
              
               <div className="col-md-2 d-flex align-items-center ">
                 <div>
                   <h5 ><span> {pet.quantity * pet.unitPrice} Egp  </span> </h5>
                   <button onClick={()=>deleteProductCart(pet.petId)} className='btn'> 
                 <i className="fa-solid fa-xmark deleteIcon"></i>
                 </button>
                 </div>
               </div>
             
           </div>
         ) : <h3>no pets</h3>
        }
        { products.length?  products.map((product,index)=> <div key={index} className="row border-2 border-bottom  py-3 my-2  deleteIconBox">
              <div className="col-md-1 ">
                 <figure>
                {
                 product.productImages[0].imageUrl ? 
                 <img className='w-100 imgborder' src={`http://fluffypet.runasp.net${product.productImages[0]?.imageUrl}`} alt={product.productName} />
                 :
                 <img className='w-100 imgborder' src={noImg} />
                 }  
                  </figure>
              </div>
             <div className="col-md-7">
               <div >
               <h4>{product.productName}</h4>
               <h6 className='priceColor'>price: {product.unitPrice} Egp</h6>
                 </div>
                
              </div>
               <div className="col-md-2">
                   <div className='d-flex justify-content-between countBorder '>

                   <button disabled={product.quantity == 1} onClick={()=>updateProductCount(product.productId,product.quantity -1,false)}  className='btn btnDecoration '>
                  <i className="fa-solid fa-minus"></i>
                  </button>

                   <h3>{product.quantity}</h3>
                   <button onClick={()=>updateProductCount(product.productId,product.quantity +1,false)} className='btn btnDecoration'>
                   <i className="fa-solid fa-plus"></i>
                   </button>
                   </div>
                  
              </div>
              
               <div className="col-md-2 d-flex align-items-center ">
                 <div>
                   <h5 ><span> {product.quantity * product.unitPrice} Egp  </span> </h5>
                   <button onClick={()=>deleteProductCart(product.productId)} className='btn'> 
                 <i className="fa-solid fa-xmark deleteIcon"></i>
                 </button>
                 </div>
               </div>
             
           </div>
         ) : <h3>no products</h3>
        }

        
      
      
        </div>



   :<h1>your cart is empty</h1>
      }


      {/* {allProducts.length?  <div className="container">
         <h1>Shopping bag</h1>
         <button onClick={clearCart} className='btn btn-outline-danger'>clear</button>
         {allProducts.map((product,index)=> <div key={index} className="row border-2 border-bottom  py-3 my-2  deleteIconBox">
              <div className="col-md-1 ">
                 <figure>
                {
                 product.petImages[0].imageUrl ? 
                 <img className='w-100 imgborder' src={`http://fluffypet.runasp.net${product.petImages[0]?.imageUrl}`} alt={product.productName} />
                 :
                 <img className='w-100 imgborder' src={noImg} />
                 }  
                  </figure>
              </div>
             <div className="col-md-7">
               <div >
               <h4>{product.productName}</h4>
               <h6 className='priceColor'>price: {product.unitPrice} Egp</h6>
                 </div>
                
              </div>
               <div className="col-md-2">
                   <div className='d-flex justify-content-between countBorder '>

                   <button disabled={product.quantity == 1} onClick={()=>updateProductCount(product.productId,product.quantity -1)}  className='btn btnDecoration '>
                  <i className="fa-solid fa-minus"></i>
                  </button>

                   <h3>{product.quantity}</h3>
                   <button onClick={()=>updateProductCount(product.productId,product.quantity +1)} className='btn btnDecoration'>
                   <i className="fa-solid fa-plus"></i>
                   </button>
                   </div>
                  
              </div>
              
               <div className="col-md-2 d-flex align-items-center ">
                 <div>
                   <h5 ><span> {product.quantity * product.unitPrice} Egp  </span> </h5>
                   <button onClick={()=>deleteProductCart(product.productId)} className='btn'> 
                 <i className="fa-solid fa-xmark deleteIcon"></i>
                 </button>
                 </div>
               </div>
             
           </div>
         )}
       
       </div>
        :<h1>your cart is empty</h1>} */}
      
    </>
  
}
