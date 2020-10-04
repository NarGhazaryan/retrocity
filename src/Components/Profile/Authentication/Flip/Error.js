import React from 'react';


const Error = ({ touched, message }) => {
    if (!touched) {
        return <div style={{fontSize: '10px', margin: '0', padding: '0'}}>&nbsp;</div>
    }
    if (message) {
        return <div style={{color: 'red', fontSize: '10px', margin: '0', padding: '0'}}>{message}</div>
    }
    return null
}

export default Error