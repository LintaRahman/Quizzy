import React, {useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import FormComponent from './Form'

const FormPage = () => {
  

  return (
   <>
   <Navbar />
   
   <section className="formContainer">
   <h1>Tell Quizzy about your job interview</h1>
   <FormComponent /> 
    </section>
   </>
  )
}

export default FormPage