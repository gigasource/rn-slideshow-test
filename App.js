/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import SlideShow2 from './src/SlideShow2';
import {
  convertToReactAnimation,
  getDeviceDimensions,
  SUPPORTED_IMAGE,
  SUPPORTED_VIDEO
} from './src/constants/constants';
import _ from 'lodash';

let timeCount = 0;
setInterval(() => {
  timeCount += 1;
}, 200);

function normalize(playlist) {
  return playlist.map(play => {
    let _play = _.cloneDeep(play);
    if (SUPPORTED_VIDEO.includes(_play.media.ext)) _play.media.type = 'video';
    if (SUPPORTED_IMAGE.includes(_play.media.ext)) _play.media.type = 'image';
    _play.media.source = _play.media.src;
    _play.effect = convertToReactAnimation(_play.effect)
    return _play;
  })
}

export default class TestApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPlayList: normalize([{ media: { name: 'src1', src: require('./assets/video1.mp4'), ext: '.mp4' }, effect: 'slideInLeft'},
        { media: { name: 'src2', src: require('./assets/small.mp4'), ext: '.mp4' }, effect: 'slideInLeft', duration: 3000 },
        { media: { name: 'src3', src: require('./assets/img3.jpeg'), ext: '.jpg' }, effect: 'slideInLeft', duration: 3000 },
        { media: { name: 'src4', src: require('./assets/img4.jpeg'), ext: '.jpg' }, effect: 'slideInLeft', duration: 3000 },
        { media: { name: 'src5', src: require('./assets/viking.mp4'), ext: '.mp4' }, effect: 'slideInLeft', duration: 0 }]),
      currentContentIndex: 0,
    };
    this.count = 0;
    this.status = [];
    this.slideShowRef = React.createRef();
    this.preTime = null;
  }

  setNextContentCallback() {
    // let { currentIndex } = this.state;
    this.setState({ currentContentIndex: (this.state.currentContentIndex + 1) % this.state.currentPlayList.length });
  }

  round(_time) {
    return _time - _time % 100;
  }

  render() {
    // if (this.slideShowRef.current) {
    //   if (!this.preTime) this.preTime = moment();
    //   const nodeFlag = this.slideShowRef.current.nodeFlag;
    //   this.status.push({
    //     count: this.count + 1,
    //     nodeFlag: nodeFlag,
    //     current: {
    //       name: this.slideShowRef.current.slide[Number(nodeFlag)].content.media.name,
    //       step: this.slideShowRef.current.slide[Number(nodeFlag)].step
    //     },
    //     next: {
    //       name: this.slideShowRef.current.slide[Number(!nodeFlag)].content.media.name,
    //       step: this.slideShowRef.current.slide[Number(!nodeFlag)].step
    //     },
    //     duration: timeCount * 200,
    //   });
    //   this.preTime = moment();
    //   this.count += 1;
    // }
    let { currentContentIndex, currentPlayList } = this.state;
    let currentContent = currentPlayList[currentContentIndex];
    let nextContent = currentPlayList[(currentContentIndex + 1) % currentPlayList.length];
    return (
      <SlideShow2 key={2} ref={this.slideShowRef} currentContent={currentContent} nextContent={nextContent} setNextContentCallback={this.setNextContentCallback.bind(this)} getDeviceDimensions={getDeviceDimensions}/>);
  }
}
