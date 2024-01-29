import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import { faUser, faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSound from 'use-sound';

const FormPage = () => {
  const navigate = useNavigate();
  const handleEnter = (e) => {
    const value = e.target.value;
    localStorage.setItem('voice', value);
    navigate('/form3');
  }

  return (
   <>
   {/* <Navbar /> */}
   
   <section className="formContainer">
   <h1>Choose a voice for Quizzy</h1>
   <div className='buttonsContainer'>
   <button className="query pink" value='nova' onClick={handleEnter}>
   <FontAwesomeIcon icon={faUser} style={{height: '7rem'}}/>
    Female</button>
   <button className="query blue" value='alloy' onClick={handleEnter}>
    <FontAwesomeIcon icon={faUser} style={{height: '7rem'}}/>
    Male</button>
   </div>
    </section>
   </>
  )
}

export default FormPage