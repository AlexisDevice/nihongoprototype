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

function cleaner() {
    let empty = "";
    show_issue(empty);
    show_message(empty);
    show_answer(empty);
    inbox.value = empty;
}

function isCorrect() {
    let answer = (((inbox.value).toLowerCase()).trim()); // Quitando los espacios sobrantes y volviendo minusculas

    if (answer == newCard.romaji) {
        show_message("Correcto");
        Utils.corrects++; //incrementa el score
    }
    else {
        show_message("Incorrecto");
        show_answer(newCard.romaji);
        Utils.incorrects++; // incrementa el score
    }
    freshScore();
}

function send() {
    Utils.isAnswer = true;
    isCorrect();
}

function next_issue() {
    Utils.isAnswer = false;
    cleaner();
    Create();
    show_issue();
}


inbox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        if (Utils.isAnswer) {
            next_issue();
        }
        else {
            send();
        }
    }
});

next_issue();