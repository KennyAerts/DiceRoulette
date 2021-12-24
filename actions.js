// global variables
let	numberToMark;
let betAmount = 5; // init first default value
let bankRollAmount = 1000; // init default bankroll amount
let totalBetAmount = 0; // init default total bet amount
let rollDiceButton = document.getElementById("rollDiceButton");
let betAmountSelector = document.getElementById("betAmountSelector");
let clearAllBetsButton = document.getElementById("clearAllBetsButton");
let rollValueBoth;
let betsArray = []; // init empty array to store all current table bets

// automize HTML setup
// add chip images to table and hide them on load
let allOutsideBets = document.getElementsByClassName("outsideBets");
for (let i = 0; i < allOutsideBets.length; i++) {
	  let chipImageOutsideBet = document.createElement("img");
		chipImageOutsideBet.src = "chips/yellow.svg";
		chipImageOutsideBet.classList.add("chipImageOutsideBet");
    allOutsideBets[i].appendChild(chipImageOutsideBet);
    allOutsideBets[i].addEventListener('click', clickedBet, false);
}

let allInsideBets = document.getElementsByClassName("insideBets");
for (let i = 0; i < allInsideBets.length; i++) {
	  let chipImageInsideBet = document.createElement("img");
		chipImageInsideBet.src = "chips/yellow.svg";
		chipImageInsideBet.classList.add("chipImageInsideBet");
    allInsideBets[i].appendChild(chipImageInsideBet);
    allInsideBets[i].addEventListener('click', clickedBet, false);
}

function clickedBet() {
	// only allow if dice are not rolling
	if (clearAllBetsButton.disabled == false) {
  	// toggle OFF
    if (this.children[0].style.visibility == "visible") {
      this.children[0].style.visibility = "hidden";
  		bankRollAmount += betAmount;
  		document.getElementById("bankRollAmount").innerHTML = bankRollAmount;
  		// enable roll button again if bankroll positive
  		if (bankRollAmount >= 0) {
  			rollDiceButton.disabled = false;
  		}
  		totalBetAmount -= betAmount;
  		document.getElementById("totalBetAmount").innerHTML = totalBetAmount;
			// remove id of clicked div to betsArray, use indexOf() and splice()
			// https://www.delftstack.com/howto/javascript/javascript-remove-from-array-by-value/
			betsArray.splice(betsArray.indexOf(this.id), 1);
    }
    // toggle ON
    else {
      this.children[0].style.visibility = "visible";
      bankRollAmount -= betAmount;
  		document.getElementById("bankRollAmount").innerHTML = bankRollAmount;
  		// disable roll button if negative bankroll
  		if (bankRollAmount < 0) {
  			rollDiceButton.disabled = true;
  		}
  		totalBetAmount += betAmount;
  		document.getElementById("totalBetAmount").innerHTML = totalBetAmount;
			// add id of clicked div to betsArray
			betsArray.push(this.id);
    }
	}
}

function clearAllChips() {
  let allChipImagesInsideBets = document.getElementsByClassName("chipImageInsideBet");
	for (let i = 0; i < allChipImagesInsideBets.length; i++) {
		allChipImagesInsideBets[i].style.visibility = "hidden";
	}
	let allChipImagesOutsideBets = document.getElementsByClassName("chipImageOutsideBet");
	for (let i = 0; i < allChipImagesOutsideBets.length; i++) {
		allChipImagesOutsideBets[i].style.visibility = "hidden";
	}
	// remove all ids of betsArray
	// https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript/8134354#8134354
	betsArray.splice(0, betsArray.length);
}

function clearTotalBet() {
	bankRollAmount += totalBetAmount; // add total bets to bankroll again
	totalBetAmount -= totalBetAmount; // set total bets to zero
	document.getElementById("bankRollAmount").innerHTML = bankRollAmount;
	document.getElementById("totalBetAmount").innerHTML = totalBetAmount;
	// enable roll button again once negative bet is cleared
	if (bankRollAmount >= 0) {
		rollDiceButton.disabled = false;
	}
}

function betAmountSelectorChanged() {
	// input value is fetched as text, convert to number first
	// https://www.w3schools.com/jsref/jsref_number.asp
	betAmount = Number(document.getElementById("betAmountSelector").value);
	clearAllChips();
	clearTotalBet();
	// clear winnings and losings
	document.getElementById("winnings").innerHTML = "";
	document.getElementById("losings").innerHTML = "";
}

function clearAllBets() {
	// for manual button use
	// TODO: only enable button if there are chips on table, difficult to check
	clearAllChips();
	clearTotalBet();
	// clear winnings and losings
	document.getElementById("winnings").innerHTML = "";
	document.getElementById("losings").innerHTML = "";
}

function rollDice() {
  // https://stackoverflow.com/questions/13831601/disabling-and-enabling-a-html-input-button
  rollDiceButton.disabled = true;
	betAmountSelector.disabled = true;
	clearAllBetsButton.disabled = true;

	// clear winnings and losings
	document.getElementById("winnings").innerHTML = "";
	document.getElementById("losings").innerHTML = "";

	// initialize counter starting at 1
	let animationCounter = 1;
	// initialize empty variables
	let rollValue1;
	let rollValue2;


	// Clear previous marked number if marked
	// https://stackoverflow.com/questions/3390396/how-can-i-check-for-undefined-in-javascript
	if (typeof numberToMark !== 'undefined') {
	numberToMark.style.boxShadow = "none";
  }

	// https://javascript.info/js-animation
	// repeat random times with Timeout for animation https://www.w3schools.com/js/js_timing.asp
	// https://www.w3schools.com/jsref/met_win_setinterval.asp
	// start loop withdelay with setInterval() and stop with clearInterval()
	let rollAnimation = setInterval(function() {
    // animation repeats until done
	  if (animationCounter >= 15) {
			// What to do after animation
	    clearInterval(rollAnimation); // finish the animation
			animationCounter = 1; // reset counter
			// https://stackoverflow.com/questions/1723716/how-to-concatenate-two-numbers-in-javascript
			rollValueBoth = `${rollValue1}${rollValue2}`;
			markRolledNumber(rollValueBoth);
			// check all bets
			checkAllBetsWonLost();
			// enable input again after function
			rollDiceButton.disabled = false;
			betAmountSelector.disabled = false;
			clearAllBetsButton.disabled = false;

	    return;
	  }

		let diceImage1 = document.getElementById("diceImage1");
	  rollValue1 = Math.floor(Math.random() * 6) + 1;
		diceImage1.src = "dice/dice-"+ rollValue1 +".svg";

		let diceImage2 = document.getElementById("diceImage2");
		rollValue2 = Math.floor(Math.random() * 6) + 1;
	  diceImage2.src = "dice/dice-"+ rollValue2 +".svg";

		animationCounter += 1;
  // delay time
	}, 75);
}

function markRolledNumber(param) {
	let constructedID = "number"+param;
  numberToMark = document.getElementById(constructedID);
	// border without affecting size: https://www.delftstack.com/howto/css/css-inner-border/
	// can easily be applied and removed without affecting border
	numberToMark.style.boxShadow = "0px 0px 0px 5px #0F0 inset";
}

function checkAllBetsWonLost() {
	let winnings = 0; // init winnings
	let losings = 0; // init losings
	// https://stackoverflow.com/questions/7486085/copy-array-by-value
	// let removedBetsArray = betsArray; init copy, store array with removed bets outside loop
  // NO, instead use backwards loop: https://stackoverflow.com/questions/7486085/copy-array-by-value

  // https://stackoverflow.com/questions/24403732/how-to-check-if-array-is-empty-or-does-not-exist
  if (betsArray.length == 0) {
		// do nothing
		return;
	}
	for (var i = betsArray.length - 1; i >= 0; i--) { // TODO: remove backup: let i = 0; i < betsArray.length; i++
		// https://www.w3schools.com/jsref/jsref_includes_array.asp
		// can an array value be used as a object name? NO...
		// String to Object type??
		// let winningValueMap = winningValuesMapper(betsArray[i]); -> WORKS
		// eval() -> WORKS, why not use it?
		// https://stackoverflow.com/questions/10953303/javascript-interpret-string-as-object-reference/10953396
		// https://humanwhocodes.com/blog/2013/06/25/eval-isnt-evil-just-misunderstood/
		// Is winning number in serie of bet?
    // WON BET
		let lookupBetArray = eval(betsArray[i]);
		let betString = String(betsArray[i]);
    if (lookupBetArray.includes(Number(rollValueBoth))) {
			// get risk of bet -> Needs bet name, not array of winning numbers (returned with eval)
			let payoutRisk = payoutLookupValues[betString];
			// add winning for this roll to total winnings
			winnings += payoutRisk * betAmount;
			document.getElementById("winnings").innerHTML = "+"+winnings;
			// add bet winning to bank roll
			bankRollAmount += payoutRisk * betAmount;
			document.getElementById("bankRollAmount").innerHTML = bankRollAmount;
			// TODO: add visual of how many won (and lost?)
			// leave winning bet on the table
		}
		// LOST BET
		else {
			losings += betAmount;
			// remove losing bet from table (hide image)
			document.getElementById(betString).children[0].style.visibility = "hidden";
			// WARNING: removing bet from betsArray shortens length and breaks loop
			// https://stackoverflow.com/questions/57753537/remove-array-item-using-for-of-loop
			betsArray.splice(betsArray.indexOf(betString), 1);
			// add lost bet for this roll to total losings
			document.getElementById("losings").innerHTML = "-"+losings;
			// remove from totalBetAmount
			totalBetAmount -= betAmount;
  		document.getElementById("totalBetAmount").innerHTML = totalBetAmount;
		}
	}

	// add total winnings next to bank rolling


	// Roll Dice
	// -> Winning number = 52
	//
	// Get all bets (get from stored array)
	// -> loop through all the bets
	// --> Is winning number in serie of bet?
	// ---> If yes: "winnings" = (risk of bet 5:1) * bet amount
	//      Bet remains on table?
	// ---> If no: Bank roll - bet amount
	//      Remove bet from table?
}
