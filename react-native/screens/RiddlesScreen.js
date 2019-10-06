import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components'

export default function RiddlesScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return <View>
    <Text>Rätsel</Text>
    <Text>Dev Mode: {__DEV__ ? 'ON' : 'OFF'}</Text>
  </View>;
}

RiddlesScreen.navigationOptions = {
  title: 'Rätsel',
};
