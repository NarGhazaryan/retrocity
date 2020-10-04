import React, { useState } from 'react';
import './Home.css'
import Cards from '../Cards/Cards';
import ProfileR from '../Profile/ProfileR';

const Home = (props) => {
    const [Comp, setComp] = useState(null)
    const [Current, setCurrent] = useState(null)

    const profile = (by = props.user.userId) => {
        props.refPrfo()
        setCurrent("profile")
        return (<ProfileR profHandler={setComp.bind(this, cards)} myProf={props.user.userId} by={by} posts={props.posts.filter(post => post.userId._id === by._id)} />)
    }

    const cards = () => {
        setCurrent("cards")
        return (<Cards props={props.posts} profClick={profClick} />)
    }

    const profClick = (user) => {
        setComp(() => profile(user))
    }

    return (

        <div className='Home'>
            <div className="cont">
                {Comp}
            </div>

            <div className='btnDiv'>
                <div className="btn" onClick={() => {
                    let audio = document.getElementById("chopin")
                    audio.paused ? audio.play() : audio.pause()
                }}>
                    <span className="noselect">Mute</span>
                    <div id="circle"></div>
                </div>
                <div className="btn cardbtn" onClick={() => {
                    if (Current !== "cards") { setComp(() => cards()) } else { setComp(null); setCurrent(null) }
                }}>
                    <span className="noselect">Gallery</span>
                    <div id="circle"></div>
                </div>
                <div className="btn profbtn" onClick={() => {
                    if (Current !== "profile") { setComp(() => profile()); } else { setComp(null); setCurrent(null) }
                }}>
                    <span className="noselect">Profile</span>
                    <div id="circle"></div>
                </div>
            </div>
        </div >
    );
}

export default Home;