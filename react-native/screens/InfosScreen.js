import React from 'react';
import {
	Text,
	View,
} from 'react-native';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';

import styled from 'styled-components'

class InfosScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			htmlInfos: 'Infos werden geladen...'
		};
	}

	static navigationOptions = ({navigation}) => {
		return {
			title: 'Infos'
		};
	};

	wrapHtml(content) {
		let page = '';
		page += `<!doctype html>
				<html lang="en">
					<head>
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
						<style>
						body {
							font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
						}
						</style>
					</head>
					<body>
					${content}
					</body>
				</html>`;
		return page;
	}

	loadData() {
		this.setState({
			htmlInfos: 'Infos werden geladen...'
		});
		return fetch(this.props.auth.api_url + '/config?hash=' + this.props.auth.hash)
			.then((response) => response.json())
			.then((responseJson) => {

				if (responseJson && responseJson.info_text) {
					this.setState({
						htmlInfos: responseJson.info_text
					});
				} else {
					this.setState({
						htmlInfos: 'Infos konnten nicht geladen werden :('
					});
				}

			})
			.catch((error) => {
				console.error(error);
			});
	}

	componentDidMount() {
		this.loadData();
	}

	render() {
		return <View style={{flex: 1}}>
			<WebView
				style={{flex: 1}}
				originWhitelist={['*']}
				source={{html: this.wrapHtml(this.state.htmlInfos)}}
			/>
		</View>
	}
}

const mapStateToProps = function (state) {
	return {
		auth: state.auth
	}
};

export default connect(mapStateToProps)(InfosScreen);
