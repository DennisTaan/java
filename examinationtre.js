$.ajax({ // hämtar hem api
	url: "https://opentdb.com/api.php?amount=10",
	method: "GET",
	dataType: "json"
}).done(function (data) {   // hämtar datan när information har hämtas så kör function igång.    

	var lista = ""; // skapar en variabel text stringar

	function shuffle(array) { // shuffle function
		for (var i = array.length - 1; i > 0; i--) { // en forloop 
			var j = Math.floor(Math.random() * (i + 1)); // väljer slumpmässigt index från 0 till 1
			[array[i], array[j]] = [array[j], array[i]]; // byter element
		}
	}

	data.results.forEach(function (result, index) {  //ge function för varje results och index

		var correctAnswer = result.correct_answer;  //hämtar de rätta svaren  
		var wrongAnswers = result.incorrect_answers;//hämtar de incorrecta svaren


		var answers = Array.from(wrongAnswers); //skapar en variabel som är lika med array.from de incorrercta svaren
		answers.push(correctAnswer);// correctanswer pushar till variabeln (answers)
		shuffle(answers)// slumpar svaren så det inte alltid hamnar på sista svar alternativet

		lista = lista + "<h2>" + result.question + "</h2>"; // appendar en h2 runt results.question
		lista = lista + "<ul>"; //appendar ul runt h2

		answers.forEach(function (answer) { //ge function för varje answer
			var isitCorrectAnswer = 0; // skapar en variabel med 0
			if (correctAnswer == answer) { // skapar en if sats om correctAnswer är lika med answer så ska det ge en poäng
				isitCorrectAnswer = 1;
			}
			lista = lista + '<li><input type="radio" name="answer-' + index + '" data-correctanswer="' + isitCorrectAnswer + '"> ' + answer + '</li>'; // listan är lika med en annan listan som innehåller olika alternativ, i den variabeln skapars sedan input knapp
		})

		lista = lista + "</ul>"; // listan är lika med lista och avslut på ul
	});




	lista = lista + "<button>Show result</button>"; //appendar en knapp som visar resultat
	$("body").append(lista); // list appendar i body

	$("button").on("click", function () { // target button och när det man clickar går functionen igång
		var countPoints = $('input:checked[data-correctanswer="1"]').length; //skapar en varibael som kollar ifall inputen stämmer överens med det rätta svaret
		alert(countPoints + ' / ' + "10"); // printar ut den föregånde variabeln + en textstring på antal frågor.
	});

});

