var inbox = document.querySelector("input");
var newCard = new Card();
var userLevel = 1;
var letterCounter = 1;
var neededHelp = false;

function getLevel(level) {
    switch(level) {
        case 1:
            return 4;
        case 2:
            return 9;
        case 3:
            return 14;
        case 4:
            return 19;
        case 5:
            return 24;
        case 6:
            return 29;
        case 7:
            return 34;
        case 8:
            return 37;
        case 9:
            return 42;
        case 10:
            return 45;
        default:
            return 4;
    }
}

function freshLevel(resp) {
    if(resp) {
        letterCounter++;
        if (letterCounter >= 6) {
            letterCounter = 1;
            if(userLevel <= 9) {
                userLevel++;
            }
        }
    } else {
        letterCounter--;
        if (letterCounter <= 0) {
            letterCounter = 4;
            if(userLevel >= 2) {
                userLevel--;
            }
        }
    }
}

function Create() {
    newCard = new Card();
    let y = 0; // Coordenadas del eje Y en la tabla Syllabary
    for (let i = 1; i <= letterCounter; i++) {
        y = Utils.getNum(0, getLevel(userLevel)); //Todos los carracteres
        newCard.romaji += Syllabary.getSyllabary(y).romaji;
        newCard.hiragana += Syllabary.getSyllabary(y).hiragana;
        newCard.katakana += Syllabary.getSyllabary(y).katakana;
    }
}

function show_assistance(assist) {
    document.getElementById("assistance").textContent = assist;
}

function show_issue() {
    const Issue = (Utils.getNum(0, 9) <= 7) ? newCard.hiragana : newCard.katakana;
    Utils.show(Issue);
}

function show_message(message) {
    document.getElementById("message").textContent = message;
}

function show_answer(answer) {
    document.getElementById("answer").textContent = answer;
}

function freshScore() {
    document.getElementById("correct").textContent = Utils.corrects;
    document.getElementById("incorrect").textContent = Utils.incorrects;
    document.getElementById("assist").textContent = Utils.assistance;
}

function addToHistoryNihongoLab(response) {
    /* Seleccionado el contenedor de todas las cards */
    const history = document.querySelector(".scroll");
    /* Creando la card con su info */
    const card = document.createElement("div");
    card.className = "card";
    const card_issue = document.createElement("span");
    const card_answer = document.createElement("span");
    const card_response = document.createElement("div");
    /* Asignando si la respuesta es correcta o no */

    card_issue.textContent = document.getElementById("issue").textContent;

    switch(response) {
        case 0:
            card_answer.textContent = inbox.value + " | " + newCard.romaji;
            card_response.className = "response_incorrect";
            break;
        case 1:
            card_answer.textContent = newCard.romaji;
            card_response.className = "response_correct";
            break;
        case 2:
            card_answer.textContent = inbox.value;
            card_response.className = "gotAssistance";
            break;
        default:
            console.log("Value Exception!")
            break;
    }

    /* Agregando los elementos a la card */
    card.appendChild(card_issue);
    card.appendChild(card_response);
    card.appendChild(card_answer);

    if (history.hasChildNodes()) {
        history.insertBefore(card, history.firstChild);
    } else {
        history.appendChild(card);
    }
}

function cleaner() {
    let empty = "";
    show_assistance(empty);
    show_issue(empty);
    show_message(empty);
    show_answer(empty);
    inbox.value = empty;
    neededHelp = false;
}

function isCorrect() {
    // Quitando los espacios sobrantes y volviendo minusculas
    let user_answer = ((inbox.value).toLowerCase()).trim();

    if(neededHelp == true) {
        Utils.assistance++;
        addToHistoryNihongoLab(2);
    } else if (user_answer == newCard.romaji) {
        show_message("Correcto");
        Utils.corrects++; //incrementa el score
        freshLevel(true);
        addToHistoryNihongoLab(1);
    } else {
        show_message("Incorrecto");
        show_answer(newCard.romaji);
        Utils.incorrects++; // incrementa el score
        freshLevel(false);
        addToHistoryNihongoLab(0);
    }
    freshScore();
}

function send() {
    if(inbox.value == "?") {
        document.getElementById("assistance").textContent = newCard.romaji;
        inbox.value = "";
        neededHelp = true;
    } else {
        Utils.isAnswered = true;
        isCorrect();
    }
}

function next_issue() {
    Utils.isAnswered = false;
    cleaner();
    Create();
    show_issue();
}

function send_button() {
    if (Utils.isAnswered) {
        next_issue();
    } else {
        send();
    }
}

inbox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        send_button();
    }
});

next_issue();