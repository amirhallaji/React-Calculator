import React from "react";

import Keypad from "./components/Keypad";
import Screen from "./components/Screen";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenText: "0",
      hasDot: false,
      isPositive: true,
      hasOperator: false,
      resultClicked: false,
      resultClickedMultiple: false,
      operands: [],
      operators: [],
    };
  }

  componentDidUpdate = () => {

  }
  handlePressDigit = (digit) => {
    this.setState({
      screenText: this.state.screenText === '0' || this.state.hasOperator ? digit.toString() : this.state.screenText + digit.toString(),
      hasOperator: false,
      // resultClicked: false,
    })
  };

  handlePressOperator = (operator) => {
    let tempOperators, tempOperands;

    tempOperators = [...this.state.operators, operator];
    tempOperands = [...this.state.operands, parseFloat(this.state.screenText)];
    if (this.state.resultClicked) {
      tempOperands.splice(0, tempOperands.length - 1);
    }

    let result = 0;
    let lastOperand1, lastOperand2;
    lastOperand1 = tempOperands.length - 1;
    lastOperand2 = tempOperands.length - 2;


    if (operator === '%') {
      tempOperands[lastOperand1] = (tempOperands[lastOperand1] * tempOperands[lastOperand2]) / 100;
      result = tempOperands[lastOperand1];
      this.setState({
        screenText: result === isNaN() ? '0' : result,
      });
    }
    else {
      if (tempOperands.length !== 1) {
        switch (tempOperators[tempOperators.length - 2]) {
          case '+':
            result = tempOperands[lastOperand2] + tempOperands[lastOperand1];
            break;
          case '-':
            result = tempOperands[lastOperand2] - tempOperands[lastOperand1];
            break;
          case '*':
            result = tempOperands[lastOperand2] * tempOperands[lastOperand1];
            break;
          case '/':
            result = tempOperands[lastOperand2] / tempOperands[lastOperand1];
            break;
        }
        tempOperands.push(result);
      }
      else {
        result = tempOperands[0];
      }

      this.setState({
        hasOperator: true,
        operators: tempOperators,
        operands: tempOperands,
        screenText: this.state.hasOperator ? (tempOperands.length % 2 === 0 ? result.toString() : this.state.screenText.slice(0, this.state.screenText.length - 1) + operator) :
          result.toString() + operator,
        resultClicked: false,
      }, () => {
        // console.log('tempoperands in operator: ', tempOperands);
      })
    }
  };

  handlePressAC = () => {
    this.setState({
      screenText: '0',
      hasDot: false,
      isPositive: true,
      hasOperator: false,
      resultClicked: false,
      resultClickedMultiple: false,
      operators: [],
      operands: [],
      memory: [],
    })
  };
  handlePressDot = () => {
    if (!this.state.hasDot) {
      this.setState({
        hasDot: true,
        screenText: this.state.screenText + '.',
      })
    }
  };
  handlePressNegator = () => {
    if (this.state.isPositive) {
      this.setState({
        screenText: '-' + this.state.screenText,
        isPositive: false,
      })
    }
    else {
      this.setState({
        isPositive: true,
        screenText: this.state.screenText.slice(1),
      })
    }
  };

  handlePressResult = () => {

    let tempOperands, tempOperators;
    tempOperands = [...this.state.operands, parseFloat(this.state.screenText)];
    // tempOperands = [...this.state.operands];
    tempOperators = [...this.state.operators];


    // tempOperands.push(parseFloat(this.state.screenText));
    console.log('efrgvbf: ', tempOperands);


    let lastOperator = tempOperators[tempOperators.length - 1];
    let lastOperand1, lastOperand2;
    lastOperand1 = tempOperands.length - 1;
    lastOperand2 = tempOperands.length - 2;

    let result = 0;
    switch (lastOperator) {
      case '+':
        result = tempOperands[lastOperand2] + tempOperands[lastOperand1];
        break;
      case '-':
        result = tempOperands[lastOperand2] - tempOperands[lastOperand1];
        break;
      case '*':
        result = tempOperands[lastOperand2] * tempOperands[lastOperand1];
        break;
      case '/':
        result = tempOperands[lastOperand2] / tempOperands[lastOperand1];
        break;
    }
    tempOperands.push(result);

    this.setState({
      resultClicked: true,
      screenText: result.toString(),
      resultClickedMultiple: true,
    }, () => {
      console.log('tempOperads in handleReuslt: ', tempOperands);
    });

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
