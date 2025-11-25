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
          <h1 className="section-title">About</h1>
        </div>

        <h2 className="about-description">
          Lorem ipsum dolor sit amet <br />
          consectetur. Adipiscing ut <br />
          tempus felis in dignissim. <br />
          Hendrerit lectus risus quis <br />
          ullamcorper senectus tortor at <br />
          varius. In in aliquam consequat ac. <br />
          Orci pretium eget nunc gravida <br />
          euismod diam tincidunt.
        </h2>
      </div>
    </section>
  );
};

export default About;
