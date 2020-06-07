import React, { useState } from 'react';

function JourneyButton() {
    const [clicked, setClicked] = useState(false);
    return (
        <div>
        <button onClick={() =>  
            {
                setClicked({clicked : true});
                console.log("clicked!");
                console.log(clicked);
                //console.log(clicked?'journey-begin':'journey-wait');
            }
        }
        className= 'items-center flex-initial content-center'> Take me on a journey </button>
        </div>
    );
}

export default JourneyButton;
