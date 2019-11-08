import React from 'react';
import {
	Text,
	View,
	Button,
	AsyncStorage,
	TextInput,
} from 'react-native';
import authStore from "../stores/authStore";

import styled from 'styled-components'
import {observer} from "mobx-react";

const LoginInput = styled.TextInput`
	margin: 5px 20px;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ddd;
`;

const LoginFailedText = styled.Text`
	margin: 5px 20px;
	color: red;
	text-align: center;
`;

@observer
export default class SignInScreen extends React.Component {
	static navigationOptions = {
		title: 'Login',
	};

	constructor(props) {
		super(props);
		this.state = {
			team: '5',
			hash: 'DreiradJustizirrtumentdecken',
			api_url: 'https://api.pio-x.ch',
			show_login_error_message: false
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
				<View style={{padding: 20}}>
					<Button title="Login" onPress={() => {this.signInAsync()}}/>
				</View>
				{this.state.show_login_error_message ? <LoginFailedText>Login fehlgeschlagen</LoginFailedText> : null}
			</View>
		);
	}

	async signInAsync() {
		this.setState({
			show_login_error_message: false
		});
		try {
			await this.verifyCredentials();
			await AsyncStorage.setItem('team', this.state.team);
			await AsyncStorage.setItem('hash', this.state.hash);
			await AsyncStorage.setItem('api_url', this.state.api_url);
			authStore.authenticate(this.state.team, this.state.hash, this.state.api_url);
			this.props.navigation.navigate('App');
		} catch (e) {
			this.setState({
				show_login_error_message: true
			});
		}
	};

	async verifyCredentials() {
		return new Promise((resolve, reject) => {
			fetch(this.state.api_url + '/config?hash=' + this.state.hash)
				.then((response) => {
					console.log(response.status);
					if (response.status === 200) {
						resolve()
					} else {
						reject();
					}
				})
				.catch((error) => {
					reject()
				});
		})
	}

}
