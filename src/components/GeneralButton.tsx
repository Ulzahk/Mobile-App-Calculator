import React, { useState, useCallback } from 'react';
import { TouchableWithoutFeedback, Text, StyleSheet, View } from 'react-native';
import normalize from '../utils/normalize';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../constants';

const { buttonGradientColorOne, buttonGradientColorTwo, grayButtonsContainer } =
  colors;
const GeneralButton = (props: {
  key: string;
  buttonText: string;
  onPress: Function;
}) => {
  const [isDown, setDown]: [boolean, Function] = useState(false);
  const handlePressIn: Function = useCallback(() => {
    setDown(true);
  }, [setDown]);
  const handlePressOut: Function = useCallback(() => {
    setDown(false);
  }, [setDown]);
  const gradColors: string[] = isDown
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
    height: normalize(70),
    width: normalize(70),
    borderRadius: normalize(50),
    padding: normalize(12),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: normalize(28),
  },
});

export default GeneralButton;
