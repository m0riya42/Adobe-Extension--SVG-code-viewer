//module.exports = sum;

const toFixedNumber = require('./selectionToSVG.jsx');

test('fix number', () => {
    expect(toFixedNumber(2.546, 2)).toBe(2.55);
});
// test('fix number', () => {
//     expect(toFixedNumber(2.546, 2)).toBe(2.55);
// });
