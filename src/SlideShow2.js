import React from 'react';
import {View} from 'react-native';
import v1 from 'uuid/v1';
import Slide2 from "./Slide2";

class SlideShow2 extends React.Component {
  static propTypes = {};

  lastCurrentContent = null;
  count = 0;

  constructor(props) {
    super(props);

    this.nodeFlag = true;
    this.slide = [{}, {}];
  }

  render() {
    let {currentContent, backgroundContent, setNextContentCallback} = this.props;
    const getKey = (_currentContent) => {
      return v1();
    };
    let currentKey = getKey(currentContent);
    let backgroundKey = getKey(backgroundContent);
    //cached
    this.nodeFlag = !this.nodeFlag;
    this.slide[Number(this.nodeFlag)] = {
      key: currentKey,
      content: currentContent,
      step: 'current',
      cb: setNextContentCallback
    };
    this.slide[Number(!this.nodeFlag)] = {
      key: backgroundKey,
      content: backgroundContent,
      step: 'background',
      cb: null
    };
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <Slide2 key={'slide0'}
                key2={'slide0'}
                id={this.slide[0].key}
                content={this.slide[0].content}
                step={this.slide[0].step}
                onFinish={this.slide[0].cb}/>

        <Slide2 key={'slide1'}
                key2={'slide1'}
                id={this.slide[1].key}
                content={this.slide[1].content}
                step={this.slide[1].step}
                onFinish={this.slide[1].cb}/>

      </View>
    );
  }
}

export default SlideShow2;
