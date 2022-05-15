import React from 'react';
import "./About.css";

export default function About() {

  return (
      <div className='mainContainer'>
        <div className='left'></div>
        <div className='right'></div>
        <div className="contentContainer">
          <h4>About Me</h4>
          <div className='forFlex'>
            <div className="details">
              <img src="suraj.jpg" alt="" />
              <p className="name">Suraj Gupta</p>
              <p className="desc">
                <p>This is my first mern stack project.</p>
                <p>Here you can keep your notes safe.</p>
              </p>
            </div>
            <div className='line'></div>
            <div className="contactInfo">
              <div>
                <img src="facebook.png" alt="fb_logo" className='fb-insta-logo'/>
                <a href="https://www.facebook.com/profile.php?id=100056634093370" target="_blank">Suraj Gupta</a>
              </div>
              <div>
                <img src="instagram.png" alt="insta_logo" className='fb-insta-logo'/>
                <a href="https://www.instagram.com/surajgupta522/" target="_blank">surajgupta522</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
