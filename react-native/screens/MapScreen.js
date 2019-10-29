import React from 'react';
import {
	Button,
	Text,
	View,
	AsyncStorage,
	TouchableWithoutFeedback,
	Platform
} from 'react-native';
import styled from 'styled-components'
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import { connectActionSheet } from '@expo/react-native-action-sheet'
import {connect} from "react-redux";
import { Ionicons } from '@expo/vector-icons';

function distinctColor(id) {
	if (id === null) {
		// empty station
		return '#bbbbbb';
	}
	// 32 distinct colors
	let colors = ['#f23e22', '#d1c51d', '#77baad', '#1d1dd1', '#eb2172', '#f0a599', '#b0ac71', '#24fff0', '#9999f0', '#e391a7', '#c96f4f', '#bbeb5b', '#1b9ebf', '#7654d6', '#f2223e', '#ed7321', '#94c981', '#9ee6f7', '#9122f2', '#c74e5e', '#ebb896', '#1ed41e', '#23b2fa', '#a672b3', '#b28046', '#23f794', '#1d65d1', '#f563ff', '#f0ab22', '#18ad7c', '#a3c8ff', '#e359b5']
	return colors[id % 32];
}

const CalloutView = styled.View`
	width: 300px;
`;
const CalloutTitle = styled.Text`
	font-weight: bold;
	font-size: 18px;
`;

const StationMarkerView = styled.View`
	width: 20px;
	height: 20px;
	background-color: ${props => props.color + '55'};
	border: 1px solid #000;
	border-radius: 20px;
`;

class StationMarker extends React.Component {
	render() {

		return <Marker
			coordinate={{
				latitude: this.props.station.pos_lat,
				longitude: this.props.station.pos_long,
			}}
			title={this.props.station.name}
			description={this.props.station.description}
			key={this.props.station.s_ID}
			tracksViewChanges={this.props.tracksViewChanges}
		>
			<StationMarkerView
				color={distinctColor(this.props.station.team)}
			/>
			<Callout>
				<CalloutView>
					<CalloutTitle>{this.props.station.name}</CalloutTitle>
					{this.props.station.team !== null
						? <Text>Diese Station gehört Team {this.props.station.team}</Text>
						: <Text>Diese Station gehört keinem Team</Text>
					}
				</CalloutView>
			</Callout>
		</Marker>
	}
}

class MrxMarker extends React.Component {
	formatTimestamp(timestamp) {
		let date = new Date(timestamp);
		let hours = date.getHours();
		let minutes = ("0" + date.getMinutes()).substr(-2);
		return hours + ':' + minutes;
	}

	render() {
		if (this.props.mrx.locations && this.props.mrx.locations.length > 0) {
			let trace = this.props.mrx.locations.map(loc => {
				return { latitude: loc.xpos_lat, longitude: loc.xpos_long }
			});

			return <React.Fragment>
				<Polyline
					coordinates={trace}
					strokeColor="#c1272dee"
					strokeColors={["#c1272dff","#c1272dcc","#c1272d33"]}
					strokeWidth={2}
				/>
				<Marker
					coordinate={{
						latitude: this.props.mrx.locations[0].xpos_lat,
						longitude: this.props.mrx.locations[0].xpos_long,
					}}
					title={this.props.mrx.name}
					key={this.props.mrx.x_ID}
					image={require('../assets/mrx.png')}
					tracksViewChanges={this.props.tracksViewChanges}
				>
					<Callout>
						<CalloutView>
							<CalloutTitle>{this.props.mrx.name}</CalloutTitle>
							{this.props.mrx.locations.map(loc => (
								<View key={loc.timestamp}>
									<Text>{this.formatTimestamp(loc.timestamp)} - {loc.description}</Text>
								</View>
							))}
						</CalloutView>
					</Callout>
				</Marker>
			</React.Fragment>
		} else {
			return null;
		}
	}
}

class MapScreen extends React.Component {

	static navigationOptions = ({navigation}) => {
		return {
			title: 'Karte',
			headerRight: (
				<TouchableWithoutFeedback onPress={navigation.getParam('showmenu')}>
					<View style={{paddingRight: 20}}>
						<Ionicons name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'} size={26} color="#888"/>
					</View>
				</TouchableWithoutFeedback>
			),
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			stations: [],
			mrx: [],
			tracksViewChanges: true,
		}
	}

	componentDidMount() {
		this.props.navigation.setParams({
			showmenu: this.showActionSheet.bind(this)
		});
		this.loadData();
	}

	showActionSheet() {
		this.props.showActionSheetWithOptions(
			{
				options: ['Abbrechen', 'Aktualisieren', 'Abmelden'],
				destructiveButtonIndex: 2,
				cancelButtonIndex: 0,
			},
			(buttonIndex) => {
				if (buttonIndex === 1) {
					this.loadData();
				}
				if (buttonIndex === 2) {
					this.signOutAsync();
				}
			}
		);
	}

	loadData() {
		this.loadStations();
		this.loadMrx();
	}

	loadStations() {
		return fetch(this.props.auth.api_url + '/station?hash=' + this.props.auth.hash)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					...this.state,
					stations: responseJson,
					//stations: responseJson.slice(0, 10),
				});

			})
			.catch((error) => {
				console.error(error);
			});
	}

	loadMrx() {
		return fetch(this.props.auth.api_url + '/mrx?hash=' + this.props.auth.hash)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					...this.state,
					mrx: responseJson,
				});

			})
			.catch((error) => {
				console.error(error);
			});
	}

	signOutAsync = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};

	render() {
		return <View style={{flex: 1}}>
			<MapView style={{flex: 1}}
					 initialRegion={{
						 latitude: 47.4974253,
						 longitude: 8.72199282,
						 latitudeDelta: 0.03,
						 longitudeDelta: 0.02,
					 }}
			>
				{this.state.stations.map(station => (
					<StationMarker
						station={station}
						key={station.s_ID}
						tracksViewChanges={this.state.tracksViewChanges}
					/>
				))}
				{this.state.mrx.map(mrx => (
					<MrxMarker
						mrx={mrx}
						key={mrx.x_ID}
						tracksViewChanges={this.state.tracksViewChanges}
					/>
				))}
			</MapView>
			<View
				style={{
					position: 'absolute', // use absolute position to show button on top of the map
					top: '0%',
					alignSelf: 'flex-end' // for align to right
				}}
			>
				<Button
					title={'Tracking ' + (this.state.tracksViewChanges ? 'ON' : 'OFF')}
					onPress={() => this.setState((state) => {
						return {
							...state,
							tracksViewChanges: !state.tracksViewChanges
						}
					})}
				/>
			</View>
		</View>;
	}
}

const ConnectedMapScreen = connectActionSheet(MapScreen);

const mapStateToProps = function (state) {
	return {
		auth: state.auth
	}
};

export default connect(mapStateToProps)(ConnectedMapScreen);
