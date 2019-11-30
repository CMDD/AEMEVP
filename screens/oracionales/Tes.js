import React from 'react';
import {View, Text} from 'react-native';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <View>
        <Text>Text</Text>
      </View>
    );
  }
}
