import React from "react";
import HeaderVideo from '../../assets/video/header.mp4'
import {Fade} from 'react-awesome-reveal';
import "./Header.css";

const Header = ({ text, page, img }) => {
  return (
    <>
      {page == "home" ? (
        <section className="videobox">
          <video src={HeaderVideo} autoPlay loop muted></video>
          <div className="overlay"></div>
          <Fade direction="up" cascade>
          <h1>Meet Quizzy</h1>
          <h2>The next generation interviewer bot</h2>
          <a href='/form'>
            <button className="whitebutton" onClick={localStorage.clear()}>Try it now!</button>
          </a>
          </Fade>
        </section>
      ) : page == "infoPage" ? 
      (
        <section className="smallheader">
          <img src={img} alt="image of ${text} header" />
          <h1>{text}</h1>
        </section>
      ) :
      (
        <section className="mediumheader">
          <img src={img} alt="image of ${text} header" />
          <h1>{text}</h1>
        </section>
      )}
    </>
  );
};

export default Header;
