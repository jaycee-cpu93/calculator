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

        console.log(e.target.classList.contains("operator"))
        if(e.target.classList.contains("operator")){
            console.log("i am an operator")
            output.value = "";
        }
        if(key !== "=" && key !== "C" && key !== "bc"){
            operandArr.push(key)
        }
        //bc button removes the last element from the array
        else if(key === "bc"){
            operandArr.pop(key);
        }
        output.value = ""; // to avoid double value
        //populate the array
        operandArr.forEach(numberInTheArr => {
            output.value += numberInTheArr;
        });

        let firstAndSecondNumberOperator = getNumberAndNaNFromOperandArr() //get the first and second number and operator
        //the first number is the first element in the array
        let firstOperand = firstAndSecondNumberOperator[0];
        let secondOperand = firstAndSecondNumberOperator[1];

        //operation is getting the actual operator
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