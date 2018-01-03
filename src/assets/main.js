let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (attempt.value === '' || answer.value === '') {
    	setHiddenFields();
    }

    if (input.value) {
    	if (!validateInput(input.value)) {
    		return false;
    	} else {
    		attempt.value++;
    	}
    }

    if (getResults(input.value)) {
    	setMessage('You Win! :)');
    	showAnswer(true);
    } else if (attempt.value < 10) {
    	setMessage('Incorrect, try again');
    	showAnswer(false);
    } else {
    	setMessage('You Lose! :(');
    	showReplay();
    }
}

//implement new functions here
function setHiddenFields() {
	answer.value = Math.floor(Math.random() * 10000).toString();

	while (answer.value.length < 4) {
		answer.value = 0 + answer.value;
	}
	attempt.value = 0;
}

function setMessage(mess) {
	message.innerHTML = mess;
}

function validateInput(input) {
	if (input.length === 4) {
		return true;
	} else {
		setMessage('Guesses must be exactly 4 characters long.');; 
		return false;
	}
}

function getResults(input) {
	let correctlyPlacedChars = 0;

	results.innerHTML = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';

	for (let i=0; i<input.length; i++) {
		if (input.charAt(i) === answer.value.toString().charAt(i)) {
			results.innerHTML += '<span class="glyphicon glyphicon-ok"></span>';
			correctlyPlacedChars++;
		} else if (answer.value.indexOf(input.charAt(i)) > 0) {
			results.innerHTML += '<span class="glyphicon glyphicon-transfer"></span>';
		} else {
			results.innerHTML += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}

	results.innerHTML += '</div>';

	if (correctlyPlacedChars === 4) {
		return true;
	} else {
		return false;
	}
}

function showAnswer(answer) {
	code.innerHTML = answer.value;
	if (answer) {
		code.className += ' success';
	} else code.className += ' failure';
}

function showReplay() {
	guessingDiv = document.getElementById('guessing-div');
	replayDiv = document.getElementById('replay-div');
	guessingDiv.style.display = 'none';
	replayDiv.style.display = 'block';
}