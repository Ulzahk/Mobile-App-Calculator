// @ts-ignore
import { Dimensions, Platform, PixelRatio } from 'react-native';

export var { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');
const wscale: number = SCREEN_WIDTH / 375;
const hscale: number = SCREEN_HEIGHT / 667;

const normalize = (size: number, based = 'width'): number => {
  const newSize = based === 'height' ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export default normalize;
