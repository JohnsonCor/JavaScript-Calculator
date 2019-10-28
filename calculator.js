 const btn1 = document.getElementById('calc-1');
 const btn2 = document.getElementById('calc-2');
 const btn3 = document.getElementById('calc-3');
 const btn4 = document.getElementById('calc-4');
 const btn5 = document.getElementById('calc-5');
 const btn6 = document.getElementById('calc-6');
 const btn7 = document.getElementById('calc-7');
 const btn8 = document.getElementById('calc-8');
 const btn9 = document.getElementById('calc-9');
 const btn0 = document.getElementById('calc-0');
 const btnDecimal = document.getElementById('calc-decimal');

 const btnOpenPar = document.getElementById('calc-open-p')
 const btnClosePar = document.getElementById('calc-close-p')
 const btnPlus = document.getElementById('calc-plus');
 const btnMinus = document.getElementById('calc-minus');
 const btnTimes = document.getElementById('calc-times');
 const btnDivide = document.getElementById('calc-divide');

 const btnAllClear = document.getElementById('calc-clear');

 let display = document.getElementById('calc-display');
 let displayVal = 0;
 let evalStringArray = [];
 let calcBtns = document.getElementsByClassName('calc-button');

 for (let i = 0; i < calcBtns.length; i++) {
    calcBtns[i].addEventListener('click', updateDisplay, false);
 }

 let updateDisplay = (clickobj) => {
    let text = clickobj.target.innerText;

    if (displayVal === 0) {
        displayVal = '';
    }

    displayVal += text;
    display.innerText = text;
 }