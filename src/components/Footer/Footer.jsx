import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Wave from '../../assets/wave.png'

const Footer = () => {
    const iconStyle ={
        color: '#fff',
        height: '20px',
        paddingRight: '5px',
        paddingTop: '5px'
    }

  return (<>
    <section style={{height: "130px", background:'var(--text-color)', marginBottom: '-2px'}}>
         <div className='wave wave1'></div>
         <div className='wave wave2'></div>
         <div className='wave wave3'></div>
         <div className='wave wave4'></div>
     </section>
    <footer className='footer'>
    {/* <div className='wave wave1'></div>
         <div className='wave wave2'></div>
         <div className='wave wave3'></div>
         <div className='wave wave4'></div> */}
        <div className="container">
            <div className="row">
                {/* <div className='footer-col'> 
                <img src={logo} alt="" /> */}
                {/* <div className="logo">Safwa Academy</div>  */}
                {/* <p>Inspiring the next generation</p> */}
                {/* </div> */}
                <div className="footer-col">
                    <h4>Get in Touch</h4>
                    <ul className='contacts'>
                         <li><Link to="Tel:07401353144"><FontAwesomeIcon icon={faPhone} style={iconStyle}/>Phone</Link></li>
                        <li><Link to="mailto:info@safwaacademy.co.uk"><FontAwesomeIcon icon={faEnvelope} style={iconStyle}/>Email</Link></li> 
                        <li><Link to="https://api.whatsapp.com/send?phone=+447401353144" target='_blank'><FontAwesomeIcon icon={faWhatsapp} style={iconStyle}/>WhatsApp</Link></li>
                        {/* <li><Link to="#"><FontAwesomeIcon icon={faPhone} />Phone</Link></li>
                        <li><Link to="#"><FontAwesomeIcon icon={faEnvelope} />Email</Link></li> 
                        <li><Link to="#"><FontAwesomeIcon icon={faWhatsapp} />WhatsApp</Link></li>                         */}
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Institute</h4>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/courses">Our Courses</Link></li>
                        <li><Link to='/termdates' target='_blank'>Term Dates</Link></li>
                        <li><Link to="https://form.jotform.com/212725309811351">Register</Link></li>
                        <li><Link to='/courses#fees'>Fees</Link></li>
                        
                        {/* <li><Link to="/blog">News</Link></li> */}
                        
                    </ul>
                </div>

                <div className="footer-col">
                    <h4><Link to="/policies">Policies</Link></h4>
                    <ul>
                        <li><Link to="/policies/enrolment">Enrolment Policy</Link></li>
                        <li><Link to="/policies/uniform">Uniform Policy</Link></li>
                        <li><Link to="/policies/behaviour">Behaviour Policy</Link></li>
                        <li><Link to="/policies/privacy">Privacy Policy</Link></li>
                        <li><Link to="/policies/tncs">Terms & Conditions</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Follow Us</h4>
                    <ul className='social-links'>
                        <li><Link to="#"><FontAwesomeIcon icon={faFacebook} /></Link></li>
                        <li><Link to="#"><FontAwesomeIcon icon={faInstagram} /></Link></li>
                        <li><Link to="#"><FontAwesomeIcon icon={faTwitter} /></Link></li>
                        <li><Link to="#"><FontAwesomeIcon icon={faLinkedin} /></Link></li>
                    </ul>
                </div>
            </div>
        </div>
<div className='container'>
    <div className='copyright'>
        Copyright ©2024 As-Safwah Academy | All Rights Reserved
    </div>
</div>
    </footer>
    </>
   
  )
}

export default Footer

// import styles from "./FooterStyle";
// // import { logo } from "../assets";
// import { footerLinks, socialMedia } from "../../constants";

// const Footer = () => (
//   <footer className={`${styles.flexCenter} ${styles.paddingY} flex-col footer`} style="background: black">
//     <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
//       <div className="flex-[1] flex flex-col justify-start mr-10">
//         <h1>Safwa Academy</h1>
//         <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
//           Inspiring the next generation.
//         </p>
//       </div>

//       <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
//         {footerLinks.map((footerlink) => (
//           <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
//             <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
//               {footerlink.title}
//             </h4>
//             <ul className="list-none mt-4">
//               {footerlink.links.map((link, index) => (
//                 <li
//                   key={link.name}
//                   className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
//                     index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
//                   }`}
//                 >
//                   {link.name}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>

//     <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
//       <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
//         Copyright Ⓒ 2023 Safwa Academy. All Rights Reserved.
//       </p>

//       <div className="flex flex-row md:mt-0 mt-6">
//         {socialMedia.map((social, index) => (
//           <img
//             key={social.id}
//             src={social.icon}
//             alt={social.id}
//             className={`w-[21px] h-[21px] object-contain cursor-pointer ${
//               index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
//             }`}
//             onClick={() => window.open(social.link)}
//           />
//         ))}
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;
