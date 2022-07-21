//onclick of a button i want to display the value of the button in a div container
//i want to display the value of the button in a div container
/* let firstOperand = document.getElementsByClassName("operand");
console.log(firstOperand)
let secondOperand = document.getElementsByClassName("operand").value;
let operator = document.getElementsByClassName("operator").value;
let result = document.getElementsByClassName("result").value; */
//let clear = document.getElementsByClassName("clear");
 //div container to display the result
let operandArr = [];

function addition (num1, num2){
    return num1 + num2
}

function subtraction (num1, num2){
    return num1 - num2
}

function multiplication (num1,  num2){
    return num1 * num2
}

function division (num1, num2){
    if(num2 === 0){
        return "0";
    }
    else {
    return num1 / num2
}
}
function modulus (num1, num2){
    return num1 % num2
}


function getNumberAndNaNFromOperandArr() {
    let operator;
    let NotANumberList = [];

    operandArr.forEach(operatorInTheArr => {
        if(isNaN(operatorInTheArr)){
            NotANumberList.push(operatorInTheArr);
        }
    });
    operator = NotANumberList.sort()[0]//sort the array and get the first element
    let operatorIndex = operandArr.indexOf(operator);
    console.log(operatorIndex)

    //let firstNumber = operandArr[operatorIndex - 1];
    //let secondNumber = operandArr[operatorIndex + 1];
    let firstOperationnumber = parseFloat(operandArr.slice(0, operatorIndex).join(""));
    let secondOperationnumber = parseFloat(operandArr.slice(operatorIndex + 1, operandArr.length).join(""));
    //console.log([firstOperationnumber, secondOperationnumber, operatorIndex]);
    return [firstOperationnumber, secondOperationnumber, operatorIndex];
}

//get value of the button clicked into the input field
window.addEventListener("click",(e) => {
    if(e.target.localName ==="button"){
        let output = document.getElementById("output");
        let key = e.target.value;
        output.value = key;
        //console.log(e.target.localName)
        // if(key === "backspace"){
        //     operandArr.pop(key);
        // }
        console.log(e.target.classList.contains("operator"))
        if(e.target.classList.contains("operator")){
            console.log("i am an operator")
            output.value = "";
        }
        if(key !== "=" && key !== "C" && key !== "bc"){
            operandArr.push(key)
        }
        else if(key === "bc"){
            operandArr.pop(key);
        }
        output.value = ""; // to avoid double value
        //console.log(operandArr)
        operandArr.forEach(numberInTheArr => {
            output.value += numberInTheArr;
        });

        let firstAndSecondNumberOperator = getNumberAndNaNFromOperandArr()
        //console.log(firstAndSecondNumberOperator)
        let firstOperand = firstAndSecondNumberOperator[0];
        let secondOperand = firstAndSecondNumberOperator[1];
        let operation = operandArr[firstAndSecondNumberOperator[2]];
        let answer = 0
        if(key==="=" && operandArr.length > 1){
            //console.log(firstOperand, secondOperand, operation)
            if(operation === "+"){
                answer = addition(firstOperand, secondOperand);
            }
            else if(operation === "-"){
                answer = subtraction(firstOperand, secondOperand)
            }
            else if(operation === "*"){
                answer = multiplication(firstOperand, secondOperand)
            }
            else if(operation === "/"){
                answer = division(firstOperand, secondOperand)
            }
            else if(operation === "%"){
                answer = modulus(firstOperand, secondOperand)
            }
            else if(operation === "."){
                answer = decimalPoint(firstOperand)
            }
            output.value = answer
        }
        if (key ==="C") {
            //this will empty the input_field (calculator display), after i also need to empty/clear the array 
            output.value = "";
            //this will empty the array like this
            operandArr = []
        }

        
    }
});









// function simpleCalculator() {
//     var num1 = document.getElementById("num1").value;
//     var num2 = document.getElementById("num2").value;
//     var operator = document.getElementById("operator").value;
//     var result = 0;
//     if (operator == "+") {
//         result = parseInt(num1) + parseInt(num2);
//     } else if (operator == "-") {
//         result = parseInt(num1) - parseInt(num2);
//     } else if (operator == "*") {
//         result = parseInt(num1) * parseInt(num2);
//     } else if (operator == "/") {
//         result = parseInt(num1) / parseInt(num2);
//     }
//     document.getElementById("result").value = result;
// }  //end of simpleCalculator


/* function operate(operator, num1, num2) {
    if (operator === '+') {
        return num1 + num2;
    } else if (operator === '-') {
        return num1 - num2;
    } else if (operator === '*') {
        return num1 * num2;
    } else if (operator === '/') {
        return num1 / num2;
    }
}
console.log(operate('+', 1, 2)); */