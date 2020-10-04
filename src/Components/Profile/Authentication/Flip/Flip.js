
import React, { useState } from 'react';
import './Flip.css'
import SignIN from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Flip = (props) => {
  const [rot, setRotate] = useState(false)

  return (
    <div
      className={"flip-card"}>
      <button
        alt="Problems?"
        onClick={() => setRotate(!rot)}
        rot={rot.toString()}
        style={{ width: '120px', height: '80px', fontSize: "20px" }}
        > {rot ? "Log In" : "Sign Up"} </button>
      <br />
      <div
        className={rot ? ['flip-card-inner', 'rot'].join(' ') : "flip-card-inner"}>
        <div className="flip-card-front">
          <SignIN profHandler={props.profHandler} />
        </div>
        <div className="flip-card-back">
          <SignUp />
        </div>
      </div>
    </div>
  );
}

export default Flip;