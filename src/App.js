

import React from 'react'
import SignUp from './Compnents/SignUp/SignUp'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import MainLayOut from './LayOut/MainLayOut/MainLayOut'
import AuthLayOut from './LayOut/AuthLayOut/AuthLayOut'
import SignIn from './Compnents/SinIn/SignIn'
import IntroSignUp from './Compnents/IntroSignUp/IntroSignUp'
import VetSignUp from "./Compnents/VetSignUp/VetSignUp"
import Containue from './Compnents/VetSignUp/Containue'
import { Offline, Online } from "react-detect-offline";
import offlinePic from './assets/images/offline.png'
import ForgotPassword from './Compnents/ForgotPassword/ForgotPassword'
import IdContextProvider from './context/IdContext/IdContext'
import UpdateUserProfile from './Compnents/UpdateUserProfile/UpdateUserProfile'
import { QueryClient,QueryClientProvider } from 'react-query'
import BeforeGetPets from './Compnents/Pets/BeforeGetPets'
import GetPets from './Compnents/Pets/GetPets'
import SpeciesProvider from './context/Species'
import AddPet from './Compnents/Pets/AddPet'
import PetDetails from './Compnents/Pets/PetDetails/PetDetails'
import ProtectedRouts from './Compnents/ProtectedRouts/ProtectedRouts'
import CartContextProvider from './context/CartContext'
import AddProduct from "./Compnents/AddProduct/AddProduct"
import GetProducts from './Compnents/getProducts/GetProducts'
import ProductDetails from './Compnents/ProductDetails/ProductDetails'
import toast, { Toaster } from 'react-hot-toast';
import AuthContextProvider from './context/AuthContext'
import Cart from './Compnents/Cart/Cart'
import Order from './Compnents/Order/Order'
import UserPets from './Compnents/UserPets/UserPets'
import UserProducts from './Compnents/UserProducts/UserProducts'
import UserProfile from './Compnents/UserProfile/UserProfile'
import ViewUserProfile from "./Compnents/ViewUserProfile/ViewUserProfile"
import AddFeedback from './Compnents/AddFeedback/AddFeedback'
import UserFeedbacks from './Compnents/UserFeedbacks/UserFeedbacks'

/*ahmed */



import { ToastContainer } from 'react-toastify';
import Home from './Compnents/Home/Home'
import Doctors from './Compnents/Doctors/Doctors';
import Sginout from './Compnents/Sginout/Sginout';
import Dashbord from './Compnents/Dashboard/Dashbord';
import ButtoProvider from './DashSidebarBtn/DashSidebarBtn';
import Alluser from './Compnents/Alluser/Alluser';
import DashUserDetail from './Compnents/DashUserDetail/DashUserDetail';
import DashAllPet from './Compnents/DashAllPet/DashAllPet';
import DashAllProduct from './Compnents/DashAllProduct/DashAllProduct';
import DashAllVet from './Compnents/DashAllVet/DashAllVet';
import VetsLayout from './Compnents/VetsLayout/VetsLayout';
import AddVetService from './Compnents/AddVetService/AddVetService';
import AddWorkingHours from './Compnents/AddWorkingHours/AddWorkingHours';
import GetVetService from './Compnents/AddVetService/GetVetService';
import AllServiceprovider from './GetVetsService';
import GetVetsWorkhour from './GetVetsWorkhour';
import NewComment from './Compnents/VetComments/NewComment';
import MyComment from './Compnents/VetComments/MyComment';
import OneDoctor from './Compnents/Doctors/OneDoctor';
import Footer from './Compnents/Footer/Footer'
import AdoptionVets from './Compnents/AdoptinVets/AdoptionVets'
import PaymentPage from './Compnents/PaymentPage/PaymentPage'
import Paymentcomplete from './Compnents/PaymentPage/Paymentcomplete'



/*ahmed */



export default function App() {
  const myClient=new QueryClient()
  let routs= createBrowserRouter([
    {path:'/',element:<MainLayOut/>,children:[
      // {index:true,element:<Home/>},
      // {path:'home',element:<Home/>},

      /*ahmed */
      {index:true,element:<Home/>},
      {path:'Home' ,element: <Home/> },     
      {path:'footer' ,element: <Footer/> },     
      {path:'Doctors' ,element: <Doctors/> },
      {path:'Sginout' ,element: <Sginout/> },
      {path:'OneDoctor/:id' ,element: <OneDoctor/>},
      {path:'*',element: <div>Error 404</div>},



      /* ahmed */
      {path:'userProfile',element:<UserProfile/>},
      {path:'beforepets',element:<BeforeGetPets/>},
      {path:'addpet',element:<ProtectedRouts> <AddPet/> </ProtectedRouts>},
      {path:'pets',element:<GetPets/>},
      {path:'petDetails/:id',element:<PetDetails/>},
      {path:'addProduct',element:<AddProduct/>},
      {path:'products',element:<GetProducts/>},
      {path:'productDetails/:id',element:<ProductDetails/>},
      {path:'cart',element:<Cart/>},
      {path:'order',element:<Order/>},
      {path:'userPets',element:<UserPets/>},
      {path:'userProducts',element: <UserProducts/> } ,
      {path:'viewUserProfile/:userId',element:<ViewUserProfile/>},
      {path:'addFeedback/:reviewedUser',element:<AddFeedback/>},
      {path:'myFeedbacks',element:<UserFeedbacks/>},
      {path:'PaymentPage',element:<PaymentPage/>},
      {path:'paymentcomplete',element:<Paymentcomplete/>},
   
      {path: 'AdoptionVets' ,element: <AdoptionVets/>} 
    ]},

    {path:'/',element:<Dashbord/>,children :
      [
      
          {path:'Alluser' ,element: <Alluser/>},
          {path:'DashUserDetail/:id' ,element: <DashUserDetail/>},
          
          {path:'DashAllPet' ,element:  <DashAllPet/>},
          {path:'DashAllProduct' ,element:  <DashAllProduct/>},
          {path:'DashAllVet' ,element:  <DashAllVet/>},
  
  
         {path:'*',element: <div>Error 404</div>}
       ]} ,

       {path:'/',element:<VetsLayout/>,children :
        [
        
          {path: 'AddVetService' ,element: <AddVetService/>},
          {path: 'AddWorkingHours' ,element: <AddWorkingHours/>},
          {path: 'VetsComments' ,element: <NewComment/>},    
          {path: 'AdoptionVets' ,element: <AdoptionVets/>},    
         
    
          
         ]},
    {path:'/',element:<AuthLayOut/>,children:[
      {path:'signin',element:<SignIn/>},
      {path:'forgotPassword',element:<ForgotPassword/>},
      {path:'role',element:<IntroSignUp/>},
      {path:'userregister',element:<SignUp/>},
      {path:'vetregister',element:<VetSignUp/>},
      {path:'containue',element:<Containue/>},
      {path:'updateuseracc',element:<UpdateUserProfile/>}
    ]}
    
  ])
  
  return (
    <>

    <QueryClientProvider client={myClient}>
    <AllServiceprovider>
  <GetVetsWorkhour>
<ToastContainer theme='colored' autoClose='2000'/>
<ButtoProvider>
    <AuthContextProvider>
    <IdContextProvider>
      <CartContextProvider>
      <SpeciesProvider>
      <RouterProvider router={routs}/>
      
      </SpeciesProvider>
      </CartContextProvider>
     
      </IdContextProvider>
    </AuthContextProvider>
    </ButtoProvider>
</GetVetsWorkhour>
</AllServiceprovider>
    </QueryClientProvider>
    <Toaster />
    
   
   
     
   
    </>
  )
}


