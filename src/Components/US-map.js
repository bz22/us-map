import React, { memo, useState } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
import allStates from "../data/allStates.json";
import StateProfile from "./state-profile";

//This is the nodes of the states we will be using. 
//Contains wide variety of state information.    

const geoUrl =
"https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

//This is for the small states so we have coordinates to drop annotations.  
const offsets = {
    VT: [55, -8],
    NH: [34, 2],
    MA: [30, -1],
    RI: [28, 2],
    CT: [35, 10],
    NJ: [34, 1],
    DE: [33, 0],
    MD: [47, 10],
    DC: [49, 21]
  };  

//global variable for setToolTip.  Probably not the best practice

const northeast_zoom = 0;
const recenter = 0;

function USMap({setTooltipContent}){
    const [popUpVisible, setVisibility] = useState(false);
    const [state, focusState] = useState("");
    const [abbr, focusAbbr] = useState("");

    let width = popUpVisible? "80%" : "100%";
    const togglePop = () => setVisibility(!popUpVisible);

    let stateProfile = (<StateProfile isHidden = {popUpVisible} 
        stateName = {state} popUp = {togglePop} stateID = {abbr} 
        className = ""/>);

    return (
        //Style is to keep the map centered because from some reason height
        //@100% is way too large for my screen

        
        //For each geo object (state) in TopoJSon format, generate a Geography
        //object with these attributes from geo.  Can't change the highlighting
        //and click part because we need access to state
        <div className="flex">
            {stateProfile}
            <ComposableMap projection = "geoAlbersUsa" 
            className = "bg-green-100 relative" data-tip="" projectionConfig={{ scale: 1210 }}
            style={{
                width: width,
                height: "92vh",
            }}>
                
                <Geographies geography={geoUrl} className = "">{   
                    (props) => (
                    <>  
                    {props.geographies.map(
                        geo => {
                            return (
                            <Geography key={geo.rsmKey} geography={geo}
                                onMouseEnter={() => { setTooltipContent(geo.properties["name"]); }}
                                onMouseLeave={() => { setTooltipContent(""); }}
                                onClick = {()=>{setVisibility(true);
                                                focusState(geo.properties["name"]);
                                                const cur = allStates.find(s => s.val === geo.id);
                                                focusAbbr(cur.id);   
                                                }}
                                style={{
                                    default: {
                                        fill: "yellow",
                                        outline: "none",
                                        stroke: "black",
                                    },
                                    
                                    hover: {
                                        fill: "green",
                                        outline: "none",
                                        stroke: "black",
                                    },
                        
                                    pressed: {
                                        fill: "purple",
                                        outline: "none"
                                    }
                                }}
                                
                                className = "geography"
                                />
                            );
                        })
                    }

                    {props.geographies.map(geo => {

                    const centroid = geoCentroid(geo);
                    const cur = allStates.find(s => s.val === geo.id);

                    //geoID is a number that is assigned with a state's ID in JSON. 
                    //hardcode for FL and MI cause they are jank
                    //centroid is longtitude, latitude
                    if (cur.id == "FL"){
                        centroid[0] += 0.6;
                        centroid[1] -= 0.1;
                    }

                    if (cur.id == "MI"){
                        centroid[0] += 0.4;
                        centroid[1] -= 1.5;   
                    }

                    if (cur.id == "LA"){
                        centroid[0] -= 0.4;
                    }
                    
                    //<g> is an SVG element used to group other svg elements     
                    return (
                        <g key={geo.rsmKey + "-name"}
                        onClick = {()=>{setVisibility(true);
                            focusState(geo.properties["name"]);
                            const cur = allStates.find(s => s.val === geo.id);
                            focusAbbr(cur.id);   
                            }}
                        >
                            {cur && centroid[0] > -160 && centroid[0] < -67 &&
                            (Object.keys(offsets).indexOf(cur.id) === -1 ? 
                                (
                                    <Marker coordinates={centroid}>
                                        <text y="2" fontSize={16} textAnchor="middle">
                                            {cur.id}
                                        </text>
                                    </Marker>
                                ) : (
                                    //This is if the state is too small.  We have to add 
                                    //Side button
                                    <Annotation
                                    subject={centroid}
                                    dx={offsets[cur.id][0]}
                                    dy={offsets[cur.id][1]}
                                    >
                                        <text x={4} fontSize={14} alignmentBaseline="middle">
                                            {cur.id}
                                        </text>
                                    </Annotation>
                                ))
                            }
                        </g>
                    );
                })}   
                    </>    
                    )
                }
                </Geographies>
            </ComposableMap>
        </div>
    );
};


export default memo(USMap);