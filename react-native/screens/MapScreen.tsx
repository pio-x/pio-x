import React from 'react';
import {
	Text,
	View,
	AsyncStorage,
	TouchableWithoutFeedback,
	Platform
} from 'react-native';
import styled from 'styled-components/native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {ActionSheetProps, connectActionSheet} from '@expo/react-native-action-sheet'
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
import {IStation} from "../interfaces/IStation";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";
import MrxMarker from "../components/MrxMarker";

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

interface IMapScreenProps extends ActionSheetProps {
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
					 showsUserLocation={true}
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
