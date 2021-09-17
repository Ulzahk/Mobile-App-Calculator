import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import GeneralButton from './components/GeneralButton';
import { colors } from './constants';
import normalize from './utils/normalize';

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
    if (!variableToOperate) {
      setVariableToOperate(`${newValue}`);
    }
    if (variableToOperate) {
      setVariableToOperate(`${variableToOperate}${newValue}`);
    }
  }
  if (operation === 'add') {
    setHistory([...history, variableToOperate, '+']);
    setVariableToOperate(0);
  }
  if (operation === 'subtract') {
    setHistory([...history, variableToOperate, '-']);
    setVariableToOperate(0);
  }
  if (operation === 'divide') {
    setHistory([...history, variableToOperate, '÷']);
    setVariableToOperate(0);
  }
  if (operation === 'multiply') {
    setHistory([...history, variableToOperate, '×']);
    setVariableToOperate(0);
  }
  if (operation === 'delete') {
    setVariableToOperate(0);
  }
  if (operation === 'cancel') {
    setResult(0);
    setVariableToOperate(0);
    setHistory([]);
  }
  if (operation === 'equal') {
    let controlVariable = 0;
    const historyData = history;
    historyData.push(variableToOperate);
    history.map((record, index) => {
      // 2 + 2
      const previousValue = history[index - 1];
      // console.log('previousValue', parseFloat(previousValue));
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
      // if (record === '2') {
      //   controlVariable = controlVariable;
      // }
    });
    setResult(controlVariable);
  }
  // return DICTIONARY[operation];
};

const App = () => {
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(0);
  const [variableToOperate, setVariableToOperate] = useState(0);
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
          <GeneralButton buttonText="%" />
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
