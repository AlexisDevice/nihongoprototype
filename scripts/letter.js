const table = document.querySelector('.table');

function createLetter() {
    let letter;
    let romajiLetter;
    let hiraganaLetter;
    let katakanaLetter;

    for(let i = 0; i <= 105; i++) {
        letter = document.createElement("div");
        letter.className = "letter"

        romajiLetter = document.createElement("span");
        romajiLetter.textContent = Syllabary.getSyllabary(i).romaji;

        hiraganaLetter = document.createElement("span");
        hiraganaLetter.textContent = Syllabary.getSyllabary(i).hiragana;

        katakanaLetter = document.createElement("span");
        katakanaLetter.textContent = Syllabary.getSyllabary(i).katakana;

        table.appendChild(letter);
        letter.append(romajiLetter);
        letter.appendChild(hiraganaLetter);
        letter.appendChild(katakanaLetter);
    }
}

createLetter();