import React from "react";
import { gsap } from "gsap";
import pictureTwo from './woman.png';
import './App.css';

const { useEffect, useRef } = React;

function Animation() {
  const boxRef = useRef();
  
  useEffect(() => {
    gsap.from(boxRef.current, {
      x: -400,
      delay: 1,
      ease: "power2.inOut",
      opacity: 0,
      duration: 2
    });
  });

  return (
    <div ref={boxRef}>
        <img src={pictureTwo} className="images" alt="woman"/>
    </div>
  );
}


  export default Animation;
