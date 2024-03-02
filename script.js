function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { 
	if(b != 0) return a / b;
	return "Error: Can't Divide by Zero";
}

let numStored = 0;
let numDisplayed = 0;
let typingWillStoreDisplayedNum = true;

const display = document.getElementById("display");

function pressNumber(e) {
	const newNum = e.currentTarget.id;
	console.log(`pressNumber - typingWillStoreDisplayNum:${typingWillStoreDisplayedNum}`);

	let currentNum = numDisplayed;

	if (newNum == "negative") {
		if (currentNum.toString()[0] == '-') {
			currentNum = numDisplayed.toString().slice(1);
			numDisplayed = parseFloat(currentNum);
		} else {
			currentNum = "-" + numDisplayed.toString();
			numDisplayed = parseFloat(currentNum);
		}
	} else {

		if (typingWillStoreDisplayedNum) {
			numStored = numDisplayed;
			numDisplayed = 0;
			displayNumDisplayed();
			typingWillStoreDisplayedNum = false;
		}

		if (newNum == "decimal" && !numDisplayed.toString().includes('.')) {
			console.log(`Decimal pressed - type of numDisplayed:${typeof numDisplayed}`)
			currentNum = numDisplayed.toString() + '.';
			numDisplayed = currentNum;
		} else { //Regular digits instead of special cases
			currentNum = numDisplayed.toString() + newNum.toString();
			numDisplayed = parseFloat(currentNum);
		}
	}
	displayNumDisplayed()
}

let funcStored = null;

function activateStoredFunction() {
	console.log('activateStoredFunction called\ncurrent stored function:' + funcStored);
	if (funcStored) {
		const num1 = parseFloat(numStored);
		const num2 = parseFloat(numDisplayed);
		switch (funcStored) {
			case 'add':
				console.log('add called from activateStoredFunction');
				numDisplayed = add(num1, num2);
				break;
			case 'subtract':
				numDisplayed = subtract(num1, num2);
				break;
			case 'multiply':
				numDisplayed = multiply(num1, num2);
				break;
			case 'divide':
				numDisplayed = divide(num1, num2);
				break;
		}
		console.log(`current numDisplayed:${numDisplayed}`);
		//Only do next step if numDisplayed is actually a number and not error message
		if(typeof numDisplayed === "number") numDisplayed = parseFloat(numDisplayed.toFixed(8));
		//Line above is to prevent error propagation from floating point errors
	}
	resetDisplayNumAutoStore();
	displayNumDisplayed();
}

function pressFunction(e) {
	const funcChosen = e.currentTarget.id;
	console.log(`DisplayedNum: ${numDisplayed} \nStoredNum:${numStored} \nfuncChosen:${funcChosen}`);
	if (funcChosen == 'clear') {
		numStored = 0;
		numDisplayed = 0;
		resetDisplayNumAutoStore()
		funcStored = null;
		displayNumDisplayed()
	} else {
		activateStoredFunction();
		numStored = numDisplayed;
		console.log(`numDisplayed now:${numDisplayed}`);
		displayNumDisplayed();
		if (funcChosen == 'equal') {
			funcStored = null;
		} else {
			funcStored = funcChosen;
		}
	}
}

function displayNumDisplayed() {
	//TODO-Refactor this and places that use this into a set function
	display.innerText = numDisplayed;
}

function resetDisplayNumAutoStore() {
	console.log('resetDisplayNumAutoStore called');
	typingWillStoreDisplayedNum = true;
}

const numButtons = document.getElementsByClassName("number-button");
const funcButtons = document.getElementsByClassName("function-button");

for (const b of numButtons) {
	b.addEventListener('click', pressNumber);
}

for (const b of funcButtons) {
	b.addEventListener('click', pressFunction);
}