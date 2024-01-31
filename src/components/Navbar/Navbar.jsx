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
      
      
      <Burger />
      
    </Nav>
  );
};

export default Navbar;