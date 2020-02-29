import React from 'react';
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	View,
} from 'react-native';
import {observer} from "mobx-react";

import authStore from "../stores/authStore";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";

interface IAuthLoadingScreenProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class AuthLoadingScreen extends React.Component<IAuthLoadingScreenProps> {
	componentDidMount() {
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		let team = null;
		let mrx = null;
		let hash = null;
		let api_url = null;
		try {
			team = await AsyncStorage.getItem('team');
			mrx = await AsyncStorage.getItem('mrx');
			hash = await AsyncStorage.getItem('hash');
			api_url = await AsyncStorage.getItem('api_url');
		} catch (e) {}

		if ((team || mrx) && hash && api_url) {
			authStore.authenticate(team, mrx, hash, api_url);
			if (team) {
				this.props.navigation.navigate('AppTeam');
			} else {
				this.props.navigation.navigate('AppMrx');
			}
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
