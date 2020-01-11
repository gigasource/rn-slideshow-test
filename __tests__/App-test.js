/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native', function() {
  const reactNative = require.requireActual('react-native');
  reactNative.NativeModules.UIManager.getViewManagerConfig = (_name) => {
    return {
      Constants: {
        ScaleToFit: 1,
        ScaleAspectFit: 3,
        ScaleAspectFill: 18,
        ScaleNone: 5
      }
    }
  }

  return reactNative;
});

jest.mock('react-native-video', function () {
  return class Video extends React.Component {
    constructor(props) {
      super(props)
    }
    _onLoad = () => {
      if (this.props.onLoad) {
        this.props.onLoad();
      }
    }
  }
})

jest.setTimeout(40000);

it('renders correctly', (next) => {
  const tree = renderer.create(<App />);
  setTimeout(() => {
    expect(tree.getInstance().status).toMatchSnapshot();
    next();
  }, 10000)
});
