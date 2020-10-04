import React from 'react';
import './Cards.css'
import Card from './Card/Card';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

const Cards = (props) => {
    const cards = props.props
    
    return (
        <div className="Cards">
            {cards.map((i, index) => (
                <ScrollAnimation
                    animateIn={index % 3 === 0 ? "fadeInLeftBig" : index % 3 === 2 ? "fadeInRightBig" : "fadeIn"}
                    scrollableParentSelector='.Cards'
                    animateOnce={true}
                    initiallyVisible={false}
                    key={index}
                >
                    <Card profClick={() => props.profClick(i.userId)} imgUrl={i.imgUrl} title={i.title} by={i.userId.name} date={i.date} />
                </ScrollAnimation>
            ))}
        </div>
    );
}

export default Cards;