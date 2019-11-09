import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import styled from 'styled-components'
import {BarCodeScanner} from 'expo-barcode-scanner';

const MessageText = styled.Text`
	margin: 20px;
	color: #aaa;
	text-align: center;
`;

export default class QRCodeScanner extends React.Component {
	state = {
		hasCameraPermission: null,
		scanned: false,
	};

	async componentDidMount() {
		this.getPermissionsAsync();
	}

	getPermissionsAsync = async () => {
		const {status} = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({hasCameraPermission: status === 'granted'});
	};

	render() {
		const {hasCameraPermission, scanned} = this.state;

		if (hasCameraPermission === null) {
			return <MessageText>Warte auf Kamerazugriff</MessageText>;
		}
		if (hasCameraPermission === false) {
			return <MessageText>Kein Zugriff auf die Kamera</MessageText>;
		}
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'flex-end',
				}}>
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>

				{scanned && (
					<Button title={'Nochmal scannen'} onPress={() => this.setState({scanned: false})}/>
				)}
			</View>
		);
	}

	handleBarCodeScanned = ({type, data}) => {
		this.setState({scanned: true});
		this.props.onScan(data);
		//alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};
}