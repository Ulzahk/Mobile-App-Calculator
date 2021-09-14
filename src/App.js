import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outputContainer}>
        <Text>Hello</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsRow}>
          <Text>C</Text>
          <Text>+/-</Text>
          <Text>%</Text>
          <Text>C</Text>
        </View>
        <View style={styles.buttonsRow}>
          <Text>7</Text>
          <Text>8</Text>
          <Text>9</Text>
          <Text>÷</Text>
        </View>
        <View style={styles.buttonsRow}>
          <Text>4</Text>
          <Text>5</Text>
          <Text>6</Text>
          <Text>x</Text>
        </View>
        <View style={styles.buttonsRow}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
          <Text>-</Text>
        </View>
        <View style={styles.buttonsRow}>
          <Text>0</Text>
          <Text>.</Text>
          <Text>=</Text>
          <Text>+</Text>
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
    width: '100%',
    height: '20%',
    backgroundColor: 'salmon',
  },
});

export default App;
