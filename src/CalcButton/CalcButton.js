import React, { Component } from 'react';

const calcButton = (props) => {

    return <div data-index={props.dataIndex} data-id={props.dataId} className={props.classArr.join(" ")} onClick={props.click}>{props.display}</div>

}

export default calcButton;
