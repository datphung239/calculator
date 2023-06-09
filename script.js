const btns = document.querySelector("#btn-grid");
let input = "";
const operation = new Set(["×", "+", "-", "÷"]);

// Input
let inputDisplay = document.querySelector("#display1 .result");
function inputFunc(btn) {
  // Return nothing if not click to btn
  if (!btn.target.className.includes("btn")) return;
  // Input value
  let val = btn.target.innerText;
  let classOfBtn = btn.target.className;
  // Number
  if (classOfBtn.includes("num")) {
    operation.has(input.slice(-1)) ? (input += " ") : true; // Add space after operation
    input += `${val}`;
    // Operator
  } else if (classOfBtn.includes("ops") && input.length !== 0) {
    // If dot at the end of number --> can not add operator
    if (input.slice(-1) === ".") return;
    // Input a operation,
    !operation.has(input.slice(-1))
      ? (input += ` ${val}`) // Add space after number
      : // If other operator clicked then replace it with the last one
      input.slice(-1) !== btn.target.innerText
      ? (input = input.slice(0, -1) + btn.target.innerText)
      : true;
    // A dot
  } else if (classOfBtn.includes("dot") && input.length !== 0) {
    let last = input.split(" ").pop();
    if (!last.includes(".") && !isNaN(last.slice(-1))) input += val;
  }
  inputDisplay.innerText = input;
}
btns.addEventListener("click", inputFunc);

// Input by pressing keyboard
const btnArray = btns.querySelectorAll(".btn");
function pressKey(event) {
  // Press enter to output
  if (event.key === "Enter") {
    equal.click();
  } else if (event.key === "Delete") {
    document.querySelector("#clear").click();
    // Press backspace to delete 1 char
  } else if (event.key === "Backspace") {
    const backspace = document.querySelector("#backspace");
    backspace.click();
    // Press Slash to division
  } else if (event.key === "/") {
    document.querySelector("#division").click();
    // Press Shift 8 to mutiply
  } else if (event.key === "*") {
    document.querySelector("#mutiply").click();
    // Press any key inside btn-grid to interact
  } else {
    btnArray.forEach((btn) => {
      if (btn.innerText === event.key) {
        btn.click();
        btn.classList.add("active");
        setTimeout(function () {
          btn.classList.remove("active");
        }, 100);
      }
    });
  }
}
document.addEventListener("keydown", pressKey);

// Output
let previousInput = document.querySelector("#sub-display > div.previous-input");
const equal = document.querySelector("#equal");
const outputDisplay = document
  .querySelector("#display")
  .querySelector(".result");
// Function to calculate add subtract multiply and divide
function calInArray(inputArr, operation) {
  let idx = inputArr.indexOf(operation);
  let before = parseFloat(inputArr[idx - 1]);
  let after = parseFloat(inputArr[idx + 1]);
  operation === "×"
    ? (result = before * after)
    : operation === "÷"
    ? (result = before / after)
    : operation === "+"
    ? (result = before + after)
    : operation === "-"
    ? (result = before - after)
    : true;
  inputArr[idx - 1] = result;
  inputArr.splice(idx, 2);
}
// Execute when click on equal button
function output(_) {
  // If . at the end or nothing  --> return
  if (input.slice(-1) === "." || input.length === 0) return;
  // Main
  const inputArr = input.split(" ");
  if (operation.has(inputArr[inputArr.length - 1])) return;
  // Mutiply and divided first
  while (inputArr.indexOf("×") !== -1 || inputArr.indexOf("÷") !== -1) {
    for (let index = 0; index < inputArr.length; index++) {
      if (inputArr[index] === "×") {
        calInArray(inputArr, "×");
        break;
      } else if (inputArr[index] === "÷") {
        calInArray(inputArr, "÷");
        break;
      }
    }
  }
  while (inputArr.indexOf("+") !== -1 || inputArr.indexOf("-") !== -1) {
    for (let index = 0; index < inputArr.length; index++) {
      if (inputArr[index] === "+") {
        calInArray(inputArr, "+");
        break;
      } else if (inputArr[index] === "-") {
        calInArray(inputArr, "-");
        break;
      }
    }
  }
  outputDisplay.innerText = parseFloat(inputArr[0]);
  previousInput.innerText = input;
  input = "";
}
equal.addEventListener("click", output);

// Clear & Del
function clearAndDel(btn) {
  // Clear
  if (btn.target.getAttribute("id") === "clear") {
    input = "";
    inputDisplay.innerText = "";
    previousInput.innerText = "";
    outputDisplay.innerText = "";
  }
  // Del 1 charater
  if (btn.target.getAttribute("id") === "backspace") {
    input = input.trim().slice(0, -1).trim();
    inputDisplay.innerText = input;
  }
}
btns.addEventListener("click", clearAndDel);
