const RowOne = [
  {
    keyText: 'C',
    keyOperation: 'cancel',
  },
  {
    keyText: '+/-',
    keyOperation: 'changeSign',
  },
  {
    keyText: '%',
    keyOperation: 'percentage',
  },
  {
    keyText: 'DEL',
    keyOperation: 'delete',
  },
];
const RowTwo = [
  {
    keyText: '7',
    keyOperation: 'addNumber',
    keyValue: '7',
  },
  {
    keyText: '8',
    keyOperation: 'addNumber',
    keyValue: '8',
  },
  {
    keyText: '9',
    keyOperation: 'addNumber',
    keyValue: '7',
  },
  {
    keyText: '÷',
    keyOperation: 'divide',
  },
];
const RowThree = [
  {
    keyText: '4',
    keyOperation: 'addNumber',
    keyValue: '4',
  },
  {
    keyText: '5',
    keyOperation: 'addNumber',
    keyValue: '5',
  },
  {
    keyText: '6',
    keyOperation: 'addNumber',
    keyValue: '6',
  },
  {
    keyText: '×',
    keyOperation: 'multiply',
  },
];
const RowFour = [
  {
    keyText: '1',
    keyOperation: 'addNumber',
    keyValue: '1',
  },
  {
    keyText: '2',
    keyOperation: 'addNumber',
    keyValue: '2',
  },
  {
    keyText: '3',
    keyOperation: 'addNumber',
    keyValue: '3',
  },
  {
    keyText: '-',
    keyOperation: 'subtract',
  },
];
const RowFive = [
  {
    keyText: '0',
    keyOperation: 'addNumber',
    keyValue: '0',
  },
  {
    keyText: '.',
    keyOperation: 'addNumber',
    keyValue: '.',
  },
  {
    keyText: '=',
    keyOperation: 'equal',
  },
  {
    keyText: '+',
    keyOperation: 'add',
  },
];
const Keys = [RowOne, RowTwo, RowThree, RowFour, RowFive];
module.exports = Keys;
