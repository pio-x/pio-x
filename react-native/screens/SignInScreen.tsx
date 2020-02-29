import React from 'react';
import {
	Text,
	View,
	Button,
	AsyncStorage,
} from 'react-native';
import authStore from "../stores/authStore";

import styled from 'styled-components/native';
import {observer} from "mobx-react";
import QRCodeScanner from "../components/QRCodeScanner";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";

const ErrorMessageText = styled.Text`
	margin: 5px 20px;
	color: red;
	text-align: center;
`;

interface ISignInScreenProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class SignInScreen extends React.Component<ISignInScreenProps> {
	static navigationOptions = {
		title: 'Login',
	};

	readonly state: {
		team: string|null;
		mrx: string|null;
		hash: string|null;
		api_url: string|null;
		show_login_error_message: boolean;
		show_invalid_qr_message: boolean;
		show_scanner: boolean;
	} = {
		team: null,
		mrx: null,
		hash: null,
		api_url: null,
		show_login_error_message: false,
		show_invalid_qr_message: false,
		show_scanner: false
	};

	render() {
		return (
			this.state.show_scanner
				?
				<View style={{alignSelf: "stretch", height: 600}}>
					<QRCodeScanner onScan={(data: string) => {this.handleScan(data)}}></QRCodeScanner>
					<View style={{padding: 20}}>
						<Button title="Abbrechen" onPress={() => {this.setState({show_scanner: false})}}/>
					</View>
				</View>
				:
					<View style={{paddingTop: 10}}>
						<View style={{padding: 20}}>
							<Button title="QR Code scannen" onPress={() => {this.setState({show_scanner: true, show_invalid_qr_message: false})}}/>
						</View>
						<Text style={{textAlign: 'center', marginTop: 50, color: '#aaa'}}>Oder zum Testen:</Text>
						<View style={{padding: 20}}>
							<Button title="Login als Team" onPress={() => {this.signInAsExampleTeam()}}/>
						</View>
						<View style={{padding: 20}}>
							<Button title="Login als Mr.X" onPress={() => {this.signInAsExampleMrx()}}/>
						</View>
						{this.state.show_login_error_message ? <ErrorMessageText>Login fehlgeschlagen</ErrorMessageText> : null}
						{this.state.show_invalid_qr_message ? <ErrorMessageText>Ungültiger QR Code</ErrorMessageText> : null}
					</View>
		);
	}

	handleScan(url: string) {
		let regex = /[?&]([^=#]+)=([^&#]*)/g;
		let params: { [key: string]: string } = {};
		let match;
		while ((match = regex.exec(url))) {
			params[match[1]] = match[2];
		}
		if ((params['team'] || params['mrx']) && params['hash'] && params['api']) {
			this.setState({
				team: params['team'] || null,
				mrx: params['mrx'] || null,
				hash: params['hash'],
				api_url: params['api'],
			}, () => {
				this.signInAsync();
			});
		} else {
			this.setState({show_invalid_qr_message: true});
		}
		this.setState({show_scanner: false});
	}

	signInAsExampleTeam() {
		this.setState({
			team: '25',
			mrx: null,
			hash: 'schnupperndDrohenBuerohochhaeuser',
			api_url: 'https://api.pio-x.ch',
		}, () => {
			this.signInAsync();
		});
	}

	signInAsExampleMrx() {
		this.setState({
			team: null,
			mrx: '1',
			hash: 'versprecheGemeinschaft414geschweiften',
			api_url: 'https://api.pio-x.ch',
		}, () => {
			this.signInAsync();
		});
	}

	async signInAsync() {
		this.setState({
			show_login_error_message: false
		});
		try {
			await this.verifyCredentials();
			await AsyncStorage.setItem('team', this.state.team || '');
			await AsyncStorage.setItem('mrx', this.state.mrx || '');
			await AsyncStorage.setItem('hash', this.state.hash || '');
			await AsyncStorage.setItem('api_url', this.state.api_url || '');
			authStore.authenticate(this.state.team, this.state.mrx, this.state.hash, this.state.api_url);
			if (this.state.team) {
				this.props.navigation.navigate('AppTeam');
			} else {
				this.props.navigation.navigate('AppMrx');
			}
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
