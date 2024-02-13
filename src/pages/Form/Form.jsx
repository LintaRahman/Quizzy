import FormPageOne from "../../components/FormComponent/FormPageOne";
import FormPageTwo from "../../components/FormComponent/FormPageTwo";
import FormPageThree from "../../components/FormComponent/FormPageThree";
import React, { useState } from "react";
import ProgressBar from '../../components/FormComponent/ProgressBar/ProgressBar'
import Navbar from "../../components/Navbar/Navbar";
import './Form.css'

function Form() {
  const [page, setPage] = useState("pageone");

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      case "4":
        alert("Ooops! Seems like you did not fill the form.");
        break;
      default:
        setPage("1");
    }
  };

  return (
    <>
      <Navbar />
      <section className="formContainer">
      <ProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          pageone: <FormPageOne onButtonClick={nextPage} />,
          pagetwo: <FormPageTwo onButtonClick={nextPage} />,
          pagethree: <FormPageThree />,
        }[page]
      }
      </section>
      </>
  );
}

export default Form;
