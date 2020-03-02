import React from 'react';
import {
	Text,
	View,
	Button, TextInput, Keyboard, TouchableWithoutFeedback, ActivityIndicator,
} from 'react-native';
import locationStore from "../stores/locationStore";
import {observer} from "mobx-react";
import MapView from 'react-native-maps';
import mapStore from "../stores/mapStore";
import MrxMarker from "../components/MrxMarker";
import styled from "styled-components/native";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";
import authStore from "../stores/authStore";
import Colors from "../constants/Colors";

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

	readonly state: {
		description: string;
		isSending: boolean;
	} = {
		description: '',
		isSending: false
	};

	constructor(props: any) {
		super(props);
		this.map = React.createRef();
	}

	componentDidMount() {
		this.moveMapLocationToUser();
		this.props.navigation.addListener('didFocus', () => {
			this.moveMapLocationToUser();
			this.setState({isSending: false, description: ''});
		})
	}

	moveMapLocationToUser() {
		// set view to current location
		setTimeout(() => {
			try {
				if (this.map && this.map.current) {
					this.map.current.animateToRegion({
						latitude: locationStore.lat || 47.4974253,
						longitude: locationStore.long || 8.72199282,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					}, 1000);
				}
			} catch (e) {
				// ignore
			}
		}, 100)
	}

	getMrxName(): string {
		let mrx = mapStore.mrx.filter(mrx => mrx.x_ID == authStore.mrx);
		let name: string = 'Mister X ' + authStore.mrx;
		if (mrx.length > 0) {
			name = mrx[0].name;
		}
		return name;
	}

	sendLocation() {
		Keyboard.dismiss();
		this.setState({...this.state, isSending: true});
		fetch(authStore.api_url + '/mrx/' + authStore.mrx + '/location?hash=' + authStore.hash, {
			method: 'POST',
			body: JSON.stringify({
				description: this.state.description,
				location: {
					lat: locationStore.lat,
					lng: locationStore.long
				}
			})
		})
			.then((response) => {
				mapStore.loadMrx().then(() => {
					this.setState({isSending: false, description: ''});
				});
			})
			.catch((error) => {
				//console.error(error);
			});
	}

	render() {
		return <View style={{flex: 1}}>
			{ this.state.isSending
				? <View style={{flex: 1, paddingTop: 40}}>
					<ActivityIndicator size="large" color={Colors.tintColor} />
				</View>
				: <View style={{flex: 1, padding: 10}}>
					<Text>Gib hier einen kurzen Hinweis an, was du vorhast:</Text>
					<View style={{paddingTop: 10}}>
						<TextInput
						  style={{ height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 3 }}
						  onChangeText={text => this.setState({...this.state, description: text})}
						  value={this.state.description}
						/>
					</View>
					<View style={{paddingTop: 10}}>
						<Button title="Aktuellen Standort senden" onPress={() => {this.sendLocation()}}/>
					</View>
					<View style={{paddingTop: 10}}>
						<GpsLocationText>{locationStore.lat + ' / ' + locationStore.long}</GpsLocationText>
					</View>
					<View style={{paddingTop: 20}}>
						<Text>Angemeldet als {this.getMrxName()}</Text>
					</View>
				</View>
			}
			<View style={{flex: 1}}>
				<MapView style={{flex: 1}}
						 initialRegion={{
							latitude: 47.4974253,
							longitude: 8.72199282,
							latitudeDelta: 0.005,
							longitudeDelta: 0.005,
						 }}
						 showsUserLocation={true}
						 showsMyLocationButton={true}
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
		</View>;
	}
}
