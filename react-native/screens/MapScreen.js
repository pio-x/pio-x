import React from 'react';
import {
	Button,
	Text,
	View,
} from 'react-native';
import styled from 'styled-components'
import MapView, {Marker, Callout} from 'react-native-maps';
import {connect} from "react-redux";

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
	border: 1px solid ${props => props.color};
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

class MapScreen extends React.Component {

	static navigationOptions = ({navigation}) => {
		return {
			title: 'Karte',
			headerRight: (
				<Button
					onPress={navigation.getParam('refresh')}
					title="Aktualisieren"
					color="#888"
				/>
			),
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			stations: [],
			tracksViewChanges: true,
		}
	}

	componentDidMount() {
		this.props.navigation.setParams({refresh: this.loadData.bind(this)});
		this.loadData();
	}

	loadData() {
		return fetch(this.props.auth.api_url + '/station?hash=' + this.props.auth.hash)
			.then((response) => response.json())
			.then((responseJson) => {

				this.setState({
					isLoading: false,
					stations: responseJson.slice(0, 10),
				});

			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return <View style={{flex: 1}}>
			<MapView style={{flex: 1}}
					 initialRegion={{
						 latitude: 47.4974253,
						 longitude: 8.72199282,
						 latitudeDelta: 0.0922,
						 longitudeDelta: 0.0421,
					 }}
			>
				{this.state.stations.map(station => (
					<StationMarker
						station={station}
						key={station.s_ID}
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

const mapStateToProps = function (state) {
	return {
		auth: state.auth
	}
};

export default connect(mapStateToProps)(MapScreen);
