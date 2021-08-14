function upperCaseFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1, word.length);
}

export default upperCaseFirstLetter;
