import React from 'react';
import {StyleSheet, View} from 'react-native';
import v1 from 'uuid/v1';
import _ from 'lodash';
import Slide2 from "./Slide2";
import {convertToReactAnimation, getDeviceDimensions, SUPPORTED_IMAGE} from './constants/constants';
import Video from "react-native-video";

const delayBeforeFinish = 2;

class SlideShow2 extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
    this.nodeFlag = true;
    this.slide = [{step: 'next'}, {step: 'next'}];
    this.videoSlide = {
      opacity: 0,
      source: null,
    }
  }

  render() {
    let {currentContent, nextContent, setNextContentCallback, getDeviceDimensions} = this.props;
    if (currentContent.media.isImage) {
      this.nodeFlag = !this.nodeFlag;
      this.slide[Number(this.nodeFlag)] = {
        content: currentContent,
        step: 'current',
        cb: setNextContentCallback,
        animation: convertToReactAnimation(currentContent.effect)
      };
      this.slide[Number(!this.nodeFlag)].step = 'next'
      this.videoSlide = {
        opacity: 0,
        source: null
      }
    } else {
      if (currentContent.media.isVideo) {
        this.videoSlide = {
          opacity: 100,
          source: currentContent.media.src
        }
      }
      this.slide[Number(this.nodeFlag)].step = 'next';
    }
    if (nextContent.media.isImage) {
      this.slide[Number(!this.nodeFlag)] = {
        content: nextContent,
        step: 'next',
        cb: null
      };
    }
    console.log(currentContent.media);
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <Slide2 key={'slide0'}
                key2={'slide0'}
                content={this.slide[0].content}
                animation={this.slide[0].animation}
                step={this.slide[0].step}
                onFinish={this.slide[0].cb}
                getDeviceDimensions={getDeviceDimensions}/>
        <Slide2 key={'slide1'}
                key2={'slide1'}
                content={this.slide[1].content}
                animation={this.slide[1].animation}
                step={this.slide[1].step}
                onFinish={this.slide[1].cb}
                getDeviceDimensions={getDeviceDimensions}/>
        <Video
          key={`video0`}
          useNativeDriver={true}
          useTextureView={false}
          //animation={this.props.animation}
          duration={300}
          style={{
            ...{opacity: this.videoSlide.opacity},
            ...StyleSheet.absoluteFillObject,
            ...getDeviceDimensions(),
            zIndex: 2
          }}
          source={this.videoSlide.source}
          // onProgress={isShowingVideo ? this.onBeforeFinish.bind(this) : () => {}}
          onEnd={setNextContentCallback}
          onError={setNextContentCallback}
          repeat={false}
          paused={false}
        />

      </View>
    );
  }
}

export default SlideShow2;
