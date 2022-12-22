import { useState } from "react";
import { data } from "./data";
import './App.css';

function Slide() {
  const [permanent, setPermanent] = useState(0);
  const {toDoData, time} = data[permanent];

  const backPermanent = () => {
    setPermanent((permanent => {
        permanent--;
      if (permanent < 0) {
        return data.length -1;
      }
        return permanent;
    }))
  }

  const nextPermanent = () => {
    setPermanent((permanent => {
        permanent++;
      if (permanent > data.length -1) {
        permanent = 0;
      }
        return permanent;
    }))
  }

  return (
    <div>

      <div className="container">
      <h2>{toDoData} - {time}</h2>
      </div>
      
      <div className="container">
        <button className="btn" onClick={backPermanent}>Back</button>
        <button className="btn" onClick={nextPermanent}>Next</button>
      </div>

    </div>
  )
}

export default Slide;