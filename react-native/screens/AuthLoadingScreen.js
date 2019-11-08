import React from 'react';
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native';
import {observer} from "mobx-react";

import authStore from "../stores/authStore";

@observer
export default class AuthLoadingScreen extends React.Component {
	componentDidMount() {
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		let team = null;
		let hash = null;
		let api_url = null;
		try {
			team = await AsyncStorage.getItem('team');
			hash = await AsyncStorage.getItem('hash');
			api_url = await AsyncStorage.getItem('api_url');
		} catch (e) {}

		if (team && hash && api_url) {
			authStore.authenticate(team, hash, api_url);
			this.props.navigation.navigate('App');
		} else {
			this.props.navigation.navigate('Auth');
		}
	};

	// Render any loading content that you like here
	render() {
		return (
			<View>
				<ActivityIndicator/>
				<StatusBar barStyle="default"/>
			</View>
		);
	}
}
