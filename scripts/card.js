class Card {
    text_romaji = '';
    text_hiragana = '';
    text_katakana = '';
    text_kanji = '';

    set romaji(txt) {
        this.text_romaji = txt;
    }

    get romaji() {
        return this.text_romaji;
    }

    set hiragana(txt) {
        this.text_hiragana = txt;
    }

    get hiragana() {
        return this.text_hiragana;
    }

    set katakana(txt) {
        this.text_katakana = txt;
    }

    get katakana() {
        return this.text_katakana;
    }

    set kanji(txt) {
        this.text_kanji = txt;
    }

    get kanji() {
        return this.text_kanji;
    }
}