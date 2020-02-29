import React from 'react';
import {
	Text,
	View,
	Button,
	AsyncStorage,
} from 'react-native';
import locationStore from "../stores/locationStore";
import configStore from "../stores/configStore";
import {observer} from "mobx-react";
import authStore from "../stores/authStore";

@observer
export default class MrxLocationScreen extends React.Component {
	static navigationOptions = {
		title: 'Position senden',
	};

	render() {
		let position = JSON.stringify(locationStore);

		return <View>
			<Text>Standort senden</Text>
			<Text>Dev Mode: {__DEV__ ? 'ON' : 'OFF'}</Text>
			<Text>Team: {authStore.team ? authStore.team : '-'}</Text>
			<Text>Mr.X: {authStore.mrx ? authStore.mrx : '-'}</Text>
			<Text>Game Is Running: {configStore.config && configStore.config.game_is_running ? configStore.config.game_is_running : ''}</Text>
			<Text>{position}</Text>
		</View>;
	}
}
