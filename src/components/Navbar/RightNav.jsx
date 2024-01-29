import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  z-index: 4;
  position: fixed;
  top: 0;
  right: 0;

  li {
    padding: 18px 38px;
    font-weight: 400px;
    font-size: 1.75rem;
    color: #fff;
  }

  li a {
    color: #fff;
  }

  a.button {
    padding: 10px 20px;
    background: white;
    color: #0D2538;
    border-radius: 30px;
    
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #fff;
      padding-left: 30px;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <li><a href='/'>Home</a></li>
      
      <li><a href='/about'>About</a></li>
      <li><a href='/form'>Chat</a></li>
      <li><a href='/faqs'>FAQs</a></li>
    </Ul>
  )
}

export default RightNav