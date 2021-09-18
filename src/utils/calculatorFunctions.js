const addNumberToVariable = ({
  variableToOperate,
  setVariableToOperate,
  newValue,
}) => {
  if (!variableToOperate) {
    setVariableToOperate(`${newValue}`);
  }
  if (variableToOperate) {
    setVariableToOperate(`${variableToOperate}${newValue}`);
  }
};
const addOperation = ({
  history,
  setHistory,
  variableToOperate,
  setVariableToOperate,
}) => {
  setHistory([...history, variableToOperate, '+']);
  setVariableToOperate('');
};
const subtractOperation = ({
  history,
  setHistory,
  variableToOperate,
  setVariableToOperate,
}) => {
  setHistory([...history, variableToOperate, '-']);
  setVariableToOperate('');
};
const divideOperation = ({
  history,
  setHistory,
  variableToOperate,
  setVariableToOperate,
}) => {
  setHistory([...history, variableToOperate, '÷']);
  setVariableToOperate('');
};
const multiplyOperation = ({
  history,
  setHistory,
  variableToOperate,
  setVariableToOperate,
}) => {
  setHistory([...history, variableToOperate, '×']);
  setVariableToOperate('');
};
const changeSignOperation = ({ variableToOperate, setVariableToOperate }) => {
  if (variableToOperate === '') {
    return;
  }
  const sign = variableToOperate.charAt(0) === '-' ? '+' : '-';
  if (
    variableToOperate.charAt(0) === '-' ||
    variableToOperate.charAt(0) === '+'
  ) {
    setVariableToOperate(
      `${sign}${variableToOperate.slice(1, variableToOperate.length)}`,
    );
  }
  if (
    variableToOperate.charAt(0) !== '-' &&
    variableToOperate.charAt(0) !== '+'
  ) {
    setVariableToOperate(`${sign}${variableToOperate}`);
  }
};
const percentageOperation = ({
  history,
  variableToOperate,
  setVariableToOperate,
  equalOperation,
  setResult,
}) => {
  if (variableToOperate === '') {
    return;
  }
  const defaultPercentage = (parseFloat(variableToOperate) / 100).toFixed(2);
  setVariableToOperate(defaultPercentage);
  equalOperation({
    history,
    variableToOperate: defaultPercentage,
    setResult,
  });
};
const cancelOperation = ({ setResult, setVariableToOperate, setHistory }) => {
  setResult(0);
  setVariableToOperate('');
  setHistory([]);
};
const equalOperation = ({
  history,
  variableToOperate,
  setResult,
  setVariableToOperate,
}) => {
  let controlVariable = 0;
  const historyData = history;
  historyData.push(variableToOperate);
  history.map((record, index) => {
    const previousValue = history[index - 1];
    const nextValue = history[index + 1];
    if (record === '×') {
      if (controlVariable > 0) {
        controlVariable = controlVariable * parseFloat(nextValue);
      }
      if (controlVariable === 0) {
        controlVariable = parseFloat(previousValue) * parseFloat(nextValue);
      }
    }
    if (record === '÷') {
      if (controlVariable > 0) {
        controlVariable = controlVariable / parseFloat(nextValue);
      }
      if (controlVariable === 0) {
        controlVariable = parseFloat(previousValue) / parseFloat(nextValue);
      }
    }
    if (record === '+') {
      if (controlVariable > 0) {
        controlVariable = controlVariable + parseFloat(nextValue);
      }
      if (controlVariable === 0) {
        controlVariable = parseFloat(previousValue) + parseFloat(nextValue);
      }
    }
    if (record === '-') {
      if (controlVariable > 0) {
        controlVariable = controlVariable - parseFloat(nextValue);
      }
      if (controlVariable === 0) {
        controlVariable = parseFloat(previousValue) - parseFloat(nextValue);
      }
    }
  });
  setResult(controlVariable);
  setVariableToOperate('');
};
const operationEvaluator = ({
  history,
  setHistory,
  setResult,
  variableToOperate,
  setVariableToOperate,
  operation,
  newValue,
}) => {
  const DICTIONARY = {
    addNumber: () =>
      addNumberToVariable({
        variableToOperate,
        setVariableToOperate,
        newValue,
      }),
    add: () =>
      addOperation({
        history,
        setHistory,
        variableToOperate,
        setVariableToOperate,
      }),
    cancel: () =>
      cancelOperation({
        setResult,
        setVariableToOperate,
        setHistory,
      }),
    equal: () =>
      equalOperation({
        history,
        variableToOperate,
        setResult,
        setVariableToOperate,
      }),
    changeSign: () =>
      changeSignOperation({
        variableToOperate,
        setVariableToOperate,
      }),
    percentge: () =>
      percentageOperation({
        history,
        variableToOperate,
        setVariableToOperate,
        equalOperation,
        setResult,
      }),
    subtract: () =>
      subtractOperation({
        history,
        setHistory,
        variableToOperate,
        setVariableToOperate,
      }),
    divide: () => {
      divideOperation({
        history,
        setHistory,
        variableToOperate,
        setVariableToOperate,
      });
    },
    multiply: () =>
      multiplyOperation({
        history,
        setHistory,
        variableToOperate,
        setVariableToOperate,
      }),
    delete: () =>
      setVariableToOperate(
        variableToOperate.slice(0, variableToOperate.length - 1),
      ),
  };
  return DICTIONARY[operation]();
};

module.exports = operationEvaluator;
