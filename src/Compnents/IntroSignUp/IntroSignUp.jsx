import React from 'react'
import style from "./style.module.css"
import { useNavigate } from 'react-router-dom'
export default function IntroSignUp() {
  let navigate=useNavigate()
  return (
    <>
      <div className={`${style.div}  `}>
        <div className="container">
        <div className="row  ">
          <div  className={`${style.vet} ${style.box} col-md-4 m-5 `}>
              <div className=''>
                {/* <h3 className={style.title}>Veterinarian Dr</h3> */}
               
                <button onClick={()=>navigate('/vetregister')} className={`${style.buttonn}  ` }>Go as a doctor</button>
              
                <img 
              loading="lazy"
              srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/e110848168d4af25b32a6467892a7f131eb41c3cd678269eb77f5ca9da9a29e3?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e110848168d4af25b32a6467892a7f131eb41c3cd678269eb77f5ca9da9a29e3?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e110848168d4af25b32a6467892a7f131eb41c3cd678269eb77f5ca9da9a29e3?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e110848168d4af25b32a6467892a7f131eb41c3cd678269eb77f5ca9da9a29e3?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e110848168d4af25b32a6467892a7f131eb41c3cd678269eb77f5ca9da9a29e3?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e110848168d4af25b32a6467892a7f131eb41c3cd678269eb77f5ca9da9a29e3?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e110848168d4af25b32a6467892a7f131eb41c3cd678269eb77f5ca9da9a29e3?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e110848168d4af25b32a6467892a7f131eb41c3cd678269eb77f5ca9da9a29e3?apiKey=e0cc20aac9224525bd5bb3c74a1747db&"
            className='w-100 p-2'
            />
              </div>
         </div>
        <div className={`${style.vet} ${style.box}  col-md-4 m-5 `}>
              <div className=''>
                {/* <h3 className={style.title}>Find A Pet</h3> */}
                <button onClick={()=>navigate('/userregister')} className={`${style.buttonn}  ` }>Go as a user</button>
                <img
              loading="lazy"
              srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/ba73202bda9ebfa2b11f00cf1ed5bbd959c5040a4cbbbbc0915b69257580768a?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba73202bda9ebfa2b11f00cf1ed5bbd959c5040a4cbbbbc0915b69257580768a?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba73202bda9ebfa2b11f00cf1ed5bbd959c5040a4cbbbbc0915b69257580768a?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba73202bda9ebfa2b11f00cf1ed5bbd959c5040a4cbbbbc0915b69257580768a?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba73202bda9ebfa2b11f00cf1ed5bbd959c5040a4cbbbbc0915b69257580768a?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba73202bda9ebfa2b11f00cf1ed5bbd959c5040a4cbbbbc0915b69257580768a?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba73202bda9ebfa2b11f00cf1ed5bbd959c5040a4cbbbbc0915b69257580768a?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba73202bda9ebfa2b11f00cf1ed5bbd959c5040a4cbbbbc0915b69257580768a?apiKey=e0cc20aac9224525bd5bb3c74a1747db&"
            className='w-100 p-2'
            />              </div>
         </div>
        
        {/* <div classNameName="col-md-3 m-4 ">
              <div classNameName='bg-warning'>
                <h3>Veterinarian Dr</h3>
                <button classNameName='btn btn-warning'>Go as a doctor</button>
                <img
              loading="lazy"
              srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/472a1408be8314719e2e6a973dde51fb0ec3e7523f978732fb7d8e33ec24b64e?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/472a1408be8314719e2e6a973dde51fb0ec3e7523f978732fb7d8e33ec24b64e?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/472a1408be8314719e2e6a973dde51fb0ec3e7523f978732fb7d8e33ec24b64e?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/472a1408be8314719e2e6a973dde51fb0ec3e7523f978732fb7d8e33ec24b64e?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/472a1408be8314719e2e6a973dde51fb0ec3e7523f978732fb7d8e33ec24b64e?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/472a1408be8314719e2e6a973dde51fb0ec3e7523f978732fb7d8e33ec24b64e?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/472a1408be8314719e2e6a973dde51fb0ec3e7523f978732fb7d8e33ec24b64e?apiKey=e0cc20aac9224525bd5bb3c74a1747db&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/472a1408be8314719e2e6a973dde51fb0ec3e7523f978732fb7d8e33ec24b64e?apiKey=e0cc20aac9224525bd5bb3c74a1747db&"
            //   className={style.img}
            className='w-50'
            />
              </div>
         </div> */}
        </div>
        </div>
        
      </div>





   
    </>
  )
}
