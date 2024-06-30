import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export let AllWorkhour = createContext(0)

export default function GetVetsWorkhour({children}) {
    const [WorksHour, setWorksHour] = useState([]);
    const token = localStorage.getItem('Token')

    async function getWorksHour() {
        try {
            const response = await axios.get(`http://fluffypet.runasp.net/api/Vets/GetAllWorkingHours`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setWorksHour(response.data); // Access the 'data' property of the response
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWorksHour();
    }, []);

    return (
        <AllWorkhour.Provider value={{getWorksHour, WorksHour, setWorksHour}}>
            {children}
        </AllWorkhour.Provider>
    )
}