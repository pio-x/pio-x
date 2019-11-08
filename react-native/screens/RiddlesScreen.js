import React from 'react';
import {
	Text,
	View,
	Button,
	AsyncStorage,
} from 'react-native';
import locationStore from "../stores/locationStore";
import {observer} from "mobx-react";

@observer
export default class RiddlesScreen extends React.Component {
	static navigationOptions = {
		title: 'Rätsel',
	};

	render() {
		let position = JSON.stringify(locationStore);

		return <View>
			<Text>Rätsel</Text>
			<Text>Dev Mode: {__DEV__ ? 'ON' : 'OFF'}</Text>
			<Text>{position}</Text>
		</View>;
	}
}
