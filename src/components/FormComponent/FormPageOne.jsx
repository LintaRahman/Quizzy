import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../pages/Form/Form.css'

const FormPageOne = ({onButtonClick}) => {
  const navigate = useNavigate();

  const storedFormData = JSON.parse(localStorage.getItem("formData"));

  const [formData, setFormData] = useState({
    name: storedFormData && storedFormData.name ? storedFormData.name : "",
    student:
      storedFormData && storedFormData.student ? storedFormData.student : "",
    years_of_experience:
      storedFormData && storedFormData.years_of_experience
        ? storedFormData.years_of_experience
        : 0,
    job: storedFormData && storedFormData.job ? storedFormData.job : "",
    job_description:
      storedFormData && storedFormData.job_description
        ? storedFormData.job_description
        : "",
  });

  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    // Convert the string value to a boolean
    const isStudent = value === "Yes";
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
      name: formData.name ? formData.name : "User",
      student: formData.student === "true", // Convert string to boolean
      years_of_experience: parseInt(formData.years_of_experience, 10),
      job: formData.job ? formData.job : "Job",
      job_description: formData.job_description,
      // language: formData.language
    };

    // Save the updated JSON object or perform any other necessary action
    console.log(updatedJson);
    localStorage.setItem("formData", JSON.stringify(updatedJson));

    onButtonClick("pagetwo");
    // Redirect to '/chat'
    // navigate("/form2");
  };

  return (
    <>
    
   <h1>Tell Quizzy about your job interview</h1>
    <form onSubmit={handleEnter}>
      <div className="formItem">
        <div className="col-25">
          <label>Enter a name</label>
        </div>
        <div className="col-75">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="(Do not use your real name)"
          />
        </div>
      </div>

      <div className="formItem">
        <div className="col-25">
          <label>Are you a student?</label>
        </div>
        {/* 
        <div style={{margin: '0 20px'}}>
          <label className="radioButton">Student
            <input type="radio" name="student"
              value="Yes"
              checked={formData.student === true}
              onChange={handleStudentInputChange} />
              <span class="checkmark"></span>
          </label>
          <label className="radioButton">Professional
            <input type="radio" name="student"
              value="No"
              checked={formData.student === false}
              onChange={handleStudentInputChange} />
              <span class="checkmark"></span>
          </label>
        </div> */}

        <div className=" radiobutton">
          {/* <div className="radiobutton"> */}
            <input
            id="studentYes"
              type="radio"
              name="student"
              value="Yes"
              checked={formData.student === true}
              onChange={handleStudentInputChange}
            />
            <label htmlFor="studentYes">Yes</label>
          {/* </div>
          <div className="radiobutton"> */}
            <input
            id="studentNo"
              type="radio"
              name="student"
              value="No"
              checked={formData.student === false}
              onChange={handleStudentInputChange}
            />{" "}
            <label htmlFor="studentNo">No</label>
          {/* </div> */}
        </div>
      </div>

      <div className="formItem">
        <div className="col-25">
          <label>Relevant years of experience (for the job you are applying to)</label>
          {/* <ToolTip text='How many year of experience do you have in this role, or similar roles?' /> */}
        </div>
        <div className="col-75">
          <input
            type="number"
            name="years_of_experience"
            //  max="90"
            //  min="0"
            value={formData.years_of_experience}
            onChange={handleInputChange}
            placeholder="Relevant years of experience in the job"
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

      <div className="formItem">
        <div className="col-25">
          <label>Job title for the job you are applying for</label>
          {/* <ToolTip text='Enter the title for the job you are applying for'/> */}
        </div>
        <div className="col-75">
          <input
            type="text"
            name="job"
            value={formData.job}
            onChange={handleInputChange}
            placeholder="Title for the job you are applying for"
          />
        </div>
      </div>

      <div className="formItem">
        <div className="col-25">
          <label>Job description for the job you are applying for</label>
        </div>
        <div className="col-75">
          <textarea
            name="job_description"
            // cols=""
            // rows="5"
            value={formData.job_description}
            onChange={handleInputChange}
            placeholder="Description for the job you are applying for(optional)"
          ></textarea>
          {/* <input
            type="para"
            name="job_description"
            value={formData.job_description}
            onChange={handleInputChange}
            placeholder="Please describe the job position in more detail below"
          /> */}
        </div>
      </div>
      {/* <div style={{display:'flex', width: '100%', alignContent: 'flex-end'}}>
      <button className="send">
        <ArrowCircleRightOutlinedIcon style={{color: 'white', fontSize: '5rem', float: 'right'}}/>
          
      </button></div> */}
      

      <input type="submit" ></input>
    </form>
    </>
  );
};

export default FormPageOne;
