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
  const React = require('react');
  return class Video extends React.Component {
    constructor (props) {
      super(props);
      this._onLoad = false;
    }
    render() {
      if (this.props.onLoad !== this._onLoad && this.props.source && !this._onLoad) {
        this._onLoad = true;
        setTimeout(() => {
          this.props.onLoad();
        }, 0);
        return null;
      }
      if (this.props.source && !this.props.paused) {
        if (this.props.onProgress) {
          setTimeout(() => {
            this.props.onProgress({
              seekableDuration: 3,
              currentTime: 2.6
            })
          }, 2600)
        }
        if (this.props.onEnd) {
          // console.log("Call onEnd");
          setTimeout(() => {
            // console.log("onEnd");
            this.props.onEnd();
            this._onLoad = false;
          }, 3000)
        }
      }
      return null;
    }
  }
});

jest.mock('react-native-animatable', function () {
  const React = require('react');
  class Image extends React.Component {
    render() {
      return null;
    }
  }
  return {
    Image: Image,
    createAnimatableComponent: (component) => null
  }
})

jest.setTimeout(40000);

it(
  'renders correctly', (next) => {
  const tree = renderer.create(<App />);
  setTimeout(() => {
    expect(tree.getInstance().status).toMatchSnapshot();
    next();
  }, 30000)
});
