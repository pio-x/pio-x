import React from 'react';
import {
	Text,
	View,
	Button,
	AsyncStorage,
} from 'react-native';
import {connect} from "react-redux";

class RiddlesScreen extends React.Component {
	static navigationOptions = {
		title: 'Rätsel',
	};

	signOutAsync = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};

	render() {
		let position = JSON.stringify(this.props.location);

		return <View>
			<Text>Rätsel</Text>
			<Text>Dev Mode: {__DEV__ ? 'ON' : 'OFF'}</Text>
			<Text>{position}</Text>
			<Button title="Abmelden" onPress={this.signOutAsync}/>
		</View>;
	}
}

const mapStateToProps = function (state) {
	return {
		location: state.location
	}
};

export default connect(mapStateToProps)(RiddlesScreen);
