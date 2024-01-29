import React, { useState } from 'react';
import styled from 'styled-components';
import LeftSideBar from './LeftSideBar';
import { faCommentDots, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledIcon = styled.div`
  // width: 2rem;
  // height: 2rem;
  // padding: 10px;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 5;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
`;

const Icon = () => {
  const [open, setOpen] = useState(true)
  
  return (
    <>
      <StyledIcon open={open} onClick={() => setOpen(!open)}>
        {!open? <FontAwesomeIcon icon={faXmark} style={{fontSize: "4rem"}}/> :
      <FontAwesomeIcon icon={faCommentDots} style={{fontSize: "4rem"}} />}
      
      </StyledIcon>
      {/* <button open={open} onClick={() => setOpen(!open)}>
        
      </button> */}
      <LeftSideBar open={open}/>
    </>
  )
}

export default Icon