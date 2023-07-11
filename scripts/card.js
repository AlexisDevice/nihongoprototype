class Card{
    _romaji = '';
    _hiragana = '';
    _katakana = '';
    _kanji = '';

    set romaji(txt) {
        this._romaji = txt;
    }

    get romaji() {
        return this._romaji;
    }

    set hiragana(txt) {
        this._hiragana = txt;
    }

    get hiragana() {
        return this._hiragana;
    }

    set katakana(txt) {
        this._katakana = txt;
    }

    get katakana() {
        return this._katakana;
    }

    set kanji(txt) {
        this._kanji = txt;
    }

    get kanji() {
        return this._kanji;
    }
}