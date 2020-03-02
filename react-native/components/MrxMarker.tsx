import * as React from 'react';
import {IMrx} from "../interfaces/IMrx";
import {Callout, Marker, Polyline} from "react-native-maps";
import {View, Text} from "react-native";
import styled from 'styled-components/native';

const CalloutView = styled.View`
	width: 300px;
`;
const CalloutTitle = styled.Text`
	font-weight: bold;
	font-size: 18px;
`;

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

export default MrxMarker;
