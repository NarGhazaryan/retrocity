import React, { useState } from 'react';
import './Card.css'

const Card = (props) => {
    
    const [rot, setRot] = useState(false)

    return (
        <div className='Card' onClick={() => setRot(!rot)}>
            <div className={["mid", rot ? "mid-rot" : ""].join(" ")}>
                <div className="image" style={{ backgroundImage: `url(${props.imgUrl})` }} />
                <div className='desc'>
                    <div className="mes">
                        <h4 onClick={props.delEl}> {props.title} </h4>
                        <h4 onClick={() => props.profClick ? props.profClick() : null} style={{ textDecoration: "none", color: "black", cursor: "pointer" }}> By: <i> {props.by} </i> </h4>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Card;