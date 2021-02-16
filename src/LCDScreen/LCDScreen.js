import React, {Component  } from "react";

const LCDScreen =(props)=>{
    return <div className="textWhite button rowOne columnOne width4">{props.display}</div>
}

export default LCDScreen;