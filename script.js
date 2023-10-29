const startButton = document.getElementById("start-button");
const welcomeMessage = document.getElementById("welcome-message");
const questionContainer = document.getElementById("question-container");
const answerInput = document.getElementById("answer-input");
const submitButton = document.getElementById("submit-answer");
const resultPopup = document.getElementById("result-popup");
const resultMessage = document.getElementById("result-message");
const nextButton = document.getElementById("next-question");
const midiAudio = document.getElementById("midi-audio");
const welcomeImage = document.getElementById("welcome-image"); // Adicione esta linha
const wrongAnswerAudio = document.getElementById("wrong-answer-audio");
const correctAnswerAudio = document.getElementById("correct-answer-audio");
const parabensAudio = document.getElementById("parabens-audio");

const questions = [
    {
        question: "",
        image: "i1.png",
    },
    {
        question: "",
        image: "i2.png",
    },
    {
        question: "",
        image: "i3.png",
    },
    {
        question: "",
        image: "i4.png",
    },
    {
        question: "",
        image: "i5.png",
    },
    {
        question: "",
        image: "i6.png",
    },
    {
        question: "",
        image: "i7.png",
    },
];

const correctAnswers = ["", "", "", "", "", "", ""];
//const correctAnswers = ["Lagoa Azul", "Piso Dois", "2243", "20", "", "31out", "lugar trinta e um"];


let currentQuestion = 0;

startButton.addEventListener("click", () => {
    welcomeMessage.style.display = "none";
    welcomeImage.style.display = "none"; // Oculta a imagem
        // Iniciar a reprodução do arquivo MIDI
        midiAudio.play();
    startButton.style.display = "none"; // Oculta o botão "Iniciar"
    questionContainer.style.display = "block";
    showQuestion(currentQuestion);
});


submitButton.addEventListener("click", () => {
    const userAnswer = answerInput.value;

    if (userAnswer.toLowerCase() === correctAnswers[currentQuestion].toLowerCase()) {
        correctAnswerAudio.play();
        resultMessage.textContent = "💀💀💀💀💀💀💀💀💀💀 PARABÉNS!! RESPOSTA CORRECTA !! 💀💀💀💀💀💀💀💀💀";
        if (currentQuestion < questions.length - 1) {
            nextButton.style.display = "block"; // Exibe o botão "Próxima Pergunta"
        } else {
            // Última pergunta - redireciona para a página de parabéns
            //parabensAudio.play();
            window.location.href = "parabens.html";
            parabensAudio.play();
        }
    } else {
        resultMessage.textContent = "🦉 Hum....volta a tentar a tua sorte! 🦉";
        wrongAnswerAudio.play();
        nextButton.style.display = "none"; // Oculta o botão "Próxima Pergunta"
    }
    resultPopup.style.display = "block";

   // Rolar para o elemento com o ID "scroll-target"
   const scrollTarget = document.getElementById("scroll-target");
   scrollTarget.scrollIntoView({ behavior: "smooth" });

});



answerInput.addEventListener("input", () => {
    resultPopup.style.display = "none"; // Oculta o popup ao digitar na caixa de resposta
});

nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
        resultPopup.style.display = "none";
    } else {
        // Todas as perguntas foram respondidas
        questionContainer.style.display = "none";
        const userAnswer = answerInput.value;
        if (userAnswer.toLowerCase() === correctAnswers[questions.length - 1].toLowerCase()) {
            displayCongratulationsMessage();
        }
    }
});

function showQuestion(questionIndex) {
    const questionData = questions[questionIndex];
    document.querySelector("#question-container h2").textContent = `AVENTURA ASSUSTADORA ${questionIndex + 1} ${questionData.question}`;
    answerInput.value = "";

    // Exibir a imagem associada à pergunta
    const questionImage = document.querySelector("#question-container img");
    questionImage.src = questionData.image;
}

function displayCongratulationsMessage() {
    // Limpe o corpo da página
    document.body.innerHTML = "";

    const congratsMessage = document.createElement("div");
    congratsMessage.textContent = "Parabéns! Você acertou todas as perguntas.";
    congratsMessage.style.fontWeight = "bold";
    congratsMessage.style.fontSize = "24px";
    document.body.appendChild(congratsMessage);
}
