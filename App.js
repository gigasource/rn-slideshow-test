/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import moment from 'moment';
import SlideShow2 from './src/SlideShow2';
import View from 'react-native-web/dist/exports/View';
import Text from 'react-native-web/dist/exports/Text';

export default class TestApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPlayList: [{ media: { name: 'src1', src: require('./assets/video1.mp4'), ext: '.mp4' }, effect: 'slideInLeft', duration: 3000 },
        { media: { name: 'src2', src: require('./assets/video2.mp4'), ext: '.mp4' }, effect: 'slideInLeft', duration: 3000 },
        { media: { name: 'src3', src: require('./assets/img3.jpeg'), ext: '.jpg' }, effect: 'slideInLeft', duration: 3000 },
        { media: { name: 'src4', src: require('./assets/img4.jpeg'), ext: '.jpg' }, effect: 'slideInLeft', duration: 3000 }],
      currentContentIndex: 0,
    }
    console.log(this.state.currentPlayList);
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
    return _time - _time % 10;
  }

  render() {
    //return (<View><Text>Test</Text></View>)
    if (this.slideShowRef.current) {
      if (!this.preTime) this.preTime = moment();
      this.status.push({
        count: this.count += 1,
        current: [this.slideShowRef.current.slide[0].content.media.name, this.slideShowRef.current.slide[1].content.media.name],
        duration: this.round(moment.duration(moment().diff(this.preTime)))
      });
      this.preTime = moment();
    }
    let { currentContentIndex, currentPlayList } = this.state;
    let currentContent = currentPlayList[currentContentIndex];
    let backgroundContent = currentPlayList[(currentContentIndex + 1) % currentPlayList.length];
    return (
      <SlideShow2 key={2} ref={this.slideShowRef} currentContent={currentContent} backgroundContent={backgroundContent} setNextContentCallback={this.setNextContentCallback.bind(this)}/>);
  }
}
