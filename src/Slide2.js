import React from 'react';
import {StyleSheet} from 'react-native';
import {getDeviceDimensions, SUPPORTED_IMAGE, SUPPORTED_VIDEO} from './constants/constants';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';

const AnimatedVideo = Animatable.createAnimatableComponent(Video);

const getMediaUri = media => media ? media.src : null;

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

  setPausedOnFinish() {
    const {onFinish} = this.props;
    onFinish();
    this.setState({paused: false});
  }

  onBeforeFinish(_time) {
    const {onBeforeFinish} = this.props;
    if ((_time.seekableDuration - _time.currentTime) < 1) {
      onBeforeFinish();
    }
  }

  _render(opacity) {
    const {content, onFinish} = this.props;
    const media = content ? content.media : null;
    const uri = getMediaUri(media);

    let imageOpacity = opacity, videoOpacity = opacity;
    let isShowingVideo = false;
    let sourceVideo, sourceImage;
    //console.log(`render Img at ${moment().format('HH:mm:ss')} : ${media.name}`);
    if (!media) {
      videoOpacity = 0;
      imageOpacity = 0;
    } else if (SUPPORTED_IMAGE.includes(media.ext)) {
      videoOpacity = 0;
      if (opacity > 0) this.stopShowImage();
      sourceImage = uri;
    } else if (SUPPORTED_VIDEO.includes(media.ext)) {
      imageOpacity = 0;
      if (opacity > 0) isShowingVideo = true;
      sourceVideo = uri;
    }
    return (
      [<Animatable.Image
        key={`image` + this.props.key2}
        useNativeDriver={true}
        animation={this.props.animation}
        duration={300}
        onError={
          () => console.log('error loading image')
        }
        easing="linear"
        source={sourceImage}
        style={{
          ...{opacity: imageOpacity},
          ...StyleSheet.absoluteFillObject,
          ...getDeviceDimensions(),
          zIndex: 2
        }}
      />,
        <Video
          key={`video_` + this.props.key2}
          onLoad={() => {
            this.setState({
              paused: true
            });
          }}
          useNativeDriver={true}
          useTextureView={false}
          //animation={this.props.animation}
          duration={300}
          style={{
            ...{opacity: videoOpacity},
            ...StyleSheet.absoluteFillObject,
            ...getDeviceDimensions(),
            zIndex: 2
          }}
          source={sourceVideo}
          onProgress={isShowingVideo ? this.onBeforeFinish.bind(this) : () => {
          }}
          onEnd={isShowingVideo ? this.setPausedOnFinish.bind(this) : () => {
          }}
          onError={isShowingVideo ? this.setPausedOnFinish.bind(this) : () => {
          }}
          repeat={false}
          paused={isShowingVideo ? false : this.state.paused}
        />
      ]
    );

  }

  render() {
    const {content, step} = this.props;

    if (step === 'background') {
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
