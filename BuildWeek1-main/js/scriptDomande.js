const questions = [
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
            "Central Process Unit",
            "Computer Personal Unit",
            "Central Processor Unit",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
            "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
            "Counter Strike: Source",
            "Corrective Style Sheet",
            "Computer Style Sheet",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: [
            "Ice Cream Sandwich",
            "Jelly Bean",
            "Marshmallow",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
    },
];

let NumeroDomandaCorrente = 0;
let punteggio = 0;

// TIMER
let secondiRimanenti = 30;
let intervalloTimer;
const lunghezzaCerchio = 283;

// FUNZIONE PRINCIPALE
function prendiDomanda() {

    if (NumeroDomandaCorrente >= questions.length) {
        clearInterval(intervalloTimer);
        mostraRisultatoFinale();
        return;
    }


    let domandaCorrente = questions[NumeroDomandaCorrente];

    let creaDomanda = document.querySelector("h1");
    creaDomanda.innerHTML = domandaCorrente.question;

    let risposte = [];

    risposte.push(domandaCorrente.correct_answer);

    for (let i = 0; i < domandaCorrente.incorrect_answers.length; i++) {
        risposte.push(domandaCorrente.incorrect_answers[i]);
    }

    // Mischiamo le risposte
    risposte.sort(() => Math.random() - 0.5);

    let divRisposte = document.getElementById("risposte");
    divRisposte.innerHTML = "";

    risposte.forEach(risposta => {
        let bottoneRisposta = document.createElement("button");
        bottoneRisposta.textContent = risposta;

        bottoneRisposta.addEventListener("click", () => {
            clearInterval(intervalloTimer);

            if (risposta === domandaCorrente.correct_answer) {
                punteggio++;
            }

            vaiAllaProssimaDomanda();
        });

        divRisposte.appendChild(bottoneRisposta);
    });

    let numeroDomanda = document.getElementById("question");
    numeroDomanda.textContent = "QUESTION " + (NumeroDomandaCorrente + 1);

    // AVVIA TIMER AD OGNI DOMANDA
    avviaIlTimer();
}

// FUNZIONE PER PASSARE ALLA PROSSIMA
function vaiAllaProssimaDomanda() {
    NumeroDomandaCorrente++;
    prendiDomanda();
}

// TIMER
function avviaIlTimer() {

    const elementoTestoSecondi = document.getElementById("seconds");
    const elementoCerchio = document.getElementById("timer-progress");

    secondiRimanenti = 30;
    elementoTestoSecondi.innerText = secondiRimanenti;

    elementoCerchio.style.strokeDashoffset = 0;
    elementoCerchio.classList.remove("timer-urgent");

    clearInterval(intervalloTimer);

    intervalloTimer = setInterval(function () {

        secondiRimanenti--;

        elementoTestoSecondi.innerText = secondiRimanenti;

        let secondiPassati = 30 - secondiRimanenti;
        let quantoTogliere = (secondiPassati / 30) * lunghezzaCerchio;
        elementoCerchio.style.strokeDashoffset = quantoTogliere;

        if (secondiRimanenti <= 5) {
            elementoCerchio.classList.add("timer-urgent");
        }

        if (secondiRimanenti <= 0) {
            clearInterval(intervalloTimer);
            vaiAllaProssimaDomanda();
        }

    }, 1000);
}

// AVVIO QUIZ
prendiDomanda();

function mostraRisultatoFinale() {
    document.getElementById("domanda").style.display = "none";
    document.getElementById("risposte").style.display = "none";
    document.getElementById("contatore").style.display = "none";
    document.querySelector(".timer-wrapper").style.display = "none";

    const risultato = document.getElementById("risultato");
    let risultatoH1 = document.getElementById("risultatoh1")
    let risultatoP = document.getElementById("risultatoP")
    risultato.style.display = "block";
    risultatoH1.innerHTML = "Hai finito il quiz! 🎉"
    risultatoP.innerHTML = `Punteggio: ${punteggio}/${questions.length}`  
}

