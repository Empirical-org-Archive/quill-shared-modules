import expect from 'expect';
import pos from 'pos';
import {
	getPartsOfSpeech,
	getPartsOfSpeechTags,
	getPartsOfSpeechWords,
	getPartsOfSpeechWordsWithTags,
	checkPOSEquivalancy,
	getPOSTagPairs,
	getPOSTransformations,
} from '../../src/libs/partsOfSpeechTagging.js';

describe('Converting a string to a list of parts of speech', () => {
  it('works with the library function', () => {
    const input = 'Catherine';
    const words = new pos.Lexer().lex(input);
    const tagger = new pos.Tagger();
    const taggedWords = tagger.tag(words);
    expect(taggedWords).toEqual([['Catherine', 'NNP']]);
  });

  it('returns the same as the pos speech library when called from getPartsOfSpeech', () => {
    const input = 'Catherine';
    const words = new pos.Lexer().lex(input);
    const tagger = new pos.Tagger();
    const expected = tagger.tag(words);
    const generated = getPartsOfSpeech(input);
    expect(expected).toEqual(generated);
  });

  it('Correctly identifies adverbs', () => {
    const input = 'She ran quickly after the dog.';
    const generated = getPartsOfSpeech(input);
    const expected = ['quickly', 'RB'];
    expect(generated[2]).toEqual(expected);
  });

  it('can return an array of POS tags', () => {
    const input = 'She ran quickly after the dog.';
    const generated = getPartsOfSpeechTags(input);
    const expected = ['PRP', 'VBD', 'RB', 'IN', 'DT', 'NN', '.'];
    expect(generated).toEqual(expected);
  });

  it('can compare two inputs and say id POS is the same', () => {
    const input = 'She ran quickly after the dog.';
    const target = 'She ran quickly after the cat.';
    const generated = checkPOSEquivalancy(input, target);
    const expected = true;
    expect(generated).toEqual(expected);
  });

  it('can compare two inputs and say id POS is the different', () => {
    const input = 'She ran quickly after the dog.';
    const target = 'She ran quickly after the cats.';
    const generated = checkPOSEquivalancy(input, target);
    const expected = false;
    expect(generated).toEqual(expected);
  });

  it('get a list of type list list with POS for two inputs', () => {
    const input = 'She ran after the dog.';
    const target = 'She ran after the dogs.';
    const generated = getPOSTagPairs(input, target);
    const expected = [['PRP', 'PRP'], ['VBD', 'VBD'], ['IN', 'IN'], ['DT', 'DT'], ['NN', 'NNS'], ['.', '.']];
    expect(generated).toEqual(expected);
  });

  it('returns a list of POS transformations', () => {
    const input = 'She ran after the dog.';
    const target = 'She ran after the dogs.';
    const generated = getPOSTransformations(input, target);
    const expected = ['NN|NNS'];
    expect(generated).toEqual(expected);
  });

  it('returns a list of words from parts of speech tagging', () => {
	  const input = 'She ran quickly after the dog.';
	  const expected = [
	    'She',
      'ran',
      'quickly',
      'after',
      'the',
      'dog',
      '.',
    ];
	  expect(getPartsOfSpeechWords(input)).toEqual(expected);
  });

  it('returns a list of parts of speech and tags', () => {
	  const input = 'She ran quickly after the dog.';
	  const expected = [
	    ['She', 'PRP'],
      ['ran', 'VBD'],
      ['quickly', 'RB'],
      ['after', 'IN'],
      ['the', 'DT'],
      ['dog', 'NN'],
      ['.', '.'],
    ];
	  expect(getPartsOfSpeechWordsWithTags(input)).toEqual(expected);
  });
});
