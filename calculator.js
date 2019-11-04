
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
let pendingVal;
let evalStringArray = [];
let calcBtns = document.getElementsByClassName('num-btn');
let opbtns = document.getElementsByClassName('op-btn');


let calculation = (clickObj) => {
   let operator = clickObj.target.innerText;

   switch (operator) {
      case '+':
         pendingVal = displayVal;
         evalStringArray.push(displayVal);
         evalStringArray.push('+');
         displayVal = '0';
         display.innerText = displayVal;
         break;
      case '-':
         pendingVal = displayVal;
         evalStringArray.push(displayVal);
         evalStringArray.push('-');
         displayVal = '0';
         display.innerText = displayVal;
         break;
      case '*':
         pendingVal = displayVal;
         evalStringArray.push(displayVal);
         evalStringArray.push('*');
         displayVal = '0';
         display.innerText = displayVal;
         break;
      case '/':
         pendingVal = displayVal;
         evalStringArray.push(displayVal);
         evalStringArray.push('/');
         displayVal = '0';
         display.innerText = displayVal;
         break;
      case '%':
         evalStringArray.push(displayVal);
         evalStringArray.push('%');
         displayVal = '0';
         display.innerText = displayVal;
         break;
      case '^':
         pendingVal = displayVal;
         evalStringArray.push(displayVal);
         evalStringArray.push('^');
         displayVal = '0';
         display.innerText = displayVal;
         break;
      case '(':
         pendingVal = displayVal;
         evalStringArray.push(displayVal);
         evalStringArray.push('(');
         displayVal = '0';
         display.innerText = displayVal;
         break;
      case ')':
         pendingVal = displayVal;
         evalStringArray.push(displayVal);
         evalStringArray.push(')');
         displayVal = '0';
         display.innerText = displayVal;
         break;
      case '=':
         evalStringArray.push(displayVal);
         displayVal = solution + '';
         display.innerText = displayVal;
         evalStringArray = [];
         break;
      default:
         break;
   }
}

btnAllClear.onclick = () => {
   displayVal = '0';
   pendingVal = undefined;
   display.innerHTML = displayVal;
   evalStringArray = [];
}

btnDecimal.onclick = () => {
   pendingVal
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

   displayVal += text;
   display.innerText = displayVal;
}

for (let i = 0; i < calcBtns.length; i++) {
   calcBtns[i].addEventListener('click', updateDisplay, false);
}

for (let i = 0; i < opbtns.length; i++) {
   opbtns[i].addEventListener('click', calculation, false);
}



document.getElementById("calc-equals").addEventListener("click", function(e) {
   //const expression = document.getElementById("expression").value;
   evalStringArray.push(displayVal);
   const expression = evalStringArray.toString();
   const tokens = parser.tokenize(expression);
   const answer = shuntingYardEvaluator(tokens);

   document.getElementById("calc-screen").innerHTML = answer;
});

function shuntingYardEvaluator(tokens) {
   const stack = [];

   while (tokens.length) {
       const token = tokens.shift();

       if (token.type == "NUM") {
           stack.push(parseFloat(token.val));
           continue;
       }

       const rightHandSide = stack.pop();
       const leftHandSide = stack.pop();

       switch (token.val) {
           case "+":
               stack.push(leftHandSide + rightHandSide);
               break;
           case "-":
               stack.push(leftHandSide - rightHandSide);
               break;
           case "*":
               stack.push(leftHandSide * rightHandSide);
               break;
           case "/":
               stack.push(leftHandSide / rightHandSide);
               break;
           case "%":
               stack.push(leftHandSide % rightHandSide);
               break;
           case "^":
               stack.push(Math.pow(leftHandSide, rightHandSide));
               break;   
           default:
               break;
       }
   }

   return stack.pop();
}

const parser = (function() {
   function tokenize(input) {
       const characters = input.split("");
       const tokens = [];

       while (characters.length) {
           readWhile(characters, isWhitespace);

           if (!characters.length) {
               break;
           }

           const char = characters.shift();

           if (isNum(char)) {
               tokens.push({ type: "NUM", val: char + readWhile(characters, isNum) });
           } else if (isOP(char)) {
               tokens.push({ type: "OP", val: char })
           }
       }

       return shuntingYard(tokens);
   }

   function readWhile(characters, predicate) {
       let string = "";

       while (characters.length && predicate(characters[0])) {
           string += characters.shift();
       }

       return string;
   }

   function isWhitespace(character) {
       return /[\n\t\s]/.test(character);
   }

   function isNum(character) {
       return /[0-9.]/.test(character);
   }

   function isOP(character) {
       return /[()\-+\/*^%]/.test(character);
   }

   // Shunting yard algorithm
   function shuntingYard(tokens) {
       const queue = [];
       const stack = [];
       const precendce = {
           "(": 10,
           "+": 20, "-": 20,
           "/": 30, "*": 30, "%": 30,
           "^": 40,
       };

       while (tokens.length) {
           const token = tokens.shift();
           const tokenPrecedence = precendce[token.val] || 0;
           let stackPrecedence = stack.length ? precendce[stack[stack.length - 1].val] : 0;

           if (token.type == "OP" && token.val == ")") {
               let operator = null;

               while ((operator = stack.pop()).val != "(") {
                   queue.push(operator);
               }
           } else if (token.type == "NUM") {
               queue.push(token);
           } else if (token.type == "OP" && (!stack.length || token.val == "(" || tokenPrecedence > stackPrecedence)) {
               stack.push(token);
           } else {
               while (tokenPrecedence <= stackPrecedence) {
                   queue.push(stack.pop());
                   stackPrecedence = stack.length ? precendce[stack[stack.length - 1].val] : 0;
               }

               stack.push(token);
           }
       }

       while (stack.length) {
           queue.push(stack.pop());
       }

       return queue;
   }

   return { tokenize };
})();