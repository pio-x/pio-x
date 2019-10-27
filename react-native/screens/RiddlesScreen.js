import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	AsyncStorage,
} from 'react-native';
import styled from 'styled-components'

export default class RiddlesScreen extends React.Component {
	static navigationOptions = {
		title: 'Rätsel',
	};

	render() {
		return <View>
			<Text>Rätsel</Text>
			<Text>Dev Mode: {__DEV__ ? 'ON' : 'OFF'}</Text>
			<Button title="Abmelden" onPress={this.signOutAsync}/>
		</View>;
	}

	signOutAsync = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};
}
