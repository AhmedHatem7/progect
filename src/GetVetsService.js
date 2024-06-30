import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export let AllService = createContext(0)

export default function AllServiceprovider({children}) {
    const [vetService, setvetService] = useState([]);
    const token = localStorage.getItem('Token')

    async function getVetsService() {
        try {
            const response = await axios.get(`http://fluffypet.runasp.net/api/Vets/GetAllVetServices`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setvetService(response.data); // Access the 'data' property of the response
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getVetsService();
    }, []);

    return (
        <AllService.Provider value={{getVetsService, vetService, setvetService}}>
            {children}
        </AllService.Provider>
    )
}