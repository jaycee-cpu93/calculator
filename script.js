let operators = ["+", "-", "/", "*"];

let output = null;
let last_operation_history = null;
let operator = null;
let equal = null;
let dot = null;

let firstNum = true;

let numbers = [];
let operator_value;
let last_button;
let calc_operator;

let total;

function button_number(button) {

    operator = document.getElementsByClassName("operator");
    output = document.getElementById("output");
    last_operation_history = document.getElementById("last_operation_history");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;
    
    last_button = button;

    // if button is not an operator or = sign
    if (!operators.includes(button) && button!=equal){
        // if it is the first button clicked
        if (firstNum){
            // and it's a dot, show 0.
            if (button == dot){
                output.innerText = "0" + dot;
            }
            // else clear output and show the number
            else {
                output.innerText = button;
            }
            firstNum = false;
        }
        else {

            // return if the output value is 0
            if (output.innerText.length == 1 && output.innerText == 0){

                if (button == dot){
                    output.innerText += button;
                }
                return;
            }
            // return if the output already has a dot and clicked button is a dot
            if (output.innerText.includes(dot) && button == dot){
                return;
            }
            // maximum allowed numbers inputted are 20
            if (output.innerText.length == 9){
                return;
            }

            // if pressed dot and output already has a - sign, show -0.
            if (button == dot && output.innerText == "-"){
                output.innerText = "-0"+dot;
            }
            // else append number
            else {
                output.innerText += button;
            }  
        }
    }
    // if it's an operator or = sign
    else {

        // return if operator is already pressed
        if (operator_value != null && button == operator_value){
            return
        }

        // show minus sign if it's the first value selected and finally return
        if (button == "-" && output.innerText == 0){
            output.innerText = button;
            firstNum = false;
            operator_value = button
            showSelectedOperator()
            return;
        }
        // return if minus operator pressed and it's already printed on screen 
        else if (operators.includes(button) && output.innerText == "-"){
            return
        }
        // return if minus operator pressed and history already has equal sign
        else if (button == "-" && operator_value == "-" && last_operation_history.innerText.includes("=")){
            return
        }

        // set value of operator if it's one
        if (operators.includes(button)){
            if (typeof last_operator != "undefined" && last_operator != null){
                calc_operator = last_operator
            }
            else {
                calc_operator = button
            }
            if (button == "*"){
                last_operator = "×"
            }
            else if (button == "/"){
                last_operator = "÷"
            }
            else {
                last_operator = button
            }
            operator_value = button
            firstNum = true
            showSelectedOperator()
        }

        // add first number to numbers array and show it on history
        if (numbers.length == 0){
            numbers.push(output.innerText)
            if (typeof last_operator != "undefined" && last_operator != null){
                last_operation_history.innerText = output.innerText + " " + last_operator
            }
        }
        // rest of calculations
        else {   
            if (numbers.length == 1){
                numbers[1] = output.innerText
            }
            let temp_num = output.innerText

            // calculate total
            if (button==equal && calc_operator != null){
                let total = calculate(numbers[0], numbers[1], calc_operator)
                output.innerText = total;

                // append second number to history
                if (!last_operation_history.innerText.includes("=")){
                    last_operation_history.innerText += " " + numbers[1] + " ="
                }

                temp_num = numbers[0]

                numbers[0] = total
                operator_value = null
                showSelectedOperator()

                // replace first number of history with the value of total
                let history_arr = last_operation_history.innerText.split(" ")
                history_arr[0] = temp_num
                last_operation_history.innerText = history_arr.join(" ")
            }
            // update history with the value on screen and the pressed operator
            else if (calc_operator != null) {
                 last_operation_history.innerText = temp_num + " " + last_operator
                 calc_operator = button
                 numbers = []
                 numbers.push(output.innerText)
            }
        }
    }

}
 // highlight operator button when selected
function showSelectedOperator(){

    let elements = document.getElementsByClassName("operator");
}

// function to calculate the result using two number and an operator
function calculate(num1, num2, operator){

    if (operator === "+"){
        total = (parseFloat)(num1)+(parseFloat)(num2)
    }
    else if (operator === "-"){
        total = (parseFloat)(num1)-(parseFloat)(num2)
    }
    else if (operator === "*"){
        total = (parseFloat)(num1)*(parseFloat)(num2)
    }
    else if (operator === "/"){
        total = (parseFloat)(num1)/(parseFloat)(num2)
    }
    else {
        if (total == output.innerText){
            return total
        }
        else {
            return output.innerText
        }
    }
    // if total is not integer, show maximum 12 decimal places
    if (!Number.isInteger(total)){
        total = total.toPrecision(12);
    }
    return parseFloat(total);
}

// function to clear output and reset everything
function button_clear(){
    window.location.reload()
}

function backspace_remove(){

    output = document.getElementById("output");
    let elements = document.getElementsByClassName("operator");

    // for (let i=0; i<elements.length; i++){
    //     elements[i].style.backgroundColor  = "#e68a00";
    // }

    let last_num = output.innerText;
    last_num = last_num.slice(0, -1)
    
    output.innerText = last_num

    // show 0 zero if all characters on screen are removed
    if (output.innerText.length == 0){
        output.innerText = 0
        firstNum = true
    }

}


// function to change the sign of the number currently on screen
function plus_minus(){
    output = document.getElementById("output");

    // if any operator is already pressed
    if (typeof last_operator != "undefined"){
        if (numbers.length>0){
            // if last button pressed is an operator
            if (operators.includes(last_button)){
                // if the displayed text is just a negative sign, replace it with a 0
                if (output.innerText == "-"){
                    output.innerText = 0
                    firstNum = true
                    return
                }
                // if the displayed text is not a just a negative sign, replace it with a negative sign
                else {
                    output.innerText = "-"
                    firstNum = false
                }
            }
            // if last button pressed is not an operator, change its sign
            else {
                output.innerText = -output.innerText

                if (numbers.length==1){
                    numbers[0] = output.innerText
                }
                else {
                    numbers[1] = output.innerText
                }
            }
        }
        return
    }

    // if displayed text is 0, replace it with a negative sign
    if (output.innerText == 0){
        output.innerText = "-"
        firstNum = false
        return
    }
    output.innerText = -output.innerText
}

// function to calculate square root of the number currently on screen
function square_root(){
    output = document.getElementById("output");
    let square_num = Math.sqrt(output.innerText)
    output.innerText = square_num
    numbers.push(square_num)
}

// function to calculate the division of 1 with the number currently on screen
function division_one(){
    output = document.getElementById("output");
    let square_num = 1/output.innerText
    output.innerText = square_num
    numbers.push(square_num)
}

// function to calculate the power of the number currently on screen
function power_of(){
    output = document.getElementById("output");
    let square_num =Math.pow(output.innerText, 2)
    output.innerText = square_num
    numbers.push(square_num)
}

// function to calculate the percentage of a number
function calculate_percentage(){
    let elements = document.getElementsByClassName("operator");
    output = document.getElementById("output");

    if (numbers.length > 0 && typeof last_operator != "undefined"){
        if (last_operator == "+" || last_operator == "-"){
            output.innerText = numbers*output.innerText/100
        }
        else {
            output.innerText = output.innerText/100
        }
    }
    else {
        output.innerText = output.innerText/100
    }
    numbers = []
    numbers.push(output.innerText)

    // deselect operator if any selected
    // for (let i=0; i<elements.length; i++){
    //     elements[i].style.backgroundColor  = "#e68a00";
    // }
}

// function to clear last number typed into the display
function clear_entry(){
    output = document.getElementById("output");

    if (numbers.length > 0 && typeof last_operator != "undefined"){
        output.innerText = 0
        let temp = numbers[0]
        numbers = []
        numbers.push(temp)
        firstNum = true;
    }
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

// function to capture keydown events
function keyPressed(e) {
    e.preventDefault()
    let equal = document.getElementById("equal_sign").value;
    let dot = document.getElementById("dot").value;

    if (e.key == "Delete"){
        button_clear();
        return;
    }

    let isNumber = isFinite(e.key);
    let enterPress;
    let dotPress;
    let commaPress = false;

    if (e.key == "Enter"){
        enterPress = equal;
    }
    if (e.key == "."){
        dotPress = dot;
    }
    if (e.key == ","){
        commaPress = true;
    }
    
    if (isNumber || operators.includes(e.key) || e.key == "Enter" || e.key == dotPress || 
        commaPress || e.key == "Backspace"){
        if (e.key == "Enter"){
            button_number(enterPress)
        }
        else if (e.key == "Backspace"){
            document.getElementById("backspace_btn");
            backspace_remove()
        }
        else if (commaPress){
            button_number(dot)
        }
        else {
            button_number(e.key) 
        }   
    }
}

window.addEventListener("keydown", function (e) {
    const keyboard = document.querySelector(`button[data-key='${e.keyCode}']`);
    keyboard.click();
    console.log(keyboard);
  });