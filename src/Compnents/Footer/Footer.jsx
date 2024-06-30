import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(true);
  };

  useEffect(() => {
    const subscribeAnimation = setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);

    return () => clearTimeout(subscribeAnimation);
  }, [isSubscribed]);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3 className={styles.heading}>
            <span className={styles.headingText}>About</span>
            <div className={styles.headingAnimation} />
          </h3>
          <p className={styles.text}>
            We are a company dedicated to providing high-quality products and
            services to our customers. Our mission is to create innovative
            solutions that make a positive impact on the world.
          </p>
        </div>
        <div className={styles.column}>
          <h3 className={styles.heading}>
            <span className={styles.headingText}>Quick Links</span>
            <div className={styles.headingAnimation} />
          </h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <a href="#" className={styles.link}>
                Home
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="#" className={styles.link}>
                About
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="#" className={styles.link}>
                Products
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="#" className={styles.link}>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3 className={styles.heading}>
            <span className={styles.headingText}>Contact us</span>
            <div className={styles.headingAnimation} />
          </h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <a href="#" className={styles.link}>
                <div className='d-flex align-items-center '>
                    <div  className='h6'> <i class="fa-solid fa-map me-2"></i>
                   </div>
                   <div> <h6>menofia</h6>
                   
                   </div>
                </div>
               
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="#" className={styles.link}>
              <div className='d-flex align-items-center mt-2 '>
                    <div className='h6'> <i class="fa-solid fa-location-dot me-2"></i>
                   </div>
                   <div> <h6>shibinElkom</h6>
                   
                   </div>
                </div>
               
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="#" className={styles.link}>
              <div className='d-flex align-items-center '>
                    <div  className='h6 me-2' > <i class="fa-solid fa-mobile-screen-button"></i>
                   </div>
                   <div> <h6>01096364658</h6>
                   
                   </div>
                </div>
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="#" className={styles.link}>
              <div className='d-flex align-items-center '>
                    <div  className='h6 me-2'><i class="fa-solid fa-envelope"></i>
                   </div>
                   <div> <h6>fluffy@mail.com</h6>
                   
                   </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
         
     
        </div>
      </div>
     <div className="socialmedia d-flex justify-content-center align-items-center ">
      <div className={styles.brdr}> <div className={styles.fb}><i class="fa-brands fa-facebook"></i></div></div>
      <div className={styles.brdr}>  <div className={styles.tw}><i class="fa-brands fa-twitter"></i></div>      </div>
      <div className={styles.brdr}>         <div className={styles.goo}><i class="fa-brands fa-google"></i></div>
      </div>
      <div className={styles.brdr}>         <div className={styles.insta}><i class="fa-brands fa-instagram"></i></div>
      </div>
        
     </div>
      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;