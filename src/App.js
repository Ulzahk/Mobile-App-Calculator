import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import GeneralButton from './components/GeneralButton';
import { colors } from './constants';
import normalize from './utils/normalize';

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
const equalOperation = ({ history, variableToOperate, setResult }) => {
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
};

const handlePressButton = ({
  history,
  setHistory,
  result,
  setResult,
  variableToOperate,
  setVariableToOperate,
  operation,
  newValue,
}) => {
  // const DICTIONARY = {
  //   addNumber: setVariableToOperate(
  //     parseFloat(`${variableToOperate}${newValue}`),
  //   ),
  //   sum: setVariableToCalculate(variableToCalculate + variableToOperate),
  //   subtract: setVariableToCalculate(variableToCalculate + variableToOperate),
  //   delete: deleteAction,
  // };
  if (operation === 'addNumber') {
    addNumberToVariable({
      variableToOperate,
      setVariableToOperate,
      newValue,
    });
  }
  if (operation === 'add') {
    addOperation({
      history,
      setHistory,
      variableToOperate,
      setVariableToOperate,
    });
  }
  if (operation === 'changeSign') {
    changeSignOperation({
      variableToOperate,
      setVariableToOperate,
    });
  }
  if (operation === 'percentage') {
    percentageOperation({
      history,
      variableToOperate,
      setVariableToOperate,
      equalOperation,
      setResult,
    });
  }
  if (operation === 'subtract') {
    subtractOperation({
      history,
      setHistory,
      variableToOperate,
      setVariableToOperate,
    });
  }
  if (operation === 'divide') {
    divideOperation({
      history,
      setHistory,
      variableToOperate,
      setVariableToOperate,
    });
  }
  if (operation === 'multiply') {
    multiplyOperation({
      history,
      setHistory,
      variableToOperate,
      setVariableToOperate,
    });
  }
  if (operation === 'delete') {
    setVariableToOperate(
      variableToOperate.slice(0, variableToOperate.length - 1),
    );
  }
  if (operation === 'cancel') {
    cancelOperation({
      setResult,
      setVariableToOperate,
      setHistory,
    });
  }
  if (operation === 'equal') {
    equalOperation({
      history,
      variableToOperate,
      setResult,
    });
  }
  // return DICTIONARY[operation];
};

const App = () => {
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(0);
  const [variableToOperate, setVariableToOperate] = useState('');
  const defaultObject = {
    history,
    setHistory,
    result,
    setResult,
    variableToOperate,
    setVariableToOperate,
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outputContainer}>
        <Text>Input: {variableToOperate}</Text>
        <Text>Result: {result}</Text>
        <View style={styles.historyContainer}>
          {history.length > 0
            ? history.map((record, index) => {
                return <Text key={index}> {record}</Text>;
              })
            : null}
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsRow}>
          <GeneralButton
            buttonText="C"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'cancel',
              })
            }
          />
          <GeneralButton
            buttonText="+/-"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'changeSign',
              })
            }
          />
          <GeneralButton
            buttonText="%"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'percentage',
              })
            }
          />
          <GeneralButton
            buttonText="DEL"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'delete',
              })
            }
          />
        </View>
        <View style={styles.buttonsRow}>
          <GeneralButton
            buttonText="7"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'addNumber',
                newValue: 7,
              })
            }
          />
          <GeneralButton
            buttonText="8"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'addNumber',
                newValue: 8,
              })
            }
          />
          <GeneralButton
            buttonText="9"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'addNumber',
                newValue: 9,
              })
            }
          />
          <GeneralButton
            buttonText="÷"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'divide',
              })
            }
          />
        </View>
        <View style={styles.buttonsRow}>
          <GeneralButton
            buttonText="4"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'addNumber',
                newValue: 4,
              })
            }
          />
          <GeneralButton
            buttonText="5"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'addNumber',
                newValue: 5,
              })
            }
          />
          <GeneralButton
            buttonText="6"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'addNumber',
                newValue: 6,
              })
            }
          />
          <GeneralButton
            buttonText="×"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'multiply',
              })
            }
          />
        </View>
        <View style={styles.buttonsRow}>
          <GeneralButton
            buttonText="1"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'addNumber',
                newValue: 1,
              })
            }
          />
          <GeneralButton
            buttonText="2"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'addNumber',
                newValue: 2,
              })
            }
          />
          <GeneralButton
            buttonText="3"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'addNumber',
                newValue: 3,
              })
            }
          />
          <GeneralButton
            buttonText="-"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'subtract',
              })
            }
          />
        </View>
        <View style={styles.buttonsRow}>
          <GeneralButton
            buttonText="0"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'addNumber',
                newValue: 0,
              })
            }
          />
          <GeneralButton
            buttonText="."
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'addNumber',
                newValue: '.',
              })
            }
          />
          <GeneralButton
            buttonText="="
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'equal',
              })
            }
          />
          <GeneralButton
            buttonText="+"
            onPress={() =>
              handlePressButton({
                ...defaultObject,
                operation: 'add',
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  outputContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#CCCCCC',
    height: '20%',
    width: '100%',
    padding: normalize(6),
  },
  historyContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.grayButtonsContainer,
    height: '80%',
    width: '100%',
    padding: normalize(6),
  },
  buttonsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '20%',
  },
  button: {
    width: '25%',
    height: '100%',
    backgroundColor: 'red',
  },
});

export default App;
