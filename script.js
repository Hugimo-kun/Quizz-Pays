document.addEventListener("DOMContentLoaded", function () {
  const COUNTRY_PICS = [
    {
      url: "asset/img/Random-place1.jpg",
      answer: "France",
      clue: "Le pays de la baguette",
      difficulty: 1,
    },
    {
      url: "asset/img/Random-place2.jpg",
      answer: "Japon",
      clue: "Le pays du soleil levant",
      difficulty: 1,
    },
    {
      url: "asset/img/Random-place3.jpg",
      answer: "Danemark",
      clue: "C'est un pays scandinave",
      difficulty: 3,
    },
    {
      url: "asset/img/Random-place4.jpg",
      answer: "Roumanie",
      clue: "Le chateau de Dracula s'y trouve",
      difficulty: 5,
    },
    {
      url: "asset/img/Random-place5.jpg",
      answer: "Chine",
      clue: "2ème population mondiale",
      difficulty: 1,
    },
    {
      url: "asset/img/Random-place6.jpg",
      answer: "Mexique",
      clue: "Old el Paso",
      difficulty: 2,
    },
    {
      url: "asset/img/Random-place7.jpg",
      answer: "République Tchèque",
      clue: "Chateau de Prague",
      difficulty: 4,
    },
    {
      url: "asset/img/Random-place8.jpg",
      answer: "Indonésie",
      clue: "Il contient plusieurs archipels",
      difficulty: 3,
    },
    {
      url: "asset/img/Random-place9.jpg",
      answer: "Autriche",
      clue: "Un terrible dictateur y est né",
      difficulty: 5,
    },
    {
      url: "asset/img/Random-place10.jpg",
      answer: "Monténégro",
      clue: "C'est un des pays Balkans",
      difficulty: 5,
    },
    {
      url: "asset/img/Random-place11.jpg",
      answer: "Etats-Unis",
      clue: "Hamburger",
      difficulty: 1,
    },
    {
      url: "asset/img/Random-place12.jpg",
      answer: "Italie",
      clue: "La Pizza",
      difficulty: 3,
    },
    {
      url: "asset/img/Random-place13.jpg",
      answer: "Algérie",
      clue: "Massif du Hoggar",
      difficulty: 5,
    },
    {
      url: "asset/img/Random-place14.jpg",
      answer: "Argentine",
      clue: "Messi",
      difficulty: 2,
    },
  ];
  let previousNumbers = [];
  let image = document.getElementById("randomPic");
  const INPUT_ANSWER = document.getElementById("answer");
  let isAnswerValid = false;
  const SUBMIT_BUTTON = document.getElementById("boutonSubmit");
  const SCORE_PARAGRAPH = document.getElementById("score");
  let score = 0;
  const DIFFICULTY_PARAGRAPH = document.getElementById("difficulty");
  const CLUE_PARAGRAPH = document.getElementById("clue");
  const CLUE_BUTTON = document.getElementById("clueButton");
  let randomNumber;
  let answer;
  let theClue;
  let difficulty;
  let tryNumber = 3;
  const TRY_PARAGRAPH = document.getElementById("try");
  let isClueDisplay = false;
  const RULE_POINTS = document.getElementById("rulePoints");
  const FULL_POINTS = 10;
  const HINT_POINTS = 5;
  let level = 0;

  function randomPic() {
    CLUE_PARAGRAPH.innerText = null;
    tryNumber = 3;
    isClueDisplay = false;
    isAnswerValid = false;
    enableSubmitButton();
    displayTry();
    if (previousNumbers.length !== COUNTRY_PICS.length) {
      do {
        randomNumber = entierAleatoire(0, COUNTRY_PICS.length - 1);
      } while (previousNumbers.includes(randomNumber));
      previousNumbers.push(randomNumber);
      image.src = COUNTRY_PICS[randomNumber].url;
      answer = COUNTRY_PICS[randomNumber].answer;
      theClue = COUNTRY_PICS[randomNumber].clue;
      difficulty = COUNTRY_PICS[randomNumber].difficulty;
      displayDifficulty();
      displayScore();
      level++;
      displayLevel();
    } else {
      localStorage.setItem("score", score);
      document.location.href = "end-quizz.html";
    }
  }

  function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function inputAnswer() {
    if (INPUT_ANSWER.value.trim().length !== 0) {
      isAnswerValid = true;
    } else {
      isAnswerValid = false;
    }
  }

  function enableSubmitButton() {
    if (isAnswerValid === true) {
      SUBMIT_BUTTON.disabled = false;
    } else {
      SUBMIT_BUTTON.disabled = true;
    }
  }

  function displayScore() {
    SCORE_PARAGRAPH.innerText = score;
  }

  function answerResult() {
    if (INPUT_ANSWER.value.toUpperCase() == answer.toUpperCase()) {
      if (isClueDisplay === true) {
        score += HINT_POINTS;
      } else {
        score += FULL_POINTS;
      }
      tryNumber = 3;
      randomPic();
      displayTry();
      INPUT_ANSWER.value = null;
    } else {
      tryNumber--;
      if (tryNumber > 0) {
        displayTry();
      } else {
        randomPic();
        INPUT_ANSWER.value = null;
      }
    }
  }

  function displayDifficulty() {
    DIFFICULTY_PARAGRAPH.innerText = difficulty;
  }

  function displayClue() {
    CLUE_PARAGRAPH.innerText = theClue;
    isClueDisplay = true;
  }

  function displayTry() {
    if (tryNumber > 1) {
      TRY_PARAGRAPH.innerText = `Vous avez ${tryNumber} vies`;
    } else if (tryNumber > 0) {
      TRY_PARAGRAPH.innerText = `Il vous restes ${tryNumber} vie`;
    }
  }

  function displayRulePoints() {
    RULE_POINTS.innerText = `Une réponse juste sans indice = +${FULL_POINTS} points, une réponse juste avec indice = +${HINT_POINTS} points, une réponse fausse = +0 points,`;
  }

  function displayLevel() {
    document.getElementById(
      "level"
    ).innerText = `Niveau ${level}/${COUNTRY_PICS.length}`;
  }

  randomPic();
  displayRulePoints();

  INPUT_ANSWER.addEventListener("input", function () {
    inputAnswer();
    enableSubmitButton();
  });

  SUBMIT_BUTTON.addEventListener("click", function () {
    answerResult();
  });

  CLUE_BUTTON.addEventListener("click", function () {
    displayClue();
  });
});
