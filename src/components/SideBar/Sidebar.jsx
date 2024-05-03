import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const Nav  = styled.nav`
  width: 100%;
  height: 65px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background: rgb(3, 0, 31);
  // border-bottom: 1px solid rgb(100, 100, 100);
  color: white;
  z-index: 3;
  transition: all 0.3s ease;

  // .logo {
  //   padding: 18px 18px;
  //   font-weight: 800;
  //   font-size: 2.5rem;
  // }
`;

const Sidebar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <>
    <Nav navbar={`${navbar}`}>
      {/* <div className="logo">Quizzy</div> */}
      <Icon />
    </Nav>
    </>
  );
};

export default Sidebar;