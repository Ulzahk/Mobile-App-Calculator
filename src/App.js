import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {GeneralButton} from './components/GeneralButton';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outputContainer}>
        <Text>Hello</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsRow}>
          <GeneralButton buttonText="C" />
          <GeneralButton buttonText="+" />
          <GeneralButton buttonText="%" />
          <GeneralButton buttonText="DEL" />
        </View>
        <View style={styles.buttonsRow}>
          <GeneralButton buttonText="7" />
          <GeneralButton buttonText="8" />
          <GeneralButton buttonText="9" />
          <GeneralButton buttonText="÷" />
        </View>
        <View style={styles.buttonsRow}>
          <GeneralButton buttonText="4" />
          <GeneralButton buttonText="5" />
          <GeneralButton buttonText="6" />
          <GeneralButton buttonText="×" />
        </View>
        <View style={styles.buttonsRow}>
          <GeneralButton buttonText="1" />
          <GeneralButton buttonText="2" />
          <GeneralButton buttonText="3" />
          <GeneralButton buttonText="-" />
        </View>
        <View style={styles.buttonsRow}>
          <GeneralButton buttonText="0" />
          <GeneralButton buttonText="." />
          <GeneralButton buttonText="=" />
          <GeneralButton buttonText="+" />
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
