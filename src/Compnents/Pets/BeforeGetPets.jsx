import React, { useContext } from 'react'
import dog from "../../assets/images/dog2.png"
import cat from "../../assets/images/3..png"
import bird from "../../assets/images/4...png"
import fish from "../../assets/images/fish.png"
import axios from 'axios'
import { useQuery } from 'react-query'
import { speciesContext } from '../../context/Species'
import { Link } from 'react-router-dom'
export default function BeforeGetPets() {

   const {species ,setSpecies}=useContext(speciesContext)
  return <>
  <Link>
  <div className="container ">
        <div className="row ">
            <div className="col-md-4 gy-2">
                <div className='box-white'>
                    <h3 className='textcatalog '> Go to catalog</h3>
                  <span className='icon p-2'> <i class="fa-solid fa-arrow-right"></i> </span>  
                </div>
            </div>
            <div className="col-md-4 gy-2 birdbox">
                <div className='box-beige'>
                    .
                <h3 className='texttt'>Dogs</h3>
                <div className='dog'>
                <img src={dog} className='w-100' alt='' style={{height:'300px'}}/>
                  
                </div>
                </div>
               
            </div>
            <div className="col-md-4 gy-2 birdbox">
                <div className='box-beige'>
                    .
                <h3 className='txt'>Fish</h3>
                <div className='fish '>
                <img src={fish} className='w-75' alt='' style={{height:'300px'}}/>
                  
                </div>
                </div>
                
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 gy-4 birdbox">
                <div className='box-beige'>
                    .
                   <div className='textt'>
                   <h3 >Cats</h3>
                   </div>

                   <div className='cat '>
                   <img src={cat} className='w-100' alt='' style={{height:'360px'}}/>
                   </div>
                </div>
            </div>
            <div className="col-md-6 gy-4 birdbox">
                <div className='box-orange'>
                    .
                    <div className='textt text-white'>
                    <h3>Birds</h3>
                        
                    </div>
                    <div className='bird'>
                    <img src={bird} className='w-100 ' alt='' style={{height:'360px'}} />
                    </div>
                </div>
            </div>
        </div>
      </div>
  </Link>
 
    </>
  
}
