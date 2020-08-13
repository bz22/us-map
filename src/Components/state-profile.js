import React, { useState, useEffect } from 'react';
import axios from 'axios';

//we need props.name on what type of state it is
//we destructure props array
function StateProfile({isHidden, popUp, stateName, stateID}){  
    const dailySnapshot = 'https://covidtracking.com/api/states';
    const historyOfSnapshots = "https://covidtracking.com/api/states/daily";

    const [info, setCount] = useState({
        currentPositive: -1,
        currentNegative: -1,
        death: -1,
        recovered: -1,
        change: -1,
        totalTestNumbers: -1,
        totalTestChange: -1,
        deathChange: -1,
    });

    const [isOpening, setOpening] = useState(false);

    const checkNullity = info => {
        return info == null ? "No data" : info;
    }
    
    useEffect(() => {
        console.log("hellyeah");        
        setOpening(!isOpening)
    }, [isHidden])

    useEffect(()=>{
        console.log("loop");
        axios.get(dailySnapshot
    )
            .then(response => { 
            for (let i = 0; i < response.data.length; i++){
                if (response.data[i].state == stateID){
                    setCount({
                        currentPositive: response.data[i].positive,
                        currentNegative: response.data[i].negative,
                        death: response.data[i].death,
                        recovered: checkNullity(response.data[i].recovered),
                        change: response.data[i].positiveIncrease,
                        totalTestNumbers: response.data[i].totalTestResults,
                        totalTestChange: checkNullity(response.data[i].totalTestResultsIncrease),
                        deathChange: response.data[i].deathIncrease,
                    });
                }
            }
            })
        }, [stateID]) //useEffect can remember the stateID of last time in this 
        //profile component and compare it with the new one
        //the state-profile is not being reinstantiated with a new object 
        //everytime you click; the properties of the profile (like state name)
        //just change

    let css = `bg-red-100 pop-up-dimensions flex flex-col z-10`;

    //don't forget to add space so that class name can render
    if (!isHidden){ css += " hidden"; }

    //popUp takes the place of our function togglePop because popUp is the 
    //name of the actual prop so it contains the information for togglePop
    const handleClick = () => { popUp();};
    
    if (info.currentPositive > -1){
        return(
            <div className={css} slidein = {isOpening.toString()} 
            onAnimationEnd = {() => {setOpening(false)}}>
                <p className="cursor-pointer self-end px-3 py-1 hover:bg-gray-200
                                text-base" onClick={handleClick}>
                    Close    
                </p>
                <p className = "p-3">The Facts and Figures for {stateName}.</p>
                <p className = "p-3">
                I currently have a total of {info.currentPositive} cases! <br />
                I have {info.currentNegative} that tested negative <br />
                I have {info.death} deaths <br />
                Recoveries: {info.recovered} <br />
                We have a net change of cases of {info.change} <br />
                Total testing numbers is {info.totalTestNumbers} <br />
                Total testing change is {info.totalTestChange} <br />
                Death change is {info.deathChange} <br /> <br />

                Scroll down for more information
                </p>
            </div>
    
        );
    }
    return(<div className = {css}>Collecing data...</div>);
}

export default StateProfile;