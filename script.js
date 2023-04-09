const btns = document.querySelector("#btn-grid");
let input = "";
const operation = new Set(["x", "+", "-", "÷"]);

// Input
let inputDisplay = document.querySelector("#display1 .result");
btns.addEventListener("click", (btn) => {
  // Return nothing if not click to btn
  if (!btn.target.className.includes("btn")) return;
  // Input value
  let val = btn.target.innerText;
  let classOfBtn = btn.target.className;
  // If input is number
  if (classOfBtn.includes("num")) {
    operation.has(input.slice(-1)) ? (input += " ") : true; // Add space after operation
    input += `${val}`;
    // If input is operation
  } else if (classOfBtn.includes("ops") && input.length !== 0) {
    !operation.has(input.slice(-1)) ? (input += ` ${val}`) : true; // One operation only
    // If input is a dot
  } else if (classOfBtn.includes("dot") && input.length !== 0) {
    let last = input.split(" ").pop();
    if (!last.includes(".") && !isNaN(last.slice(-1))) input += val;
  }
  inputDisplay.innerText = input;
});

// Output
const equal = document.querySelector("#equal");
const outputDisplay = document
  .querySelector("#display")
  .querySelector(".result");
function calInArray(inputArr, operation) {
  let idx = inputArr.indexOf(operation);
  let before = parseFloat(inputArr[idx - 1]);
  let after = parseFloat(inputArr[idx + 1]);
  operation === "x"
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
equal.addEventListener("click", (_) => {
  const inputArr = input.split(" ");
  if (operation.has(inputArr[inputArr.length - 1])) return;
  // Mutiply and divided first
  while (inputArr.indexOf("x") !== -1 || inputArr.indexOf("÷") !== -1) {
    for (let index = 0; index < inputArr.length; index++) {
      if (inputArr[index] === "x") {
        calInArray(inputArr, "x");
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
  outputDisplay.innerText = inputArr[0];
});
// Clear & Del

btns.addEventListener("click", (btn) => {
  // Clear
  if (btn.target.getAttribute("id") === "clear") {
    input = "";
    inputDisplay.innerText = "";
    outputDisplay.innerText = "";
  }
  // Del 1 charater
  if (btn.target.getAttribute("id") === "backspace") {
    input = input.trim().slice(0, -1);
    inputDisplay.innerText = input;
  }
});
