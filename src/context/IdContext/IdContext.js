import React, { createContext, useState } from 'react'

export const idContext=createContext()

export default function IdContextProvider({children}) {
    const [Vetid, setVetid] = useState('ay hagaa')
    const [userId,setUserId]=useState('null')
    const [petId,setPetId]=useState('')
    const [IntentId,setIntentId]=useState('')
   
    console.log('id',userId)
  return <idContext.Provider value={{Vetid, setVetid,userId,setUserId,petId,setPetId,IntentId,setIntentId}}>
   
{children}
  </idContext.Provider>
}



