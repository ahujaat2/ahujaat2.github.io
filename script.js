questions = [
	{
		question: `What instrument does Mr Heckles claim he is playing when he complains about noise in "The One With the Flashback"?`,
		answers : [
			{ text: "Piano", correct: false },
			{ text: "Oboe", correct: true },
			{ text: "Flute", correct: false },
			{ text: "Guitar", correct: false },
		],
		explanation: `Phoebe: "You don't play the oboe."
					Mr. H: "I could play the oboe!"`
	},
	{
		question: `What is Ross' first wife's name?`,
		answers : [
			{ text: "Charlie", correct: false },
			{ text: "Emily", correct: false },
			{ text: "Carol", correct: true },
			{ text: "Rachel", correct: false },
		],
		explanation: `It's Carol. 
					Joe: "You really didn't know she was a lesbian?"
					Ross: "She didn't know, how should I know?!"`
	},
	{
		question: `Can you name the character who was Rachel's boss and briefly dated Chandler?`,
		answers : [
			{ text: "Joanna", correct: true },
			{ text: "Janine", correct: false },
			{ text: "Julie", correct: false },
			{ text: "Jasmine", correct: false },
		],
		explanation: `Joanna isn't just the boss in the office, if you know what I mean.. `
	},
		{
		question: `Joey and Chandler's TV Guide is addressed to .. ?`,
		answers : [
			{ text: "Josephine Tribeca", correct: false },
			{ text: "Joseph Tribbiani", correct: false },
			{ text: "Chandler Bing", correct: false },
			{ text: "Chanandler Bong", correct: true },
		],
		explanation: `Actually it's MISS Chanandler Bong!`
	},
		{
		question: `In "The One Where Ross Dates a Student", what causes the fire in Phoebe's apartment?`,
		answers : [
			{ text: "Rachel's straightener", correct: true },
			{ text: "Phoebe's incense stick", correct: false },
			{ text: "Phoebe's candles", correct: false },
			{ text: "Rachel's cigarette", correct: false },
		],
		explanation: `Earlier it's said that Phoebe's candles caused the fire, but later the firemen say it's the straightener.`
	},
		{
		question: `What is the color of the couch in Central Perk that the Friends sit on?`,
		answers : [
			{ text: "Green", correct: false },
			{ text: "Orange", correct: false },
			{ text: "Red", correct: false },
			{ text: "Brown", correct: true },
		],
		explanation: `You've gotta know this! It's Brown!`
	},
		{
		question: `What is the name of Joey's imaginary friend?`,
		answers : [
			{ text: "Maurice", correct: true },
			{ text: "Melvin", correct: false },
			{ text: "Marcel", correct: false },
			{ text: "Kip", correct: false },
		],
		explanation: `His name is Maurice. He's a space cowboy!`
	},
		{
		question: `Which soap opera does Gunther tell Joey he used to act in before working at Central Perk?`,
		answers : [
			{ text: "Another World", correct: false },
			{ text: "As the World Turns", correct: false },
			{ text: "All my children", correct: true },
			{ text: "Days of Our Lives", correct: false },
		],
		explanation: `Gunther: "I was Bryce on All My Children. They killed me in an avalanche!"`
	},
		{
		question: `Which cast member almost didn't return for the final season?`,
		answers : [
			{ text: "Phoebe", correct: false },
			{ text: "Monica", correct: false },
			{ text: "Chandler", correct: false },
			{ text: "Rachel", correct: true },
		],
		explanation: `It’s Rach! Jennifer Aniston admitted that she almost canceled on the final season. Imagine!`
	}

];

const ques_cont = document.getElementsByClassName("question-container")[0];
const answer_elements = document.getElementsByClassName("answer-button");
const start = document.getElementById("start-btn");
const next = document.getElementsByClassName("control-btn")[0];
const finish = document.getElementsByClassName("control-btn")[1];
const p = document.getElementsByClassName("explanation")[0];
let current_ques = -1;
const qlist_count = questions.length;
let qCount = 0;
let correct_count = 0;
let i;
let explanation_value = true;

start.addEventListener("click", startQuiz);

function startQuiz(){
	start.parentNode.parentNode.removeChild(start.parentNode)
	quiz_cont = document.getElementsByClassName("container hide")[0];
	quiz_cont.classList.remove("hide");
	quiz_cont.style.animationName = "fade-in";
	quiz_cont.style.animationDuration = "1s";
	updateQuestion();
}

function updateQuestion(){
	if (i == undefined) {
		i = -1;
	}
	if (questions.length === 1) {
		i = 0;
	}
	while (i === current_ques && questions.length !== 1){
		i = Math.floor((Math.random() * questions.length));
	}
	ques_cont.textContent = questions[i].question;
	current_ques = i;
	for (let j=0; j < answer_elements.length; j++) {
		answer_elements[j].textContent = questions[i].answers[j].text;
	}
	qCount++;
}

for (element of answer_elements) {
	element.addEventListener("click", chooseAnswer);
};

function chooseAnswer(event) {
	ans_val = event.target.textContent;
	correct_ans = questions[current_ques].answers.find(ans => ans.correct == true);
	let exp = questions[current_ques].explanation;
	if (ans_val == correct_ans.text) {
		event.target.style.backgroundColor = "rgb(55, 179, 70)";
		correct_count++;
		exp = "Yayy! You got it right!  " + exp;
	}
	else{
		correct_button = getCorrectAnswerButton();
		correct_button.style.backgroundColor = "rgb(55, 179, 70)";
		event.target.style.backgroundColor = "rgb(230, 41, 41)";
		exp = "Oops!  " + exp;
	};

	if(explanation_value) {
		p.textContent = exp;
		p.style.animationName = "fade-in";
		p.style.animationDuration = "1s";
		p.classList.remove("hide");
	};

	for (element of answer_elements) {
			element.style.pointerEvents = "none";
	};

	if(qCount < qlist_count) {
		next.classList.remove("hide");
	};
	if(qCount == qlist_count) {
		finish.classList.remove("hide");
		finish.style.pointerEvents = "auto";
	}
	questions = questions.filter(question => question !== questions[current_ques]);
	next.style.pointerEvents = "auto";
};

function getCorrectAnswerButton(){
	correct_ans = questions[current_ques].answers.find(ans => ans.correct == true).text;
	correct_button = Array.from(answer_elements).find(element => element.textContent == correct_ans);
	return correct_button;
}
next.addEventListener("click", nextQuestion);

function nextQuestion(){
	if (qCount == qlist_count-1) {
		next.classList.add("hide");
	}
	p.classList.add("hide");
	updateQuestion();
	for (element of answer_elements) {
		element.style.backgroundColor = "rgb(255, 253, 209)";
		element.style.pointerEvents = "auto";
	};
	next.style.pointerEvents = "none";
}

finish.addEventListener("click", finishQuiz);

function finishQuiz(){
	let value = "";
	const correct_pct = (correct_count/qlist_count*100).toFixed(); 
	if (correct_pct >= 85){
		value = `You've answered ${correct_pct}% questions correctly. You're a true F.R.I.E.N.D.S fan!`
	}
	else if (correct_pct >= 50 && correct_pct <85){
		value = `You've answered ${correct_pct}% questions correctly. It's time for a rerun!`
	}
	else if(correct_pct < 50){
		value = `Uh-oh! You've answered ${correct_pct}% questions correctly. Could you BE more wrong?!`
	}
	parent = ques_cont.parentNode;
	solution_parent = next.parentNode.parentNode;
	solution_parent.removeChild(document.getElementsByClassName("explanation")[0]);
	parent.removeChild(ques_cont);
	parent.removeChild(document.getElementsByClassName("btn-grid")[0]);
	solution_parent.removeChild(document.getElementsByClassName("controls")[0]);
	let p = document.createElement("p");
	let content = document.createTextNode(value);
	p.appendChild(content);
	parent.appendChild(p);
	p.style.fontSize = "2em";
	p.style.marginTop="210px";
	p.style.fontFamily = "'Sniglet', cursive";
	p.style.textAlign = "center";
	p.style.color = "rgb(187, 255, 120)";
	p.style.animationName = "fade-in";
	p.style.animationDuration = "1s";
}