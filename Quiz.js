const data = [
  {
    id: 1,
    question: "Which of these fish is actually a fish?",
    answers: [
      { answer: "swordfish", isCorrect: true },
      { answer: "jellyfish", isCorrect: false },
      { answer: "starfish", isCorrect: false },
      { answer: "crayfish", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "A flutter is a group of:",
    answers: [
      { answer: "bees", isCorrect: false },
      { answer: "penguins", isCorrect: false },
      { answer: "butterflies", isCorrect: true },
      { answer: "camels", isCorrect: false },
    ],
  },
  {
    id: 1,
    question: "A group of which animals is referred to as a wake?",
    answers: [
      { answer: "bats", isCorrect: false },
      { answer: "vultures", isCorrect: true },
      { answer: "ants", isCorrect: false },
    ],
  },
];

const mainQuestion = document.querySelector(".question");
const answerContainer = document.querySelector(".answers");
const submit = document.querySelector(".submit");
const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");
const play = document.querySelector(".play");

let qIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0;
let SelectedAns;

const playAgain = () => {
  qIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  total = 0;
  SelectedAns;
  showQuestions(qIndex);
};

play.addEventListener("click", () => {
  playAgain();
  resultScreen.style.display = "none";
  gameScreen.style.display = "block";
});

const showResult = () => {
  resultScreen.style.display = "block";
  gameScreen.style.display = "none";

  resultScreen.querySelector(".correct").innerHTML = `
        Correct Answers:${correctCount}
    `;

  resultScreen.querySelector(".wrong").innerHTML = `
        Wrong Answers:${wrongCount}
    `;

  resultScreen.querySelector(".score").innerHTML = `
        Score:${(correctCount-wrongCount)*10}
    `;
};

const showQuestions = (qNumber) => {
  if (qIndex === data.length) return showResult();
  SelectedAns = null;
  mainQuestion.innerHTML = data[qNumber].question;
  answerContainer.innerHTML = data[qNumber].answers
    .map(
      (item, index) =>
        `
        <div class="answer">
            <input type="radio" id="${index}" name="ans" value="${item.isCorrect}" style="cursor: pointer;">
            <label for="${index}">${item.answer}</label>
        </div>
        `
    )
    .join("");

  selectAnswer();
};

const selectAnswer = () => {
  answerContainer.querySelectorAll("input").forEach((el) => {
    el.addEventListener("click", (e) => {
      SelectedAns = e.target.value;
    });
  });
};

const submitAnswer = () => {
  submit.addEventListener("click", () => {
    if (SelectedAns !== null) {
      SelectedAns === "true" ? correctCount++ : wrongCount++;
      qIndex++;
      showQuestions(qIndex);
    } else alert("Please select an answer!");
  });
};

showQuestions(qIndex);
submitAnswer();
