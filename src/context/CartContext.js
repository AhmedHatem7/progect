import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthContext';

export const cartContext=createContext()

export default function CartContextProvider({children}) {

  const [numOfCartItems,setNumOfCartItems]=useState(0);
  const [allProducts,setAllProducts]=useState(null);
  const{token}=useContext(authContext);
const [cartId,setCartId]=useState(null);
  
   const tkn=localStorage.getItem('tkn')
  

   function getTotalItems(){
          axios.get('http://fluffypet.runasp.net/api/Cart/GetTotalItemInCart',{headers:{
          Authorization: `Bearer ${tkn}`,
          
        }}).then((res)=>{
           console.log(res.data)
           setNumOfCartItems(res.data)
           
        }).catch((error)=>{
          console.log(error)
        })
      }

  async function addToCart(id,isPet ){
       try{
        const  queryParams= new URLSearchParams({
          itemId:id,
          isPet   
        })
                        let response = await axios.post(`http://fluffypet.runasp.net/api/Cart/AddItem?${queryParams.toString()}`,{
                          productId:id},{
                          headers:{
                            Authorization: `Bearer ${tkn}`,
          
                          }
                        });
        getTotalItems()
        setAllProducts(response.data.cartDetails)
        console.log('added to cart success',response)
      
        return response;
    
       } catch(error){
         console.log('err',error)
       }
      }
  
      async function updateCount(id,newCount,bool){
       
        const  queryParams= new URLSearchParams({
          itemId:id,
           qty:newCount,
           isPet:bool
       })
        const booleanFlag=await axios.post(`http://fluffypet.runasp.net/api/Cart/AddItem?${queryParams.toString()}`,{
          "qty": newCount},{
          headers:{
            Authorization: `Bearer ${tkn}`,

          }
        }).then((response)=>{                                                                                               
          getTotalItems()
          setAllProducts(response.data.cartDetails)
          console.log('added to cart success',response)
               //عشان اما استخدم ال فانكشن دي ف مكان تاني ابقا عارفة انا دخلت ف انهي سكوب واعمل اللوجيك
               return true;
         }).catch((error)=>{
            console.log(error)
            return false;
         })
     
         return booleanFlag;
       }


      function userCart(){
        axios.get('http://fluffypet.runasp.net/api/Cart/GetUserCart',{headers:{
                           Authorization: `Bearer ${tkn}`,
                           
                          }})
        .then((res)=>{
           console.log('rese',res)
           setAllProducts(res.data.cartDetails)
           getTotalItems()
           setCartId(res.data.id)
            
        }).catch((err)=>{
         console.log(err)
        })
      }
      useEffect(()=>{
        userCart()
      
      },[token])
    
      async function deleteProduct(productId){
        const booleanFlag=await axios.delete(`http://fluffypet.runasp.net/api/Cart/RemoveItem/${productId}`,{headers:{
                Authorization: `Bearer ${tkn}`,
                
               }}).then((response)=>{
           console.log('reso',response.data)
         //to set all products and cart items
          userCart()
    
           return true;
        }).catch((error)=>{
             console.log(error)
             return false;
        })
        return booleanFlag;
      }

      async function clearCart(){
            const booleanFlag=await axios.delete(`http://fluffypet.runasp.net/api/Cart/ClearCart`,{headers:{
                     Authorization: `Bearer ${tkn}`,
                    
                   }}).then((response)=>{
               console.log('clear',response.data)
        
               setNumOfCartItems( 0)
               setAllProducts([])
        
               return true;
            }).catch((error)=>{
                 console.log(error)
                 return false;
            })
            return booleanFlag;
          }
          return <cartContext.Provider value={{addToCart,numOfCartItems,allProducts,deleteProduct,clearCart,userCart,updateCount}}>
          {children}
        </cartContext.Provider>
  
}
