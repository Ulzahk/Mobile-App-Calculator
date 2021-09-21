import React, { useState } from 'react';
// @ts-ignore
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
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
        <View style={styles.outputScreen}>
          <ScrollView
            style={styles.screenHistory}
            horizontal={true}
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
            {history.length > 0
              ? history.map((record, index) => {
                  if (record === '') {
                    return;
                  }
                  return (
                    <Text style={styles.screenHistoryText} key={index}>
                      {record}
                    </Text>
                  );
                })
              : null}
          </ScrollView>
          <View style={styles.screenInput}>
            <Text style={styles.screenInputText}>{variableToOperate}</Text>
          </View>
          <View style={styles.screenOutput}>
            <Text style={styles.screenOutputText}>{result}</Text>
          </View>
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
    backgroundColor: colors.generalBackgroundColor,
    height: '30%',
    width: '100%',
    padding: normalize(12),
  },
  outputScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightBlue,
    borderRadius: normalize(10),
  },
  scrollScreenHistory: {
    height: '20%',
    width: '100%',
  },
  screenHistory: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.lowOpacity,
    borderTopLeftRadius: normalize(10),
    borderTopRightRadius: normalize(10),
  },
  screenHistoryText: {
    width: 'auto',
    color: colors.screenText,
    fontSize: normalize(20),
    paddingLeft: normalize(10),
  },
  screenInput: {
    height: '30%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  screenInputText: {
    width: 'auto',
    color: colors.screenText,
    fontSize: normalize(24),
    paddingRight: normalize(10),
  },
  screenOutput: {
    height: '50%',
    width: '100%',
    borderBottomLeftRadius: normalize(10),
    borderBottomRightRadius: normalize(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  screenOutputText: {
    width: 'auto',
    color: colors.screenText,
    fontSize: normalize(40),
    fontWeight: 'bold',
    paddingRight: normalize(10),
  },
  historyContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.generalBackgroundColor,
    height: '70%',
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
