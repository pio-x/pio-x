import React from 'react';
import {
	Text,
	View,
} from 'react-native';
import {WebView} from 'react-native-webview';

import configStore from "../stores/configStore";
import {observer} from "mobx-react";

@observer
export default class InfosScreen extends React.Component {

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

	componentDidMount() {
		configStore.reload();
	}

	render() {
		return <View style={{flex: 1}}>
			<WebView
				style={{flex: 1}}
				originWhitelist={['*']}
				source={{html: this.wrapHtml(configStore.config && configStore.config.info_text ? configStore.config.info_text : 'Infos werden geladen...')}}
			/>
		</View>
	}
}
