import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';




const FormComponent = () => {
  const navigate = useNavigate();

  // Initial form data state
  const [formData, setFormData] = useState({
    name: '',
    student: '',
    years_of_experience: 0,
    job: '',
    job_description: '',
    language: '',
  });

  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    // Convert the string value to a boolean
    const isStudent = value === 'Yes';
    setFormData((prevData) => ({
      ...prevData,
      [name]: isStudent,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEnter = (e) => {
    e.preventDefault();
    localStorage.clear();

    // Update the JSON object with the form data
    // Replace the keys in the JSON object with the form data

    // formData.language = formData.language? formData.language : 'English' ;
    // console.log(formData.language);
    const updatedJson = {
      name: formData.name? formData.name : 'User',
      student: formData.student === 'true', // Convert string to boolean
      years_of_experience: parseInt(formData.years_of_experience, 10),
      job: formData.job? formData.job : 'Job',
      job_description: formData.job_description,
      // language: formData.language
    };

    // Save the updated JSON object or perform any other necessary action
    console.log(updatedJson);
    localStorage.setItem('formData', JSON.stringify(updatedJson));

    // Redirect to '/chat'
    navigate('/form2');
  };

  return (
    <form onSubmit={handleEnter}>
      
      <div className='formItem'>
      <div className="col-25">
        <label>Name</label>
        </div>
      <div className="col-75">
        <input type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}/>
              </div>
      </div>

      <div className='formItem'>
        <div className="col-25">
      <label>Status</label>
      </div>
      
      <div className='radioButtons col-75'>
      <div className='radiobutton'>
      
          <input
            type="radio"
            name="student"
            value="Yes"
            checked={formData.student === true}
            onChange={handleStudentInputChange}
          /><label>Student</label>
          
        </div>
        <div className='radiobutton'>
        
          <input
            type="radio"
            name="student"
            value="No"
            checked={formData.student === false}
            onChange={handleStudentInputChange}
          /> <label>Professional</label>
        </div>
        </div>
      {/* <input type="text"
              name="student"
              value={formData.student}
              onChange={handleInputChange} /> */}
      </div>

      <div className='formItem'>
      <div className="col-25">
        <label>Years</label>
        </div>
      <div className="col-75">
        <input type="number" 
             name="years_of_experience"
             max="90"
             min="0"
             value={formData.years_of_experience}
             onChange={handleInputChange}
             />
             </div>
      </div>

      {/* <div className='formItem'>
      <label>Enter language</label>
      <input type="text" name="language"
      placeholder='English'
              value={formData.language}
              onChange={handleInputChange} />
      </div> */}

      <div className='formItem'>
      <div className="col-25">
        <label>Job Title</label>
        </div>
      <div className="col-75">
        <input type="text" 
              name="job"
              value={formData.job}
              onChange={handleInputChange}/>
              </div>
      </div>

      <div className='formItem'>
      <div className="col-25">
        <label>Job Description</label>
        </div>
      <div className="col-75">
        <input type="para" name="job_description"
              value={formData.job_description}
              onChange={handleInputChange} />
      </div>
      </div>

      <input type='submit'></input>
    </form>
  );
};

export default FormComponent;
