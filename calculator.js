
let btn1 = document.getElementById('calc-1');
let btn2 = document.getElementById('calc-2');
let btn3 = document.getElementById('calc-3');
let btn4 = document.getElementById('calc-4');
let btn5 = document.getElementById('calc-5');
let btn6 = document.getElementById('calc-6');
let btn7 = document.getElementById('calc-7');
let btn8 = document.getElementById('calc-8');
let btn9 = document.getElementById('calc-9');
let btn0 = document.getElementById('calc-0');
let btnDecimal = document.getElementById('calc-decimal');

let btnOpenPar = document.getElementById('calc-open-p')
let btnClosePar = document.getElementById('calc-close-p')
let btnPlus = document.getElementById('calc-plus');
let btnMinus = document.getElementById('calc-minus');
let btnTimes = document.getElementById('calc-times');
let btnDivide = document.getElementById('calc-divide');
let btnEquals = document.getElementById('calc-equals');

let btnAllClear = document.getElementById('calc-clear');

let display = document.getElementById('calc-screen');
let displayVal = '0';
let evalStringArray = [];
let calcBtns = document.getElementsByClassName('num-btn');
let opbtns = document.getElementsByClassName('op-btn');

/*
let calculation = (clickObj) => {
   let operator = clickObj.target.innerText;

   switch (operator) {
      case '+':
         evalStringArray.push(displayVal);
         evalStringArray.push('+');
         displayVal = '0';
         display.innerText = displayVal;
         break;
      case '-':
         evalStringArray.push(displayVal);
         evalStringArray.push('-');
         displayVal = '0';
         display.innerText = displayVal;
         break;
      case 'x':
         evalStringArray.push(displayVal);
         evalStringArray.push('*');
         displayVal = '0';
         display.innerText = displayVal;
         break;
      case '÷':
         evalStringArray.push(displayVal);
         evalStringArray.push('/');
         displayVal = '0';
         display.innerText = displayVal;
         break;
      //case '(':
      //   evalStringArray.push(displayVal);
      //   evalStringArray.push('(');
      //   //displayVal = '0';
      //   display.innerText = displayVal;
      //   break;
      //case ')':
      //   evalStringArray.push(displayVal);
      //   evalStringArray.push(')');
      //   displayVal = '0';
      //   display.innerText = displayVal;
      //   break;
      case '=':
         evalStringArray.push(displayVal);
         let solution = eval(evalStringArray.join(' '));
         displayVal = solution + '';
         display.innerText = displayVal;
         //display.innerText = solution;
         evalStringArray = [];
         break;

      default:
         break;
   }
}
*/


btnEquals.onclick = () => {   
   let solution = undefined;

   try {
      solution = parseFloat(eval(display.innerHTML));
   } catch (error) {
      solution = error;
      console.log(solution);
   }

   display.innerHTML = solution;
   console.log(solution);
   displayVal = '0';
   
}

btnAllClear.onclick = () => {
   displayVal = '0';
   display.innerHTML = displayVal;
   evalStringArray = [];
}

btnDecimal.onclick = () => {
   if (!displayVal.includes('.')) {
      displayVal += '.';
   }
   display.innerText = displayVal;
}

let updateDisplay = (clickObj) => {
   let text = clickObj.target.innerText;

   if (displayVal === '0') {
      displayVal = '';
   }
   if (text.innerText === '÷') {
      text = '/';
   }
   if (text.innerText === 'x') {
      text.innerHTML = '*';
   }
   displayVal += text;
   display.innerText = displayVal;
}

for (let i = 0; i < calcBtns.length; i++) {
   calcBtns[i].addEventListener('click', updateDisplay, false);
}

for (let i = 0; i < opbtns.length; i++) {
   opbtns[i].addEventListener('click', updateDisplay, false);
}