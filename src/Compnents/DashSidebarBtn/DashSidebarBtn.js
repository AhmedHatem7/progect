//  import React, { createContext, useState } from 'react'
//  export const buttonDashMenu=createContext()

import { createContext, useState } from "react"

//  export default function buttonDashMenuProvider({children}) {
//     const [Open, setisopen] = useState(true)
//    return <buttonDashMenu.Provider value={{Open, setisopen}}>
   
//  {children}
//    </buttonDashMenu.Provider>
  
//  }

export const ButtonContext=createContext()
export default function ButtoProvider({children}){
    const [open, setopen] = useState(true)
    return<ButtonContext.Provider value={{open, setopen}}>
        {children}
    </ButtonContext.Provider>
}