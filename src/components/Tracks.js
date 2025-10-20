import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TrackListItem from "./TrackListItem";
import '../index.css'

import lightBlueClosed from './TrackImages/lightblue_closed 1.svg';
import lightBlueOpen from './TrackImages/lightblue_open 1.svg';
import cyanClosed from './TrackImages/cyan_closed 1.svg';
import cyanOpen from './TrackImages/cyan_open 1.svg';
import navyClosed from './TrackImages/navy_closed 1.svg';
import navyOpen from './TrackImages/navy_open 1.svg';
import bluePurpleStar from "./TrackImages/blue_purple_star.svg";
import purpleBlueStar from "./TrackImages/purple_blue_star.svg";
import purpleSmallStar from "./TrackImages/purple_small_star.svg";

const Tracks = () => {
  const tracks = [
    {
      open: lightBlueOpen,
      closed: lightBlueClosed,
      name: "Track 1",
    },
    {
      open: navyOpen,
      closed: navyClosed,
      name: "Track 2",
    },
    {
      open: cyanOpen,
      closed: cyanClosed,
      name: "Track 3",
    },
    {
      open: lightBlueOpen,
      closed: lightBlueClosed,
      name: "Track 4",
    },
    {
      open: navyOpen,
      closed: navyClosed,
      name: "Track 5",
    },
    {
      open: cyanOpen,
      closed: cyanClosed,
      name: "Track 6",
    },
  ];

  useGSAP(() => {
    gsap.to('.hover', {
        y: -660,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
    });
    }, [])

  return (
    <section className="relative w-full flex flex-col justify-center items-center" id="tracks">
      <h1 className="text-8xl pt-12 pb-24 font-bold"> 
        Tracks
      </h1>

      <img className="absolute -translate-x-[40rem] -translate-y-[36rem] scale-[250%] rotate-[33deg]" src={purpleBlueStar} alt="" />
      <img className="absolute translate-x-[40rem] -translate-y-[42rem] scale-75 rotate-[-17deg] hover" src={purpleSmallStar} alt="" />
      <img className="absolute scale-[250%] translate-x-[30rem] translate-y-[26rem] rotate-[32deg]" src={bluePurpleStar} alt="" />
      <div className="grid grid-cols-2 gap-8 gap-x-24 pb-12">
        {tracks.map((item, index) => {
          return (
            <TrackListItem key={index} open={item.open} closed={item.closed} name={item.name} />
          );
        })}
      </div>
    </section>
  );
};

export default Tracks;
