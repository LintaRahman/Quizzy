import React, {useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Form from './Form'
import { useNavigate } from 'react-router-dom';
import parameters from '../../../../server/routes/parameters.json'

const FormComponent = ({Title, Content}) => {
  

  return (
   <>
   <Navbar />
   
   <section className="formContainer">
   <h1>{Title}</h1>
   {Content}
    </section>
   </>
  )
}

export default FormComponent