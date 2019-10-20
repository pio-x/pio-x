import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';
import styled from 'styled-components'

export default function InfosScreen() {
  return <WebView
    style={{ flex: 1 }}
    originWhitelist={['*']}
    source={{html: '<h1>Hello world</h1><br><br>hallooo'}}
  />
}

InfosScreen.navigationOptions = {
  title: 'Infos',
};
