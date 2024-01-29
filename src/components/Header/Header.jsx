import React from "react";
import HeaderVideo from '../../assets/header.mp4'
import {Fade} from 'react-awesome-reveal';
import "./Header.css";
// import convertTextToAudio from "../../../../server/TestTTS";

// const styles = {
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '20px',
//     background: '#333',
//     color: '#fff',
//   },
//   logoContainer: {
//     marginRight: '20px',
//   },
//   logo: {
//     width: '50px', // Adjust the size as needed
//     height: '50px', // Adjust the size as needed
//   },
//   navbar: {
//     display: 'flex',
//     alignItems: 'center',
//     marginRight: 'auto',
//   },
//   videoContainer: {
//     position: 'relative',
//     width: '100%',
//     // overflow: 'hidden',
//   },
//   video: {
//     width: '100%',
//     height: 'auto',
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//   },
//   titleContainer: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     textAlign: 'center',
//   },
//   title: {
//     fontSize: '2em',
//     marginBottom: '20px',
//     color: 'white',
//   },
//   button: {
//     padding: '10px 20px',
//     fontSize: '1em',
//     backgroundColor: '#4CAF50', // Green color, you can change it
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
// };

const buttonStyle = {
  
}

const Header = ({ text, page, img }) => {
  return (
    <>
      {/* <Navbar homePage={true}/> */}

      {page == "home" ? (
        <section className="videobox">
          {/* <div className="dark-overlay"> */}
          <video src={HeaderVideo} autoPlay loop muted></video>
          <Fade direction="up" cascade>
          <h1>Meet Quizzy</h1>
          <h3>The next generation interviewer bot</h3>
          <a href='/form' target='_blank'>
            <button className="whitebutton" >Try it now!</button>
          {/* <Button
            color="transparent"
            borderColor="white"
            text="Register Now"
            fill={false}
          /> */}
          </a>
          </Fade>
          {/* </div> */}
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
