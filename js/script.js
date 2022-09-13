//Declarando variáveis.
const question = document.querySelector('#question');
const answersBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas.
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ];

// Substituição do quizz para a primeira pergunta.
function init() {
    //criar a primeira pegunta
    createQuestion(0);
};

// Cria uma pergunta.
function createQuestion(i) {
    //limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll('button');

    oldButtons.forEach(function(btn) {
        btn.remove();
    })

    //alterar o texto  e número da pergunta
    const questionText = question.querySelector('#question-text');
    const questionNumber = question.querySelector('#question-number');

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //inserindo as alternativas
    questions[i].answers.forEach(function(answer, i) {
        //cria o template do botão do quizz
        const answerTemplate = document.querySelector('.answer-template').cloneNode(true); //botão

        const letterBtn = answerTemplate.querySelector('.btn-letter'); //letra do botão
        const answerText = answerTemplate.querySelector('.question-answer'); //texto da resposta

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        //remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        //mostrar a alternativa na tela
        answersBox.appendChild(answerTemplate);

        //inserindo um evento de click no botão
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });
    });

    //incrementar o número da questão
    actualQuestion++; // <-- Pois a próxima questão é a número 2.

};

// Verificando se a resposta do usuário é verdadeira ou falsa.
function checkAnswer(btn) {
    //seleciona todos os botões
    const buttons = answersBox.querySelectorAll("button");
    
    //verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button) {
        if(button.getAttribute("correct-answer") === "true") {
            button.classList.add("correct-answer");

            //checa se o usuário acertou a pergunta
            if(btn === button) {
                //incremento dos pontos
                points++;
            }
        } else {
            button.classList.add("wrong-answer");
        };
    })

    //exibir a próxima pergunta
    nextQuestion()

};

// Exibe a próxima pergunta no quizz
function nextQuestion() {
    //timer para o usuário ver as respostas
    setTimeout(function() {
        //verifica se ainda há perguntas
        if(actualQuestion >= questions.length) {
            //apresenta a mensagem de sucesso
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion);
    }, 2000)
};

// Exibe a tela final
function showSuccessMessage() {
    hideOrShowQuizz();

    //trocar dados da tela de sucesso

    //calcular o score
    const score = ((points / questions.length) * 100).toFixed(2);
    const displayScore = document.querySelector('#display-score span');

    displayScore.textContent = score.toString();

    //altera o numero de perguntas que acertou
    const correctAnswers = document.querySelector('#correct-answers');
    correctAnswers.textContent = points;

    //alterar o total de perguntas
    const totalQuestions = document.querySelector('#questions-qty');
    totalQuestions.textContent = questions.length;
}

// Mostrando a mensagem de sucesso e escondendo o quizz.
function hideOrShowQuizz() {
    //escondendo o quizz
    quizzContainer.classList.toggle('hide');
    //mostrando a mensagem de sucesso
    scoreContainer.classList.toggle('hide');
}

// Reiniciar Quizz.
const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener("click", function() {
    //zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init()
})

// Inicialização do quizz.
init();