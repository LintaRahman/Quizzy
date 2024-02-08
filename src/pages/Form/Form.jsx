import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ToolTip from "../../components/Tooltip/Tooltip";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const FormComponent = () => {
  const navigate = useNavigate();

  // Initial form data state
  // const [formData, setFormData] = useState({
  //   name: "",
  //   student: "",
  //   years_of_experience: 0,
  //   job: "",
  //   job_description: "",
  //   language: "",
  // });

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

    // Redirect to '/chat'
    navigate("/form2");
  };

  return (
    <form onSubmit={handleEnter}>
      <div className="formItem">
        <div className="col-25">
          <label>Name</label>
          {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
        <ToolTip text='Enter your name'/>
        </div>
        <div className="col-75">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="formItem">
        <div className="col-25">
          <label>Status</label>
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

        <div className="radioButtons col-75">
          <div className="radiobutton">
            <input
              type="radio"
              name="student"
              value="Yes"
              checked={formData.student === true}
              onChange={handleStudentInputChange}
            />
            <label>Student</label>
          </div>
          <div className="radiobutton">
            <input
              type="radio"
              name="student"
              value="No"
              checked={formData.student === false}
              onChange={handleStudentInputChange}
            />{" "}
            <label>Professional</label>
          </div>
        </div>
      </div>

      <div className="formItem">
        <div className="col-25">
          <label>Years of Experience</label>
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
          <label>Job Title</label>
          <ToolTip text='Enter the title for the job you are applying for'/>
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
          <label>Job Description</label>
        </div>
        <div className="col-75">
          <textarea
            name="job_description"
            cols="40"
            rows="5"
            value={formData.job_description}
            onChange={handleInputChange}
            placeholder="Please describe the job position in more detail below"
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
      

      <input type="submit"></input>
    </form>
  );
};

export default FormComponent;
