import expect from 'expect';
import numberToWord from '../../src/libs/numberToWord.js';

describe('numberToWord()', () => {
	it('Should properly translate numbers to words.', () => {
		expect(numberToWord(1)).toEqual('one');
		expect(numberToWord(2)).toEqual('two');
		expect(numberToWord(3)).toEqual('three');
		expect(numberToWord(4)).toEqual('four');
		expect(numberToWord(5)).toEqual('five');
		expect(numberToWord(6)).toEqual('six');
		expect(numberToWord(7)).toEqual('seven');
		expect(numberToWord(8)).toEqual('eight');
		expect(numberToWord(9)).toEqual('nine');
		expect(numberToWord(10)).toEqual('ten');
	});
});
