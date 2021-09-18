import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import GeneralButton from './components/GeneralButton';
import operationEvaluator from './utils/calculatorFunctions';
import normalize from './utils/normalize';
import Keys from './utils/calculatorKeys';
import { colors } from './constants';

const handlePressButton = ({
  history,
  setHistory,
  setResult,
  variableToOperate,
  setVariableToOperate,
  operation,
  newValue,
}) => {
  operationEvaluator({
    history,
    setHistory,
    setResult,
    variableToOperate,
    setVariableToOperate,
    operation,
    newValue,
  });
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
        {Keys.map((keysRow, index) => {
          return (
            <View key={`KeysRow-${index}`} style={styles.buttonsRow}>
              {keysRow.map((record, index) => (
                <GeneralButton
                  key={`${index}-${record.keyText}`}
                  buttonText={record.keyText}
                  onPress={() =>
                    handlePressButton({
                      ...defaultObject,
                      operation: record.keyOperation,
                      newValue: record.keyValue ? record.keyValue : '',
                    })
                  }
                />
              ))}
            </View>
          );
        })}
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
    flexWrap: 'wrap',
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
