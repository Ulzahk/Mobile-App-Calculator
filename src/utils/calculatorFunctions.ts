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
}): void => {
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
const changeSignOperation = (params: {
  variableToOperate: string,
  setVariableToOperate: Function,
}): void => {
  const {variableToOperate, setVariableToOperate} = params;
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
const percentageOperation = (params: {
  history: Array<string>,
  variableToOperate: string,
  setVariableToOperate: Function,
  equalOperation: Function,
  setResult: Function,
}): void => {
  const {
    history,
    variableToOperate,
    setVariableToOperate,
    equalOperation,
    setResult,
  } = params;
  if (variableToOperate === '') {
    return;
  }
  const defaultPercentage: string = (parseFloat(variableToOperate) * 0.01).toFixed(2);
  setVariableToOperate(defaultPercentage);
  equalOperation({
    history,
    variableToOperate: defaultPercentage,
    setResult,
    setVariableToOperate,
  });
};
const cancelOperation = (params: {
  setResult: Function,
  setVariableToOperate: Function,
  setHistory: Function
}): void => {
  const {
    setResult, setVariableToOperate, setHistory
  } = params;
  setResult(0);
  setVariableToOperate('');
  setHistory([]);
};
const equalOperation = (params: {
  history: Array<string>,
  variableToOperate: string,
  setResult: Function,
  setVariableToOperate: Function,
}): void => {
  const {
    history,
    variableToOperate,
    setResult,
    setVariableToOperate,
  } = params;
  let controlVariable: number = 0;
  if (variableToOperate !== '') {
    history.push(variableToOperate);
  }
  history.map((record: string, index: number) => {
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
const operationEvaluator = (params: {
  history: string[],
  setHistory: Function,
  setResult:Function,
  variableToOperate: string,
  setVariableToOperate: Function,
  operation: string,
  newValue: string,
}) => {
  const {
    history,
    setHistory,
    setResult,
    variableToOperate,
    setVariableToOperate,
    operation,
    newValue,
  } = params;
  const WITH_VALUE: boolean = variableToOperate !== '' && variableToOperate !== '.';
  const DICTIONARY: object = {
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
