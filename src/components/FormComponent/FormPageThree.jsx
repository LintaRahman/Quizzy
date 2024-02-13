import React from 'react'
import { useNavigate } from 'react-router-dom';
import {faDroplet, faFire, faFireFlameSimple} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../pages/Form/Form.css'

const FormPageThree = () => {
  const navigate = useNavigate();
  const handleEnter = (e) => {
    const value = e.target.value;
    localStorage.setItem('interviewType', value);
    console.log('value', value);
    navigate('/chat');
  }

  const iconStyle = {
    height: '7rem',
  }

  return (
   <>
   
    
   <h1>Choose the type of interview</h1>   
   <div className='buttonsContainer f3'>
   
   <button className="query blue" value='0' onClick={handleEnter}>
   <FontAwesomeIcon icon={faDroplet} style={iconStyle}/>
    Easy</button>
   <button className="query orange" value='2' onClick={handleEnter}>
    <FontAwesomeIcon icon={faFireFlameSimple} style={iconStyle}/>
    Medium</button>
   <button className="query red" value='5' onClick={handleEnter}>
    <FontAwesomeIcon icon={faFire} style={iconStyle}/>
    Hard
    </button>
   </div>

    
   </>
  )
}

export default FormPageThree;