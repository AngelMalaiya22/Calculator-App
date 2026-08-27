// =========================
// Operations Object
// =========================

const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "×": (a, b) => a * b,
    "÷": (a, b) => a / b
};


// =========================
// Calculator State
// =========================

let displayValue = "0";
let firstNumber = null;
let currentOperator = null;
let waitingForSecondNumber = false;


// =========================
// DOM Elements
// =========================

const display = document.querySelector("#display-value");

const numberButtons = document.querySelectorAll(".number");

const operatorButtons = document.querySelectorAll(".operator");

const decimalButton = document.querySelector("#decimal");

const equalsButton = document.querySelector("#equals");

const clearButton = document.querySelector("#clear");


// =========================
// Update Display
// =========================

const updateDisplay = () => {

    // Template literal
    display.textContent = `${displayValue}`;
};


// =========================
// Number Input
// =========================

const inputNumber = (number) => {

    if (waitingForSecondNumber) {

        displayValue = number;

        waitingForSecondNumber = false;

    } else {

        displayValue =
            displayValue === "0"
                ? number
                : `${displayValue}${number}`;
    }

    updateDisplay();
};


// =========================
// Decimal Input
// =========================

const inputDecimal = () => {

    if (waitingForSecondNumber) {

        displayValue = "0.";

        waitingForSecondNumber = false;

        updateDisplay();

        return;
    }


    if (!displayValue.includes(".")) {

        displayValue = `${displayValue}.`;

        updateDisplay();
    }
};


// =========================
// Operator Input
// =========================

const chooseOperator = (operator) => {

    const inputValue = Number(displayValue);


    // If an operator already exists,
    // calculate the previous operation first
    if (
        currentOperator &&
        waitingForSecondNumber
    ) {
        currentOperator = operator;
        return;
    }


    if (firstNumber === null) {

        firstNumber = inputValue;

    } else if (currentOperator) {

        const result =
            operations[currentOperator](
                firstNumber,
                inputValue
            );

        displayValue = `${result}`;

        firstNumber = result;

        updateDisplay();
    }


    currentOperator = operator;

    waitingForSecondNumber = true;
};


// =========================
// Calculate Result
// =========================

const calculate = () => {

    if (
        currentOperator === null ||
        firstNumber === null
    ) {
        return;
    }


    const secondNumber = Number(displayValue);


    // Use operations object
    const result =
        operations[currentOperator](
            firstNumber,
            secondNumber
        );


    displayValue = `${result}`;

    firstNumber = null;

    currentOperator = null;

    waitingForSecondNumber = true;


    updateDisplay();
};


// =========================
// Clear Calculator
// =========================

const clearCalculator = () => {

    displayValue = "0";

    firstNumber = null;

    currentOperator = null;

    waitingForSecondNumber = false;


    updateDisplay();
};


// =========================
// Number Button Events
// =========================

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        const { number } = button.dataset;

        inputNumber(number);
    });
});


// =========================
// Operator Button Events
// =========================

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        const { operator } = button.dataset;

        chooseOperator(operator);
    });
});


// =========================
// Decimal Button
// =========================

decimalButton.addEventListener(
    "click",
    inputDecimal
);


// =========================
// Equals Button
// =========================

equalsButton.addEventListener(
    "click",
    calculate
);


// =========================
// Clear Button
// =========================

clearButton.addEventListener(
    "click",
    clearCalculator
);


// =========================
// Keyboard Support
// =========================

document.addEventListener("keydown", (event) => {

    const { key } = event;


    // Numbers
    if (key >= "0" && key <= "9") {

        inputNumber(key);
    }


    // Decimal
    else if (key === ".") {

        inputDecimal();
    }


    // Operators
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {

        const operatorMap = {
            "*": "×",
            "/": "÷",
            "+": "+",
            "-": "-"
        };

        chooseOperator(operatorMap[key]);
    }


    // Equals
    else if (key === "Enter" || key === "=") {

        calculate();
    }


    // Clear
    else if (
        key === "Escape" ||
        key.toLowerCase() === "c"
    ) {

        clearCalculator();
    }
});


// =========================
// Initial Display
// =========================

updateDisplay();