const converter = require('number-to-words');

export default function numberToWord(number) {
  return converter.toWords(number);
}
