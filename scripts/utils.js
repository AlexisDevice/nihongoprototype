class Utils {
    static getNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static show(issue) {
        document.getElementById('issue').textContent = issue;
    }
}