import React from 'react';
import './Validation.css'

const validation = (props) => {
    // console.log('props', props);
    const style = {
        color: 'red'
    }
    const style1 = {
        color: 'red'
    }
    const style2 = {
        color: 'red'
    }
    const style3 = {
        color: 'red'
    }
    if(props.password.length > 8) {
        style.color = 'green'
    }
    if(props.specialSymbolPresent) { 
        style1.color = 'green';
    } 
    if(props.numberPresent) {
        style2.color = 'green';
    }
    if(props.upperCasePresent) {
        style3.color = 'green';
    }


    return(
        <div>
            <p style={style}>Password Length must be of minimum 8 digits, Currently : {props.password.length} digits</p>
           
            <p style={style1}> Password must contain a special symbol</p>
                
            <p style={style2}>Password must contain a number</p>
            <p style={style3}>Password must contain an uppercase letter</p>
        </div>
    )
}

export default validation