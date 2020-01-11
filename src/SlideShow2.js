import React from 'react';
import {View} from 'react-native';
import v1 from 'uuid/v1';
import _ from 'lodash';
import Slide2 from "./Slide2";
import { convertToReactAnimation, SUPPORTED_IMAGE } from './constants/constants';

class SlideShow2 extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
    this.nodeFlag = true;
    this.slide = [{}, {}];
    this.slideRef = [React.createRef(), React.createRef()];
    this.shouldSetContentForBackgroundVideo = false;
  }

  setContentForNextSlide() {
    this.shouldSetContentForBackgroundVideo = true;
    this.forceUpdate();
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setContentForNextSlide = _.once(() => {
      this.shouldSetContentForBackgroundVideo = true;
      this.forceUpdate();
    })

    this.nodeFlag = !this.nodeFlag;
  }

  render() {
    let {currentContent, backgroundContent, setNextContentCallback} = this.props;

    this.slide[Number(this.nodeFlag)] = {
      content: currentContent,
      step: 'current',
      cb: setNextContentCallback,
      animation: convertToReactAnimation(currentContent.effect),
      cbChangeState: this.setContentForNextSlide.bind(this),
    };
    this.slide[Number(!this.nodeFlag)] = {
      content: (this.shouldSetContentForBackgroundVideo || SUPPORTED_IMAGE.includes(currentContent.media.ext) ? backgroundContent : null),
      step: 'background',
      cb: null,
      cbChangeState: null,
    };
    this.shouldSetContentForBackgroundVideo = false;
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <Slide2 key={'slide0'}
                key2={'slide0'}
                content={this.slide[0].content}
                animation={this.slide[0].animation}
                step={this.slide[0].step}
                onFinish={this.slide[0].cb}
                onBeforeFinish={this.slide[0].cbChangeState}/>

        <Slide2 key={'slide1'}
                key2={'slide1'}
                content={this.slide[1].content}
                animation={this.slide[1].animation}
                step={this.slide[1].step}
                onFinish={this.slide[1].cb}
                onBeforeFinish={this.slide[1].cbChangeState}/>

      </View>
    );
  }
}

export default SlideShow2;
