var inbox = document.querySelector("input");
var newCard = new Card();

function Create() {
    newCard = new Card();
    let y = 0; // Coordenadas del eje Y en la tabla Syllabary
    for (let i = 1; i <= Utils.getNum(1, 9); i++) {
        y = Utils.getNum(0, 45); //Todos los carracteres
        newCard.romaji += Syllabary.getSyllabary(y).romaji;
        newCard.hiragana += Syllabary.getSyllabary(y).hiragana;
        newCard.katakana += Syllabary.getSyllabary(y).katakana;
    }
}

function show_issue() {
    Utils.show(newCard.hiragana);
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
    card_response.className = (response) ? "response_correct" : "response_incorrect";

    card_issue.textContent = newCard.hiragana;
    card_answer.textContent = (response) ? newCard.romaji : inbox.value + " | " + newCard.romaji;

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
    show_issue(empty);
    show_message(empty);
    show_answer(empty);
    inbox.value = empty;
}

function isCorrect() {
    // Quitando los espacios sobrantes y volviendo minusculas
    let user_answer = (((inbox.value).toLowerCase()).trim()); 

    if (user_answer == newCard.romaji) {
        show_message("Correcto");
        Utils.corrects++; //incrementa el score
        addToHistoryNihongoLab(true);
    }
    else {
        show_message("Incorrecto");
        show_answer(newCard.romaji);
        Utils.incorrects++; // incrementa el score
        addToHistoryNihongoLab(false);
    }
    freshScore();
}

function send() {
    Utils.isAnswered = true;
    isCorrect();
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
    }
    else {
        send();
    }
}

inbox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        send_button();
    }
});

next_issue();