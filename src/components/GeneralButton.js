import React, { useState, useCallback } from 'react';
import { TouchableWithoutFeedback, Text, StyleSheet, View } from 'react-native';
import normalize from '../utils/normalize';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../constants';

const { buttonGradientColorOne, buttonGradientColorTwo, grayButtonsContainer } =
  colors;
const GeneralButton = props => {
  const [isDown, setDown] = useState(false);
  const handlePressIn = useCallback(() => {
    setDown(true);
  }, [setDown]);
  const handlePressOut = useCallback(() => {
    setDown(false);
  }, [setDown]);
  const gradColors = isDown
    ? [buttonGradientColorOne, buttonGradientColorTwo]
    : [buttonGradientColorTwo, buttonGradientColorOne];
  const { buttonText, onPress } = props;
  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}>
      <View style={styles.buttonOuter}>
        <View style={styles.buttonInner}>
          <LinearGradient
            colors={gradColors}
            useAngle={true}
            angle={145}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={styles.buttonFace}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </LinearGradient>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = new StyleSheet.create({
  buttonOutter: {
    flexBasis: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(10),
  },
  buttonInner: {
    backgroundColor: grayButtonsContainer,
    borderRadius: normalize(10),
  },
  buttonFace: {
    height: normalize(80),
    width: normalize(80),
    borderRadius: normalize(10),
    padding: normalize(12),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: normalize(32),
  },
});

export default GeneralButton;
