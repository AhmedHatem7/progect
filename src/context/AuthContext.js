import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const authContext=createContext()


export default function AuthContextProvider({children}) {
    const [token,setToken]=useState(null)                         
    
    //handle user refresh 
    // اول ما يحصل ريفريش كأن البروجيكت بيشتغل من الاول يعني هيخلي التوكن بالقيمة الابتدائية فاضية
    // use effect هو الحاجة اللي بتتنفد اما اكريت البروجيكت
    
    const val = localStorage.getItem('tkn')

    useEffect(()=>{
      if (val!=null){
        setToken(val)

      }

    },[])

  return  <authContext.Provider value={{token,setToken}}>
      {children}
    </authContext.Provider>
  
}
