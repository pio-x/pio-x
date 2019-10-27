import React from 'react';
import {
	Text,
	View,
	Button,
	AsyncStorage,
	TextInput,
} from 'react-native';
import { connect } from 'react-redux';

import styled from 'styled-components'

const LoginInput = styled.TextInput`
	margin: 5px 20px;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ddd;
`;

class SignInScreen extends React.Component {
	static navigationOptions = {
		title: 'Login',
	};

	constructor(props) {
		super(props);
		this.state = {
			team: '5',
			hash: 'DreiradJustizirrtumentdecken',
			api_url: 'https://api.pio-x.ch',
		};
	}

	render() {
		return (
			<View style={{paddingTop: 10}}>
				<LoginInput
					onChangeText={(team) => this.setState({team})}
					value={this.state.team}
					placeholder="Team ID"
				/>
				<LoginInput
					onChangeText={(hash) => this.setState({hash})}
					value={this.state.hash}
					placeholder="Team Passwort"
				/>
				<LoginInput
					onChangeText={(api_url) => this.setState({api_url})}
					value={this.state.api_url}
					placeholder="API URL"
				/>
				<Button title="Login" onPress={this.signInAsync}/>
			</View>
		);
	}

	signInAsync = async () => {
		await AsyncStorage.setItem('team', this.state.team);
		await AsyncStorage.setItem('hash', this.state.hash);
		await AsyncStorage.setItem('api_url', this.state.api_url);
		this.props.dispatch({
			type: 'SET_AUTH',
			team: this.state.team,
			hash: this.state.hash,
			api_url: this.state.api_url,
		});
		this.props.navigation.navigate('App');
	};


}

const mapStateToProps = function (state) {
	return {
		auth: state.auth
	}
};

export default connect(mapStateToProps)(SignInScreen);
