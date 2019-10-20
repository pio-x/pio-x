import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';
//import { WebView } from 'react-native-webview';

import styled from 'styled-components'

export default function InfosScreen() {
  return <View style={{ flex: 1 }}>
    <Text>Infos</Text>
    <WebView
      style={{ flex: 1, marginTop: 20 }}
      originWhitelist={['*']}
      source={{html: '<h1>Hello world</h1><br><br>not sure why, but this webview does not work'}}
    />
  </View>
}

InfosScreen.navigationOptions = {
  title: 'Infos',
};
