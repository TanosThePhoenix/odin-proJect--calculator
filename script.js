function add(a, b){return a+b;}
function subtract(a, b){return a-b;}
function multiply(a, b){return a*b;}
function divide(a, b){return a/b;}

function negate(a){ return -a;}

let numStored = 0;
let numDisplayed = 0;
let typingWillStoreDisplayedNum = true;

const display = document.getElementById("display");

function pressNumber(e){
	const newNum = e.currentTarget.id;
	if(typingWillStoreDisplayedNum){
		numStored = numDisplayed;
		numDisplayed = 0;
		typingWillStoreDisplayedNum = false;
	}
	let currentNum = numDisplayed.toString() + newNum.toString();
	//TODO may want special case for decimal, negate input
	numDisplayed = parseFloat(currentNum);
	displayNumDisplayed()
}

//TODO: store operation until next number is ready

function pressFunction(){
	//TODO - input correct function into calculation
	const funcChosen = add;
	const num1 = parseFloat(numStored);
	const num2 = parseFloat(numDisplayed);
	switch(funcChosen){
		case add:
			numDisplayed = add(num1, num2);
			break;
		case subtract:
			numDisplayed = subtract(num1, num2);
			break;
		case multiply:
			numDisplayed = multiply(num1, num2);
			break;
		case divide:
			numDisplayed = divide(num1, num2);
			break;
	}
	typingWillStoreDisplayedNum = true;
	displayNumDisplayed()
}

function displayNumDisplayed(){
	//TODO-fill this out
	display.innerText = numDisplayed;
}

const numButtons = document.getElementsByClassName("number-button");
const funcButtons = document.getElementsByClassName("function-button");

for(const b of numButtons){
	b.addEventListener('click', pressNumber);
}

for(const b of funcButtons){
	b.addEventListener('click', pressFunction);
}