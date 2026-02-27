import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TrackListItem from "../TrackListItem";
import "./Tracks.css"; // ← import the CSS file

import lightBlueClosed from "../../assets/lightblue_closed 1.svg";
import lightBlueOpen from "../../assets/lightblue_open 1.svg";
import cyanClosed from "../../assets/cyan_closed 1.svg";
import cyanOpen from "../../assets/cyan_open 1.svg";
import navyClosed from "../../assets/navy_closed 1.svg";
import navyOpen from "../../assets/navy_open 1.svg";
import bluePurpleStar from "../../assets/blue_purple_star.svg";
import purpleBlueStar from "../../assets/purple_blue_star.svg";
import purpleSmallStar from "../../assets/purple_small_star.svg";

const Tracks = () => {
    const tracks = [
        { open: lightBlueOpen, closed: lightBlueClosed, name: "Entertainment" },
        { open: navyOpen, closed: navyClosed, name: "Sustainability" },
        { open: cyanOpen, closed: cyanClosed, name: "Mental Health" },
        { open: lightBlueOpen, closed: lightBlueClosed, name: "Best Gag" },
        { open: navyOpen, closed: navyClosed, name: "Best Overall" },
        { open: navyOpen, closed: navyClosed, name: "fetch.ai" },
        { open: cyanOpen, closed: cyanClosed, name: "Code and Coffee" }
    ];

    useGSAP(() => {
        gsap.to(".hover", {
            y: -660,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });
    }, []);

    return (
        <section className="tracks" id="tracks">
            <h1 className="tracks__title">Tracks</h1>

            <img
                draggable="false"
                className="star--top-left"
                src={purpleBlueStar}
                alt=""
            />
            <img
                draggable="false"
                className="star--small hover"
                src={purpleSmallStar}
                alt=""
            />
            <img
                draggable="false"
                className="star--bottom-right"
                src={bluePurpleStar}
                alt=""
            />

            <div className="tracks__grid">
                {tracks.map((item, index) => (
                    <TrackListItem
                        key={index}
                        open={item.open}
                        closed={item.closed}
                        name={item.name}
                    />
                ))}
            </div>
        </section>
    );
};

export default Tracks;
