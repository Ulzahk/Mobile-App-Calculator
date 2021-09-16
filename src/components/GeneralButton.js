import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
// import normalize from 'react-native-normalize';

export const GeneralButton = props => {
  const {buttonText, onPress} = props;
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <Text>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = new StyleSheet.create({
  buttonWrapper: {
    width: '25%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
});
