import React from 'react';
import {
	Text,
	View,
	AsyncStorage,
	TouchableWithoutFeedback,
	Platform
} from 'react-native';
import styled from 'styled-components/native';
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import { connectActionSheet } from '@expo/react-native-action-sheet'
import { Ionicons } from '@expo/vector-icons';
import LocationService from "../services/LocationService";
import {observer} from "mobx-react";
import mapStore from "../stores/mapStore";
import locationStore from "../stores/locationStore";
import teamStore from "../stores/teamStore";
import distanceTo from "../helpers/distanceTo";
import distinctColor from "../helpers/distinctColor";
import syncManager from "../services/SyncManager";
import configStore from "../stores/configStore";
import authStore from "../stores/authStore";
import {IMrx} from "../interfaces/IMrx";
import {IStation} from "../interfaces/IStation";
import {Context} from "@expo/react-native-action-sheet/lib/typescript/context";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";

const CalloutView = styled.View`
	width: 300px;
`;
const CalloutTitle = styled.Text`
	font-weight: bold;
	font-size: 18px;
`;

interface IStationMarkerViewProps {
	tid: number;
	color: string;
}

const StationMarkerView = styled.View`
	width: 20px;
	height: 20px;
	background-color: ${(props: IStationMarkerViewProps) => authStore.isTeam && props.tid == authStore.team ? '#00BD00aa' : props.color + '88'};
	border: ${(props: IStationMarkerViewProps) => authStore.isTeam && props.tid == authStore.team ? '2px solid #007100' : '1px solid #000'};
	border-radius: 20px;
`;

const CurrentPositionMarkerView = styled.View`
	width: 20px;
	height: 20px;
	background-color: #4385f4;
	border: 2px solid #fff;
	border-radius: 20px;
`;

const CurrentPositionMarkerGlowView = styled.View`
	width: 32px;
	height: 32px;
	padding: 6px;
	background-color: #4385f455;
	border-radius: 32px;
`;

interface IStationMarkerProps {
	tracksViewChanges: boolean;
	station: IStation;
}

@observer
class StationMarker extends React.Component<IStationMarkerProps> {
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
				tid={this.props.station.team}
			/>
			<Callout>
				<CalloutView>
					<CalloutTitle>{this.props.station.name}</CalloutTitle>
					{this.props.station.team !== null && teamStore.teamsById[this.props.station.team]
						?
						authStore.team && this.props.station.team == authStore.team
							? <Text>Diese Station gehört deinem Team.</Text>
							: <Text>Diese Station gehört Team {this.props.station.team} {teamStore.teamsById[this.props.station.team].name}</Text>
						: <Text>Diese Station gehört keinem Team</Text>
					}
					<Text>{distanceTo(locationStore.lat, locationStore.long, this.props.station.pos_lat, this.props.station.pos_long) + 'm entfernt'}</Text>
				</CalloutView>
			</Callout>
		</Marker>
	}
}

interface IMrxMarkerProps {
	tracksViewChanges: boolean;
	mrx: IMrx;
}

class MrxMarker extends React.Component<IMrxMarkerProps> {
	formatTimestamp(timestamp: string) {
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
					anchor={{x: 0.5, y: 0.5}}
					zIndex={5}
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


interface IMapScreenProps extends Context {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
class MapScreen extends React.Component<IMapScreenProps> {

	static navigationOptions = ({navigation}: any) => {
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

	readonly state: {
		tracksViewChanges: boolean;
	} = {
		tracksViewChanges: false
	};

	componentDidMount() {
		this.props.navigation.setParams({
			showmenu: this.showActionSheet.bind(this)
		});

		// make sure location service is started
		LocationService.getInstance();

		// start sync
		syncManager.startSync();
	}

	showActionSheet() {
		this.props.showActionSheetWithOptions(
			{
				options: ['Abbrechen', 'Aktualisieren', 'Abmelden'],
				destructiveButtonIndex: 2,
				cancelButtonIndex: 0,
			},
			(buttonIndex: number) => {
				if (buttonIndex === 1) {
					mapStore.reload();
					teamStore.reload();
					configStore.reload();
				}
				if (buttonIndex === 2) {
					this.signOutAsync();
				}
			}
		);
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
				{mapStore.stations.map(station => (
					<StationMarker
						station={station}
						key={station.s_ID}
						tracksViewChanges={this.state.tracksViewChanges}
					/>
				))}
				{mapStore.mrx.map(mrx => (
					<MrxMarker
						mrx={mrx}
						key={mrx.x_ID}
						tracksViewChanges={this.state.tracksViewChanges}
					/>
				))}
				{locationStore.lat && locationStore.long ? <Marker
					coordinate={{
						latitude: locationStore.lat,
						longitude: locationStore.long,
					}}
					zIndex={10}
					tracksViewChanges={this.state.tracksViewChanges}
					>
						<CurrentPositionMarkerGlowView>
							<CurrentPositionMarkerView/>
						</CurrentPositionMarkerGlowView>
					</Marker>
				: null}
			</MapView>
			{/*
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
			*/}
		</View>;
	}
}

const ConnectedMapScreen = connectActionSheet(MapScreen);

export default ConnectedMapScreen;
