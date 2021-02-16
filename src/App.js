import React from "react";
import './App.css';
import CalcButton from "./CalcButton/CalcButton.js";
import './CalcButton/CalcButton.css';
import LCDScreen from "./LCDScreen/LCDScreen.js";
import './LCDScreen/LCDScreen.css';

function App() {
  const [buttons, setButtons] = React.useState(
    [{
      id : "1",
      display : "1",
      operator : "",
      value :  1,
      classArr: ["button","rowFive","columnThree","width1"]
    },
    {
      id : "2",
      display : "2",
      operator : "",
      value :  2,
      classArr:["button","rowFive","columnTwo","width1"]
    },
    {
      id : "3",
      display : "3",
      operator : "",
      value :  3,
      classArr:["button","rowFive","columnOne","width1"]
    },
    {
      id : "4",
      display : "4",
      operator : "",
      value :  4,
      classArr:["button","rowFour","columnOne ","width1"]
    },
    {
      id : "5",
      display : "5",
      operator : "",
      value :  5,
      classArr:["button","rowFour","columnTwo ","width1"]
    },
    {
      id : "6",
      display : "6",
      operator : "",
      value :  6,
      classArr:["button","rowFour","columnThree","width1"]
    },
    {
      id : "7",
      display : "7",
      operator : "",
      value :  7,
      classArr:["button","rowThree","columnOne","width1"]
    },
    {
      id : "8",
      display : "8",
      operator : "",
      value :  8,
      classArr:["button","rowThree","columnTwo","width1"]
    },
    {
      id : "9",
      display : "9",
      operator : "",
      value :  9,
      classArr:["button","rowThree","columnThree","width1"]
    },
    {
      id : "-",
      display : "-",
      operator : "-",
      value :  "",
      classArr:["operator","bgRed","textWhite"," button","rowThree ","columnFour","width1"]
    },
    {
      id : "+",
      display : "+",
      operator : "+",
      value :  "",
      classArr:["operator","bgRed","textWhite"," button","rowTwo","columnFour","width1"]
    },
    {
      id : "*",
      display : "x",
      operator : "*",
      value :  "",
      classArr: ["operator","bgRed","textWhite","button","rowFour","columnFour","width1"]
    },
    {
      id : "%",
      display : "%",
      operator : "/",
      value :  "",
      classArr: ["operator","bgRed","textWhite","button","rowFive","columnFour","width1"]
    },
    {
      id : "c",
      display : "Clear",
      operator : "c",
      value :  "",
      classArr:["operator","bgRed","textWhite","button","rowTwo","columnOne","width2"]
    },
    {
      id : "=",
      display : "=",
      operator : "=",
      value : "" ,
      classArr:["operator","bgRed","textWhite","button","rowTwo","columnThree","width1"]
    },
  
  ]

  );
  let [display, setDisplay] = React.useState(0);
  let [operand1, setOperand1] = React.useState("0");
  let [operand2, setOperand2] = React.useState("");
  let [operator , setOperator] = React.useState("");

  const handleCalcButtonClick = (event) => {
    //console.dir(event);
    //get index (key)
    let buttonClickedIndex = Number(event.target.getAttribute("data-index"));
    //get button from data modal
    let buttonClicked =  buttons[buttonClickedIndex];
    var newButtons = [...buttons];
    //reset operator button colors
    for (var i=0;i<newButtons.length;i++){
      var colorIndex = newButtons[i].classArr.indexOf("bgPink");
      if (colorIndex!==-1)
      newButtons[i].classArr.splice(colorIndex, 1, "bgRed");
    }
    if (buttonClicked.value){
      if (!operator){//user is beginning, clicked a number
        operand1 = operand1+buttonClicked.display;
        setOperand1(operand1);
        display = Number(operand1);
      }
      else if (operator == "="){//user clicked a number after getting result, so replace display with num licked
        operand1 = buttonClicked.display;
        setOperand1(operand1);
        display = Number(operand1);
        operator="";
        setOperator(operator);
      }
      else {//user is entering second number
        operand2 = operand2+buttonClicked.display;
        setOperand2(operand2);
        display = Number(operand2);
      }
      setDisplay(display);
    }
    else{//user clicked operator button
      colorIndex = buttonClicked.classArr.indexOf("bgRed");//highlight button
      if (colorIndex!==-1){
        buttonClicked.classArr.splice(colorIndex, 1, "bgPink");
      }
      newButtons.splice(buttonClickedIndex,1,buttonClicked);//replace button with highlighted data
      if (buttonClicked.operator==="c"){//cler the display
        display = 0;
        setDisplay(display);
        operand1="0";
        operand2="";
        setOperand1(operand1);
        setOperand2(operand2);
        operator="";
      }
      else if (operand1 && !operand2){//record teh operator, replace if necessary
        operator = buttonClicked.operator;
      }
      else if (operand1 && operand2 && operator && operator !=="="){//do calcuation if value, and set new operand1 to answer
        display = eval(Number(operand1) +operator+Number(operand2));
        setDisplay(display);
        operand1=String(display);
        operand2="";
        setOperand1(operand1);
        setOperand2(operand2);
        operator = buttonClicked.operator;
      }
      setOperator(operator);
    };
    setButtons(newButtons);
  }

  return (
    <div className="App myContainer">
      <LCDScreen display={display}></LCDScreen>
      {        
        buttons.map((button, i) => <CalcButton dataId={button.id} dataIndex={i} classArr={button.classArr} key={button.id} display={button.display} click={handleCalcButtonClick}></CalcButton>)
      }
    </div>
  );
}

export default App;
