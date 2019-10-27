import React from 'react';
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native';
import { connect } from 'react-redux';

class AuthLoadingScreen extends React.Component {
	componentDidMount() {
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		const team = await AsyncStorage.getItem('team');
		const hash = await AsyncStorage.getItem('hash');
		const api_url = await AsyncStorage.getItem('api_url');

		if (team && hash && api_url) {
			this.props.dispatch({
				type: 'SET_AUTH',
				team: team,
				hash: hash,
				api_url: api_url,
			});
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

const mapStateToProps = function (state) {
	return {
		auth: state.auth
	}
};

export default connect(mapStateToProps)(AuthLoadingScreen);
