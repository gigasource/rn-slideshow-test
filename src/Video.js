import Video from 'react-native-video';
import {StyleSheet} from "react-native";
import {getDeviceDimensions} from "./constants/constants";
import React from "react";

class VideoSlide extends React.Component {
  render() {
    return(
      <Video
        key={`video_` + this.props.key2}
        useNativeDriver={true}
        useTextureView={false}
        //animation={this.props.animation}
        // duration={300}
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
    )
  }
}