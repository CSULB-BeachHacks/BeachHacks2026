import React from "react";
import "./About.css";

import blueStar from "../assets/bluestar.svg";
import cyanStar from "../assets/cyan_small_star.svg";
import tinyBubbles from "../assets/tinybubbles.svg";
import leftAboutCoral from "../assets/l_about_coral.svg";
import rightAboutCoral from "../assets/r_about_coral.svg";
import purpleBlueStar from "../assets/purple_blue_star.svg";

const About = () => {
  return (
    <section className="about" id="about">
      <img className="blue-star bg-img" src={blueStar} alt="blue star" />
      <img className="cyan-star bg-img" src={cyanStar} alt="cyan star" />
      <img
        className="tiny-bubbles bg-img"
        src={tinyBubbles}
        alt="tiny bubbles"
      />
      <img
        className="right-about-coral bg-img"
        src={leftAboutCoral}
        alt="big coral"
      />
      <img
        className="left-about-coral bg-img"
        src={rightAboutCoral}
        alt="big coral"
      />
      <img
        className="purple-blue-star bg-img"
        src={purpleBlueStar}
        alt="purple blue star"
      />

      <div className="container">
        <div className="section-header">
          <h1 className="about-title">About</h1>
        </div>

        <p className="about-description">
          BeachHacks is one of the largest hackathons hosted at California State University Long Beach, where over 200 students come together to build, learn, and innovate within a 24-hour time frame. <br /> This year BeachHacks 9.0 will be hosted at the Pointe. Hackers will have the opportunity to create a fully deployable project using the newest technology and their creativity.

Insterested in seeing what you can build yourself? Apply now!
        </p>
      </div>
    </section>
  );
};

export default About;
