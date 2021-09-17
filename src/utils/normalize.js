import { Dimensions, Platform, PixelRatio } from 'react-native';

export var { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');
const wscale = SCREEN_WIDTH / 375;
const hscale = SCREEN_HEIGHT / 667;

export default normalize = (size, based = 'width') => {
  const newSize = based === 'height' ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
