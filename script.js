const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.btn');

let screenValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateScreen() {
    screen.textContent = screenValue;
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.value;

        if (value === 'C') {
            screenValue = '0';
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
        } else if (value === '=') {
            if (operator && firstValue !== null) {
                const secondValue = parseFloat(screenValue);
                let result;
                switch (operator) {
                    case '+':
                        result = firstValue + secondValue;
                        break;
                    case '-':
                        result = firstValue - secondValue;
                        break;
                    case '*':
                        result = firstValue * secondValue;
                        break;
                    case '/':
                        result = firstValue / secondValue;
                        break;
                }
                screenValue = result.toString();
                firstValue = null;
                operator = null;
                waitingForSecondValue = false;
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            firstValue = parseFloat(screenValue);
            operator = value;
            waitingForSecondValue = true;
        } else {
            if (waitingForSecondValue) {
                screenValue = value;
                waitingForSecondValue = false;
            } else {
                screenValue = screenValue === '0' ? value : screenValue + value;
            }
        }

        updateScreen();
    });
});

updateScreen();
