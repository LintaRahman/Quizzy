import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./FAQs.css";
import { faqs } from "./iQuestions";
import "regenerator-runtime/runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMessage,
  faHome,
  faPaperPlane,
  faRobot,
  faUser,
  faMicrophone,
  faCircleQuestion,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

const FAQs = () => {
  return (
    <>
      <Navbar />
      <Grid
        container
        rowSpacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        paddingTop={10}
      >
        {faqs.map((faq, i) => {
          return (
            <Grid item key={i} xs={10} md={8} lg={6}>
              <div className="question">
                <h4>{faq.question}</h4>
              </div>
              <div className="answer">
                <p>{faq.answer}</p>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default FAQs;
