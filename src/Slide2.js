import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { convertToReactAnimation, getDeviceDimensions, SUPPORTED_IMAGE, SUPPORTED_VIDEO } from './constants/constants';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';
import _ from 'lodash';

const AnimatedVideo = Animatable.createAnimatableComponent(Video);

const getMediaUri = media => media.src;

class Slide2 extends React.Component {
  mediaTimeout = null;

  constructor(props) {
    super(props);

    this.state = {
      paused: false,
      continueRender: true
    };

    this.stopPlay = _.once(() => {
      setTimeout(() => this.setState({ paused: true }), 1)
    });

    this.stopShowImage = () => {
      this.mediaTimeout = setTimeout(() => {
        if (this.props.onFinish) {
          this.props.onFinish();
        }
        clearTimeout(this.mediaTimeout);
        this.mediaTimeout = null;
      }, this.props.content.duration);
    };

    this.logPrepare = _.once(() => {
      console.debug(`prepare VideoView at ${moment().format('HH:mm:ss')}: ${content.media.name}`);
    });
  }

  componentWillUnmount() {
    if (this.mediaTimeout) {
      //console.log(`componentWillUnmount at ${moment().format('HH:mm:ss')} : ${content.media.name}`);
      clearTimeout(this.mediaTimeout);
    }
    if (this.timeoutStopRender) {
      clearTimeout(this.timeoutStopRender);
    }

    this.stopPlay = null;
    this.stopShowImage = null;
    this.logPrepare = null;
    this.setTimeoutStopRender = null;
  }

  renderCurrent(opacity) {
    const { content, onFinish } = this.props;
    const media = content.media;
    const uri = getMediaUri(media);

    let imageOpacity = opacity, videoOpacity = opacity;

    //console.log(`render Img at ${moment().format('HH:mm:ss')} : ${media.name}`);
    if (SUPPORTED_IMAGE.includes(media.ext)) {
      videoOpacity = 0
      this.stopShowImage();
    } else if (SUPPORTED_VIDEO.includes(media.ext)) {
      imageOpacity = 0;
    }
    return (
      [<Animatable.Image
        key={`image` + this.props.key2}
        ref={ref => this.img = ref}
        useNativeDriver={true}
        //animation={convertToReactAnimation(content.effect)}
        duration={300}
        onError={
          () => console.log('error loading image')
        }
        easing="linear"
        source={uri}
        style={{
          ...{ opacity: imageOpacity },
          ...StyleSheet.absoluteFillObject,
          ...getDeviceDimensions(),
          zIndex: 2
        }}
      />,
        <Video
          key={`video_` + this.props.key2}
          ref={ref => (this.player = ref)}
          id={this.props.id}
          useNativeDriver={true}
          useTextureView={false}
          //animation={convertToReactAnimation(content.effect)}
          duration={300}
          style={{
            ...{ opacity: videoOpacity },
            ...StyleSheet.absoluteFillObject,
            ...getDeviceDimensions(),
            zIndex: 2
          }}
          source={uri}
          onEnd={onFinish}
          onError={onFinish}
          //onProgress={this.onProgress}
          repeat={false}
          paused={false}
        />
      ]
    );

  }

  renderPrepareVideo() {
    const { content } = this.props;

    this.stopPlay();
    this.logPrepare();
    return (
      <AnimatedVideo
        id={this.props.id}
        useNativeDriver={true}
        useTextureView={false}
        src={{ uri: getMediaUri(content.media) }}
        style={{
          ...StyleSheet.absoluteFillObject,
          width: 0, height: 0,
          zIndex: 0
        }}
        paused={this.state.paused}
      />
    )
  }

  render() {
    const { content, step } = this.props;
    const media = content.media;

    if (step === 'background') {
      return this.renderCurrent.bind(this)(0);
    }

    if (step === 'current') {
      return this.renderCurrent.bind(this)(100);
    }

    //render prepare

    if (!SUPPORTED_VIDEO.includes(media.ext)) {
      return null;
    }

    return this.renderPrepareVideo.bind(this)();
  }
}

Slide2.propTypes = {};

export default Slide2;
