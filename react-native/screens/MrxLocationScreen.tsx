import React from 'react';
import {
	Text,
	View,
	Button,
} from 'react-native';
import locationStore from "../stores/locationStore";
import {observer} from "mobx-react";
import MapView from 'react-native-maps';
import mapStore from "../stores/mapStore";
import MrxMarker from "../components/MrxMarker";
import styled from "styled-components/native";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";
import authStore from "../stores/authStore";

const FormTitle = styled.Text`
	font-weight: bold;
	font-size: 24px;
`;
const GpsLocationText = styled.Text`
	color: #ccc;
`;

interface IMrxLocationScreen {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class MrxLocationScreen extends React.Component<IMrxLocationScreen> {
	static navigationOptions = {
		title: 'Standort senden',
	};

	private map: React.RefObject<MapView>;

	constructor(props: any) {
		super(props);
		this.map = React.createRef();
	}

	componentDidMount() {
		this.moveMapLocationToUser();
		this.props.navigation.addListener('didFocus', () => {
			this.moveMapLocationToUser()
		})
	}

	moveMapLocationToUser() {
		// set view to current location
		if (this.map && this.map.current) {
			this.map.current.animateToRegion({
				latitude: locationStore.lat || 47.4974253,
				longitude: locationStore.long || 8.72199282,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			}, 1000);
		}
	}

	getMrxName(): string {
		let mrx = mapStore.mrx.filter(mrx => mrx.x_ID == authStore.mrx);
		let name: string = 'Mister X ' + authStore.mrx;
		if (mrx.length > 0) {
			name = mrx[0].name;
		}
		return name;
	}

	render() {
		return <View style={{flex: 1}}>
			<View style={{flex: 1}}>
				<MapView style={{flex: 1}}
						 initialRegion={{
						 	latitude: 47.4974253,
							longitude: 8.72199282,
							latitudeDelta: 0.005,
							longitudeDelta: 0.005,
						 }}
						 showsUserLocation={true}
						 ref={this.map}
				>
					{mapStore.mrx.map(mrx => (
						<MrxMarker
							mrx={mrx}
							key={mrx.x_ID}
							tracksViewChanges={false}
						/>
					))}
				</MapView>
			</View>
			<View style={{flex: 1, padding: 10}}>
				<FormTitle>Standort senden</FormTitle>
				<GpsLocationText>{locationStore.lat + ' / ' + locationStore.long}</GpsLocationText>
				<Text>Angemeldet als {this.getMrxName()}</Text>
			</View>
		</View>;
	}
}
