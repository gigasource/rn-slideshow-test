import { Dimensions } from 'react-native';

const startAnimationAdapter = {
  'fadeIn': 'fadeIn',
  'slideInUp': 'fadeInUpBig',
  'slideInDown': 'fadeInDownBig',
  'slideInLeft': 'fadeInLeftBig',
  'slideInRight': 'fadeInRightBig',
  'bounceIn': 'bounceIn',
  'bounceInUp': 'bounceInUp',
  'bounceInDown': 'bounceInDown',
  'bounceInLeft': 'bounceInLeft',
  'bounceInRight': 'bounceInRight',
  'zoomIn': 'zoomIn',
  'zoomInDown': 'zoomInDown',
  'zoomInUp': 'zoomInUp',
  'zoomInLeft': 'zoomInLeft',
  'zoomInRight': 'zoomInRight',
};

export const SUPPORTED_ANIMATION = Object.keys(startAnimationAdapter);
export function convertToReactAnimation(animation) {
  if (!SUPPORTED_ANIMATION.includes(animation)) {
    return null;
  } else {
    return startAnimationAdapter[animation];
  }
}

export const SUPPORTED_VIDEO = ['.mp4', '.mkv', '.mov', 'webm'];
export const SUPPORTED_IMAGE = ['.jpg', '.jpeg', '.png', '.bmp'];

export function getDeviceDimensions() {
  return {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  };
}

// export const deviceToken = DeviceInfo.getUniqueID();
