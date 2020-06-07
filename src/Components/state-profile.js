import React, { useState } from 'react';

//we need props.name on what type of state it is
//we destructure props array
function StateProfile({isHidden, popUp}){  
    let css = `z-10 bg-red-100 relative 
                content-center h-fake-full w-64`;

    //don't forget to add space so that class name can render
    if (!isHidden){ css += " hidden"; }
    
    //let content fall down
    let transition = `transition duration-500 ease-in-out bg-blue-500 
    hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110`

    //popUp takes the place of our function togglePop because popUp is the 
    //name of the actual prop so it contains the information for togglePop
    const handleClick = () => { popUp();};

    return(
        <div className={css}>
            <span className="cursor-pointer" onClick={handleClick}>
                &times;    
            </span>
            <p>I'm a pop up with my state!</p>
        </div>

    );

}

export default StateProfile;