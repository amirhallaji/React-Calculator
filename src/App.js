import React from "react";

import Keypad from "./components/Keypad";
import Screen from "./components/Screen";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenText: "0",
      dotAdded: false,
      isPositive: true,
      previousOperator: null,
      operands: [],
      operatorClicked: false,
      resultClickedOperand: null,
      memoryClicked: false,
      lastMemoryKey: null,
      resultClicked: false,
    };
  }

  // componentDidMount() {
  //   console.log("******");
  //   console.log(this.state.previousOperator);
  //   console.log(this.state.operands);
  //   console.log(this.state.resultClickedOperand);
  //   console.log(this.state.operatorClicked);
  // }

  // componentDidUpdate() {
  //   console.log("******");
  //   console.log(this.state.previousOperator);
  //   console.log(this.state.operands);
  //   console.log(this.state.resultClickedOperand);
  //   console.log(this.state.operatorClicked);
  // }

  handlePressDigit = (digit) => {
    this.setState({
      screenText:
        this.state.screenText === "0" || this.state.operatorClicked || this.state.resultClicked
          ? digit.toString()
          : this.state.screenText + digit.toString(),
      operatorClicked: false,
      resultClickedOperand: null,
      resultClicked: false,
    });
  };

  handlePressOperator = (operator) => {
    if (
      !this.state.operatorClicked &&
      this.state.resultClickedOperand === null
    ) {
      let tempOprands = [
        ...this.state.operands,
        parseFloat(this.state.screenText),
      ];
      let result = 0;

      // if (operator === "%") {
      //   let tempVal =
      //     (tempOprands[tempOprands.length - 1] *
      //       tempOprands[tempOprands.length - 2]) /
      //     1000;
      //   tempOprands[tempOprands.length - 1] = tempVal;
      //   console.log('data1: ', tempOprands);
      //   this.setState({
      //     operands: tempOprands,
      //     screenText: isNaN(tempVal.toString()) ? '0': tempVal.toString(),
      //     previousOperator: this.state.previousOperator,
      //     operatorClicked: true,
      //   });
      //   // this.handlePressOperator(this.state.previousOperator);
      // } else {
      if (tempOprands.length !== 1) {
        switch (this.state.previousOperator) {
          case "+":
            result =
              tempOprands[tempOprands.length - 2] +
              tempOprands[tempOprands.length - 1];
            break;
          case "-":
            result =
              tempOprands[tempOprands.length - 2] -
              tempOprands[tempOprands.length - 1];
            break;
          case "*":
            result =
              tempOprands[tempOprands.length - 2] *
              tempOprands[tempOprands.length - 1];
            break;
          case "/":
            result =
              tempOprands[tempOprands.length - 2] /
              tempOprands[tempOprands.length - 1];
            break;
          case '%':
            result =
              tempOprands[tempOprands.length - 2] %
              tempOprands[tempOprands.length - 1];
          default:
            break;
        }
        tempOprands.push(result);
      } else {
        result = tempOprands[0];
      }

      this.setState({
        previousOperator: operator,
        operatorClicked: true,
        operands: tempOprands,
        isPositive: true,
        dotAdded: false,
        screenText:
          tempOprands.length % 2 === 1
            ? result.toString() + operator
            : this.state.screenText.slice(
              0,
              this.state.screenText.length - 1
            ) + operator,
        resultClickedOperand: null,
      });
      // }
    } else {
      this.setState({
        previousOperator: operator,
        isPositive: true,
        dotAdded: false,
        screenText:
          this.state.resultClickedOperand === null
            ? this.state.screenText.slice(0, this.state.screenText.length - 1) +
            operator
            : this.state.screenText + operator,
        resultClickedOperand: null,
        operatorClicked: true,
      });
    }
  };

  handlePressAC = () => {
    this.setState({
      screenText: "0",
      dotAdded: false,
      isPositive: true,
      operands: [],
      previousOperator: null,
      operatorClicked: false,
      resultClickedOperand: null,
    });
  };

  handlePressDot = () => {
    if (!this.state.dotAdded) {
      this.setState({
        screenText: this.state.screenText + ".",
        dotAdded: true,
        operatorClicked: false,
        resultClickedOperand: null,
      });
    }
  };

  handlePressNegator = () => {
    if (this.state.isPositive) {
      if (this.state.screenText !== "0") {
        this.setState({
          screenText: "-" + this.state.screenText,
          isPositive: false,
          operatorClicked: false,
          resultClickedOperand: null,
        });
      }
    } else {
      this.setState({
        screenText: this.state.screenText.slice(1),
        isPositive: true,
        operatorClicked: false,
        resultClickedOperand: null,
      });
    }
  };

  handlePressResult = () => {
    if (this.state.previousOperator !== null) {
      let tempOprands = [
        ...this.state.operands,
        parseFloat(this.state.screenText),
      ];

      let result = 0;
      if (this.state.resultClickedOperand === null) {
        switch (this.state.previousOperator) {
          case "+":
            result =
              tempOprands[tempOprands.length - 2] +
              tempOprands[tempOprands.length - 1];
            break;
          case "-":
            result =
              tempOprands[tempOprands.length - 2] -
              tempOprands[tempOprands.length - 1];
            break;
          case "*":
            result =
              tempOprands[tempOprands.length - 2] *
              tempOprands[tempOprands.length - 1];
            break;
          case "/":
            result =
              tempOprands[tempOprands.length - 2] /
              tempOprands[tempOprands.length - 1];
            break;
          case '%':
            result = 
            tempOprands[tempOprands.length - 2] %
            tempOprands[tempOprands.length - 1];
          default:
            break;
        }

        tempOprands.push(result);
      } else {
        switch (this.state.previousOperator) {
          case "+":
            result =
              tempOprands[tempOprands.length - 1] +
              this.state.resultClickedOperand;
            break;
          case "-":
            result =
              tempOprands[tempOprands.length - 1] -
              this.state.resultClickedOperand;
            break;
          case "*":
            result =
              tempOprands[tempOprands.length - 1] *
              this.state.resultClickedOperand;
            break;
          case "/":
            result =
              tempOprands[tempOprands.length - 1] /
              this.state.resultClickedOperand;
            break;
          default:
            break;
        }

        tempOprands.push(result);
      }

      this.setState({
        operands: tempOprands,
        resultClickedOperand:
          this.state.resultClickedOperand === null
            ? parseFloat(this.state.screenText)
            : this.state.resultClickedOperand,
        operatorClicked: false,
        isPositive: true,
        dotAdded: false,
        screenText: result.toString(),
        resultClicked: true,
      });
    }
  };


  // showScreenText = (tempOperands, tempOperators) => {
  //   console.log('let"s see: ', this.state.resultClicked);
  //   let lastOperand1, lastOperand2, lastOperator;
  //   lastOperand1 = tempOperands.length-1;
  //   lastOperand2 = tempOperands.length-2;
  //   lastOperator = tempOperators[tempOperators.length-1];
  //   console.log('tempoperands in new function: ', tempOperands);
  //   let result = 0;
  //   switch(lastOperator){
  //     case '+':
  //       result = parseFloat(tempOperands[lastOperand2]) + parseFloat(tempOperands[lastOperand1]);
  //       console.log('result in new func: ', result);
  //       break;
  //   }
  //   return result.toString();
  // }


  handleMemory = (memory) => {

    let onScreen = this.state.screenText;
    let currentMemory = localStorage.getItem(onScreen);
    currentMemory = parseFloat(currentMemory);
    switch (memory) {
      case 'm+':
        currentMemory = parseFloat(this.state.lastMemoryKey);
        localStorage.removeItem(currentMemory);
        currentMemory = isNaN(currentMemory) ? parseFloat(onScreen) : currentMemory + parseFloat(onScreen);
        localStorage.setItem(currentMemory, currentMemory);
        this.setState({
          lastMemoryKey: currentMemory.toString(),
        });
        break;
      case 'm-':
        currentMemory = parseFloat(this.state.lastMemoryKey);
        localStorage.removeItem(currentMemory);
        currentMemory = isNaN(currentMemory) ? parseFloat(onScreen) : currentMemory - parseFloat(onScreen);
        localStorage.setItem(currentMemory, currentMemory);
        this.setState({
          lastMemoryKey: currentMemory.toString(),
        });
        break;
      case 'mc':
        localStorage.clear();
        break;
      case 'mr':
        this.setState({
          screenText: this.state.lastMemoryKey,
        });
        break;
      case 'ms':
        currentMemory = isNaN(currentMemory) ? parseFloat(onScreen) : currentMemory;
        localStorage.setItem(currentMemory, currentMemory);
        this.setState({
          lastMemoryKey: currentMemory.toString(),
        })
        break;
    }

    this.setState({
      memoryClicked: true,
    });
  }

  render() {
    return (
      <div>
        <Screen text={this.state.screenText} />
        <Keypad
          onPressDigit={this.handlePressDigit}
          onPressOperator={this.handlePressOperator}
          onPressAC={this.handlePressAC}
          onPressDot={this.handlePressDot}
          onPressNegator={this.handlePressNegator}
          onPressResult={this.handlePressResult}
          onPressMemory={this.handleMemory}
        />
      </div>
    );
  }
}

export default App;
