const operationValidator = (params: {
  history: Array<string>,
  setHistory: Function,
  variableToOperate: string,
  setVariableToOperate: Function,
  WITH_VALUE: boolean,
  operation: string,
}): void =>  {
  const {
    history,
    setHistory,
    variableToOperate,
    setVariableToOperate,
    WITH_VALUE,
    operation
  } = params;
  const DICTIONARY: {
    add: string,
    subtract: string,
    divide:string,
    multiply: string
  } = {
    add: '+',
    subtract: '-',
    divide: '÷',
    multiply: '×',
  };
  const operationSign: string = DICTIONARY[operation];
  if (history.length > 0) {
    if (new RegExp(/[+\-÷×]/).test(history[history.length - 1]) === false) {
      setHistory([...history, variableToOperate, operationSign]);
      setVariableToOperate('');
    }
    if (
      new RegExp(/[+\-÷×]/).test(history[history.length - 1]) === true &&
      WITH_VALUE
    ) {
      setHistory([...history, variableToOperate, operationSign]);
      setVariableToOperate('');
    }
  }
  if (history.length === 0) {
    if (WITH_VALUE) {
      setHistory([...history, variableToOperate, operationSign]);
      setVariableToOperate('');
    }
  }
};
const addNumberToVariable = (params: {
  variableToOperate: string,
  setVariableToOperate: Function,
  newValue: string,
  history: Array<string>,
  setHistory: Function,
  setResult: Function,
}) => {
  const {
    variableToOperate,
    setVariableToOperate,
    newValue,
    history,
    setHistory,
    setResult,
  } = params;
  if (!variableToOperate) {
    setVariableToOperate(`${newValue}`);
    if (new RegExp(/[0-9]+/).test(history[history.length - 1])) {
      setHistory([]);
      setResult(0);
    }
  }
  if (variableToOperate) {
    setVariableToOperate(`${variableToOperate}${newValue}`);
  }
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
  const defaultPercentage = (parseFloat(variableToOperate) * 0.01).toFixed(2);
  setVariableToOperate(defaultPercentage);
  equalOperation({
    history,
    variableToOperate: defaultPercentage,
    setResult,
    setVariableToOperate,
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
  if (variableToOperate !== '') {
    history.push(variableToOperate);
  }
  history.map((record, index) => {
    const previousValue = history[index - 1];
    const nextValue = history[index + 1];
    if (nextValue === undefined) {
      setVariableToOperate('');
      return;
    }
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
  const WITH_VALUE = variableToOperate !== '' && variableToOperate !== '.';
  const DICTIONARY = {
    addNumber: () =>
      addNumberToVariable({
        variableToOperate,
        setVariableToOperate,
        newValue,
        history,
        setHistory,
        setResult,
      }),
    add: () =>
      operationValidator({
        history,
        setHistory,
        variableToOperate,
        setVariableToOperate,
        WITH_VALUE,
        operation,
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
    percentage: () =>
      percentageOperation({
        history,
        variableToOperate,
        setVariableToOperate,
        equalOperation,
        setResult,
      }),
    subtract: () =>
      operationValidator({
        history,
        setHistory,
        variableToOperate,
        setVariableToOperate,
        WITH_VALUE,
        operation,
      }),
    divide: () =>
      operationValidator({
        history,
        setHistory,
        variableToOperate,
        setVariableToOperate,
        WITH_VALUE,
        operation,
      }),
    multiply: () =>
      operationValidator({
        history,
        setHistory,
        variableToOperate,
        setVariableToOperate,
        WITH_VALUE,
        operation,
      }),
    delete: () =>
      setVariableToOperate(
        variableToOperate.slice(0, variableToOperate.length - 1),
      ),
  };
  return DICTIONARY[operation]();
};
export default operationEvaluator;
