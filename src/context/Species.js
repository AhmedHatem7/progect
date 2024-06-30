import React, { createContext, useState } from 'react'
 

export const speciesContext=createContext()
export default function SpeciesProvider({children}) {
    const [species,setSpecies]=useState()
  return  <speciesContext.Provider value={{species,setSpecies}}>
      {children}
    </speciesContext.Provider>
  
}
