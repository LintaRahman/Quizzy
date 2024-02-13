import React from 'react'
import { useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSound from 'use-sound';
import MaleSound from '../../assets/audio/Alloy.mp3';
import FemaleSound from '../../assets/audio/Nova.mp3';
import '../../pages/Form/Form.css'

const FormPageTwo = ({onButtonClick}) => {
  const navigate = useNavigate();
  const [male] = useSound(MaleSound);
  const [female] = useSound(FemaleSound);
  const handleEnter = (e) => {
    const value = e.target.value;
    localStorage.setItem('voice', value);
    onButtonClick("pagethree");
    // navigate('/form3');
  }

  return (
   <>
   
   
   <h1>Choose a voice for Quizzy</h1>
   <div className='buttonsContainer'>
   <button className="query pink" value='nova' onClick={handleEnter} onMouseEnter={female}>
   <FontAwesomeIcon icon={faUser} style={{height: '7rem'}}/>
    Female</button>
   <button className="query blue" value='alloy' onClick={handleEnter} onMouseEnter={male}>
    <FontAwesomeIcon icon={faUser} style={{height: '7rem'}}/>
    Male</button>
   </div>
   </>
  )
}

export default FormPageTwo;