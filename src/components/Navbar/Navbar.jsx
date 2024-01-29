// import React, { useState } from 'react';
// import 'boxicons';
// import './Navbar.css';

// const Navbar = ({homePage}) => {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   /*============ sticky navbar ==============*/
// //  let header = document.querySelector('.header');

// //  header.classList.toggle('sticky', window.scrollY > 100);

// //  /*============ dark light mode ==============*/
// // let darkModeIcon = document.querySelector('#darkMode-icon');

// // darkModeIcon.onclick = () => {
// //     darkModeIcon.classList.toggle('bx-sun');
// //     document.body.classList.toggle('dark-mode');
// // }

//   const styles = {
//     navbar: {
//       display: 'flex',
//       width: '100%',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '20px',
//       background: homePage ? 'transparent' : '#333',
//       color: '#fff',
//     },
//     logoContainer: {
//       marginRight: '20px',
//     },
//     logo: {
//       width: '50px', // Adjust the size as needed
//       height: '50px', // Adjust the size as needed
//     },
//     menuIcon: {
//       cursor: 'pointer',
//       display: 'none',
//     },
//     navList: {
//       listStyle: 'none',
//       display: 'flex',
//       alignItems: 'center',
//     },
//     navListItem: {
//       marginLeft: '20px',
//     },
//   };

//   const menuIcon = {
//     // fontSize: '3.6rem',
//     color: 'var(--text-color)',
//     display: 'none',
//   }

//   const moonIcons = {
//     // fontSize: '2.4rem',
//     color:'var(--white-color)',
//     cursor: 'pointer',
//   }

//   return (
//     <header className="header">
//         <a href="/" class="logo">Safwa Academy</a>
//         {/* <img src="images/L.png" class="logo" style="width: 5rem; height: auto;"> */}

//         <nav className="navbar">
//             <a href="/" className="active">HOME</a>
//             <a href="/about">ABOUT</a>
//             <a href="/register">REGISTER</a>
//             <a href="/blog">BLOG</a>
//             <a href="/contact">CONTACT</a>
//         </nav>

//         {/* <div className="bx bx-moon" id="darkMode-icon"></div>
//         <div className="bx bx-menu" id="menu-icon"></div> */}
//         {/* <box-icon  name="moon" className="moonIcon" id="darkMode-icon"></box-icon> */}
//         <box-icon  name="menu" className="menuIcon" id="menu-icon"></box-icon>

//     </header>
//     // <nav style={styles.navbar}>
//     //   {/* <div style={styles.logoContainer}>
//     //     <img src="path/to/your/logo.png" alt="Logo" style={styles.logo} />
//     //   </div> */}
//     //  <h1 className='font-bold text-sm sm:text-xl flex flex-wrap text-color:black'>Pimlico Maktab</h1>
//     //   <div
//     //     className={`menu-icon ${isMobileMenuOpen ? 'open' : ''}`}
//     //     onClick={toggleMobileMenu}
//     //   >
//     //     <div className="bar1"></div>
//     //     <div className="bar2"></div>
//     //     <div className="bar3"></div>
//     //   </div>
//     //   <ul className={`nav-list ${isMobileMenuOpen ? 'open' : ''}`}>
//     //     <li><a href="/">Home</a></li>
//     //     <li><a href="/about">About</a></li>
//     //     <li><a href="/register">Register</a></li>
//     //     <li><a href="/contact">Contact</a></li>
//     //     <li><a href="/sign-in">Sign In</a></li>

//     //     {/* Add more menu items as needed */}
//     //   </ul>
//     // </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import Icon from '../SideBar/Icon';

const Nav  = styled.nav`
  width: 100%;
  height: 6.5rem;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  // left: 20px;
  // background: ${({ navbar }) => (navbar ? 'rgb(3, 0, 31)' : 'transparent')};
  // border-bottom: ${({ navbar }) => (navbar ? '1px solid rgb(100, 100, 100)' : 'none')};
  color: white;
  z-index: 20;
  transition: all 0.3s ease;

  .logo {
    padding: 15px 45px;
    // padding: 18px 18px;
    font-weight: 800;
    font-size: 2.5rem;   
    z-index: 25;
  }
`;

const Navbar = ({page}) => {
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 25) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    window.addEventListener('scroll', changeBackground);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <Nav navbar={`${navbar}`}>
      {/* <Icon /> */}
      {page === 'chatbot'? <Icon /> : <div className="logo">Quizzy</div> }
      
      
      {/* <Burger /> */}
      
    </Nav>
  );
};

export default Navbar;