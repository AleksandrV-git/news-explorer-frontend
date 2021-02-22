export class SavedArticlesDescription {
  constructor(savedArticlesNode) {
    this.savedArticlesNode = savedArticlesNode;
    this.title = savedArticlesNode.querySelector('.page-desription__title');
    this.keyWordsCounter = savedArticlesNode.querySelector('#key-words-count');
    this.keyWords = savedArticlesNode.querySelector('#key-words');
    this.subtitle = savedArticlesNode.querySelector('.page-desription__subtitle');
  }

  setTitle(name, quantity) {
    this.title.textContent = `${name}, у вас ${quantity} сохранённых статей`
  }

  setKeyWords(keyWordsArr) {
    const uniqueKeyWords = keyWordsArr.filter((item, pos) => {
      return keyWordsArr.indexOf(item) == pos;
    })
    if (uniqueKeyWords.length > 3) {
      this.keyWords.textContent = `${uniqueKeyWords[0]}, ${uniqueKeyWords[1]}`;
      this.keyWordsCounter.textContent = `${uniqueKeyWords.length - 1} другим`;
    }
    if (uniqueKeyWords.length == 3) {
      this.subtitle.textContent = `По ключевым словам: ${uniqueKeyWords[0]}, ${uniqueKeyWords[1]} и ${uniqueKeyWords[2]}`;
      this.keyWords.textContent = ``;
      this.keyWordsCounter.textContent = ``;
    }
    if (uniqueKeyWords.length == 2) {
      this.subtitle.textContent = `По ключевым словам: ${uniqueKeyWords[0]} и ${uniqueKeyWords[1]}`;
      this.keyWords.textContent = ``;
      this.keyWordsCounter.textContent = ``;
    }
    if (uniqueKeyWords.length == 1) {
      this.subtitle.textContent = `По ключевому слову: ${uniqueKeyWords[0]}`;
      this.keyWords.textContent = ``;
      this.keyWordsCounter.textContent = ``;
    }
  }

  hideKeyWords() {
    this.subtitle.textContent = ``;
    this.keyWords.textContent = ``;
    this.keyWordsCounter.textContent = ``;
  }
}
