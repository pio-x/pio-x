import * as React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import * as Permissions from 'expo-permissions';
import styled from 'styled-components/native';
import {BarCodeScanner} from 'expo-barcode-scanner';

const MessageText = styled.Text`
	margin: 20px;
	color: #aaa;
	text-align: center;
`;

interface IQRCodeScannerProps {
	onScan(data: string): void;
}

export default class QRCodeScanner extends React.Component<IQRCodeScannerProps> {
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

	handleBarCodeScanned = ({type, data}: {type: number, data: string}) => {
		this.setState({scanned: true});
		this.props.onScan(data);
		//alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};
}