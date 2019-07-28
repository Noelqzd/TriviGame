$(document).ready(function () {


	$("#remaining-time").hide();
	$("#start").on('click', trivia.startGame);
	$(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {

	correct: 0,
	incorrect: 0,
	unanswered: 0,
	currentSet: 0,
	timer: 20,
	timerOn: false,
	timerId: '',

	questions: {
		q1: 'Last Bay Area sports team to win a championship?',
		q2: 'First Bay Area sports team to win a championship?',
		q3: 'Which Bay Area sports team has zero championships?',
		q4: 'Which Bay Area sport franchise has the most championships?',
		q5: 'First person to win back to back MVPs?',
		q6: 'What year was the San Jose Earthquakes established?',
		q7: 'First Bay Area sports team to be established?',
		q8: 'The only Bay Area sports team to three-peat?',
	},
	options: {
		q1: ['GSW', 'SF Giants', 'Oakland As', 'SF 49ers'],
		q2: ['SF 49ers', 'SJ Sharks', 'Oakland Raiders', 'GSW'],
		q3: ['SJ Earthquakes', 'Oakland As', 'SJ Sharks', 'SF Giants'],
		q4: ['Oakland As', 'SF Giants', 'SF 49ers', 'GSW'],
		q5: ['Joe Montana', 'Stephen Curry', 'Jerry Rice', 'Barry Bonds'],
		q6: ['1990', '1991', '1996', '2001'],
		q7: ['GSW', 'SF 49ers', 'Oakland Raiders', 'SJ Sharks'],
		q8: ['SF Giants', 'GSW', 'SF 49ers', 'Oakland As']
	},
	answers: {
		q1: 'GSW',
		q2: 'Oakland Raiders',
		q3: 'SJ Sharks',
		q4: 'Oakland As',
		q5: 'Joe Montana',
		q6: '1996',
		q7: 'SF 49ers',
		q8: 'Oakland As',
	},

	startGame: function () {

		trivia.currentSet = 0;
		trivia.correct = 0;
		trivia.incorrect = 0;
		trivia.unanswered = 0;
		clearInterval(trivia.timerId);


		$('#game').show();


		$('#results').html('');


		$('#timer').text(trivia.timer);


		$('#start').hide();

		$('#remaining-time').show();


		trivia.nextQuestion();

	},

	nextQuestion: function () {


		trivia.timer = 10;
		$('#timer').removeClass('last-seconds');
		$('#timer').text(trivia.timer);


		if (!trivia.timerOn) {
			trivia.timerId = setInterval(trivia.timerRunning, 1000);
		}

		var questionContent = Object.values(trivia.questions)[trivia.currentSet];
		$('#question').text(questionContent);


		var questionOptions = Object.values(trivia.options)[trivia.currentSet];

		$.each(questionOptions, function (index, key) {
			$('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
		})

	},

	timerRunning: function () {

		if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
			$('#timer').text(trivia.timer);
			trivia.timer--;
			if (trivia.timer === 4) {
				$('#timer').addClass('last-seconds');
			}
		}

		else if (trivia.timer === -1) {
			trivia.unanswered++;
			trivia.result = false;
			clearInterval(trivia.timerId);
			resultId = setTimeout(trivia.guessResult, 1000);
			$('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
		}
		else if (trivia.currentSet === Object.keys(trivia.questions).length) {


			$('#results')
				.html('<h3>Thank you for playing!</h3>' +
					'<p>Correct: ' + trivia.correct + '</p>' +
					'<p>Incorrect: ' + trivia.incorrect + '</p>' +
					'<p>Unaswered: ' + trivia.unanswered + '</p>' +
					'<p>Play again!</p>');

			$('#game').hide();

			$('#start').show();
		}

	},

	guessChecker: function () {

		var resultId;

		var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];


		if ($(this).text() === currentAnswer) {
			$(this).addClass('btn-success').removeClass('btn-info');

			trivia.correct++;
			clearInterval(trivia.timerId);
			resultId = setTimeout(trivia.guessResult, 1000);
			$('#results').html('<h3>Correct Answer!</h3>');
		}

		else {
			$(this).addClass('btn-danger').removeClass('btn-info');

			trivia.incorrect++;
			clearInterval(trivia.timerId);
			resultId = setTimeout(trivia.guessResult, 1000);
			$('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
		}

	},
	guessResult: function () {

		trivia.currentSet++;

		$('.option').remove();
		$('#results h3').remove();


		trivia.nextQuestion();

	}

}
