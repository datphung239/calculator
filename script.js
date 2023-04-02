const btns = document.querySelector("#btn-grid");
let input = "";
const operation = new Set(["x", "+", "-", "÷"]);
// Input
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
  let inputDisplay = document.querySelector("#display1 .result");
  inputDisplay.innerText = input;
});
// Output
const equal = document.querySelector("#equal");
equal.addEventListener("click", (_) => {
  console.log(input);
  console.log(7.3 * 9 - (6 / 9) * 9);
});
