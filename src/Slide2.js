import React from 'react';
import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

class Slide2 extends React.Component {
  mediaTimeout = null;

  constructor(props) {
    super(props);

    this.state = {
      paused: false
    };

    this.stopShowImage = () => {
      this.mediaTimeout = setTimeout(() => {
        if (this.props.onFinish) {
          this.props.onFinish();
        }
        clearTimeout(this.mediaTimeout);
        this.mediaTimeout = null;
      }, this.props.content.duration);
    };
  }

  _render(opacity) {
    const { content } = this.props;
    const media = content ? content.media : null;
    const source = media ? media.source : null;
    if (opacity > 0) {
      this.stopShowImage();
    }
    return (
      <Animatable.Image
        key={`image` + this.props.key2}
        useNativeDriver={true}
        // animation={this.props.animation}
        duration={300}
        onError={
          () => console.log('error loading image')
        }
        easing="linear"
        source={source}
        style={{
          ...{opacity: opacity},
          ...StyleSheet.absoluteFillObject,
          ...this.props.getDeviceDimensions(),
          zIndex: 2
        }}
      />
    );

  }

  render() {
    const {content, step} = this.props;
    if (step === 'next') {
      return this._render.bind(this)(0);
    }

    if (step === 'current') {
      return this._render.bind(this)(100);
    }
    return null;
  }
}

Slide2.propTypes = {};

export default Slide2;
