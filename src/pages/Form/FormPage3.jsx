import React, {useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import {faDroplet, faFire, faFireFlameSimple} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const FormPage = () => {
  const navigate = useNavigate();
  const handleEnter = (e) => {
    const value = e.target.value;
    localStorage.setItem('interviewType', value);
    console.log('value', value);
    navigate('/chat');
  }

  return (
   <>
   {/* <Navbar /> */}
   <section className="formContainer">
    
   <h1>Choose the type of interview</h1>
   {/* <div style={{padding:'0 0rem'}}> */}
   
   {/* </div> */}
   
   <div className='buttonsContainer'>
   
   <button className="query blue" value='0' onClick={handleEnter}>
   <FontAwesomeIcon icon={faDroplet} style={{height: '7rem'}}/>
    Easy</button>
   <button className="query orange" value='2' onClick={handleEnter}>
    <FontAwesomeIcon icon={faFireFlameSimple} style={{height: '7rem'}}/>
    Medium</button>
   <button className="query red" value='5' onClick={handleEnter}>
    <FontAwesomeIcon icon={faFire} style={{height: '7rem'}}/>
    Hard
    {/* <div className="overlay"></div> */}
    </button>
   </div>
    </section>

    
   </>
  )
}

export default FormPage