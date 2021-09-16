import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {GeneralButton} from './components/GeneralButton';

const handlePressButton = ({
  history,
  setHistory,
  variableToCalculate,
  setVariableToCalculate,
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
    setVariableToOperate(parseFloat(`${variableToOperate}${newValue}`));
  }
  if (operation === 'sum') {
    setVariableToCalculate(variableToCalculate + variableToOperate);
    setVariableToOperate(0);
  }
  if (operation === 'subtract') {
    setVariableToCalculate(variableToCalculate - variableToOperate);
    setVariableToOperate(0);
  }
  if (operation === 'division') {
    setVariableToCalculate(variableToCalculate / variableToOperate);
    setVariableToOperate(0);
  }
  if (operation === 'multiplication') {
    setVariableToCalculate(variableToCalculate * variableToOperate);
    setVariableToOperate(0);
  }
  if (operation === 'delete') {
    setVariableToCalculate(0);
    setVariableToOperate(0);
  }
  // return DICTIONARY[operation];
};

const App = () => {
  const [history, setHistory] = useState('');
  const [variableToCalculate, setVariableToCalculate] = useState(0);
  const [variableToOperate, setVariableToOperate] = useState(0);
  const defaultObject = {
    history,
    setHistory,
    variableToCalculate,
    setVariableToCalculate,
    variableToOperate,
    setVariableToOperate,
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outputContainer}>
        <Text>Input: {variableToOperate}</Text>
        <Text>Result: {variableToCalculate}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsRow}>
          <GeneralButton buttonText="C" />
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
                operation: 'division',
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
                operation: 'multiplication',
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
                operation: 'substract',
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
                operation: 'sum',
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
    flexDirection: 'row',
    backgroundColor: '#CCCCCC',
    height: '20%',
    width: '100%',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#BBBBBB',
    height: '80%',
    width: '100%',
  },
  buttonsRow: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
