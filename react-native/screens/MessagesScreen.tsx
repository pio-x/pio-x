import React from 'react';
import {
	ScrollView,
	Text,
	RefreshControl,
	ActivityIndicator,
	View,
} from 'react-native';
import styled from 'styled-components/native';
import {observer} from "mobx-react";
import authStore from "../stores/authStore";
import {INotification} from "../interfaces/INotification";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";

const MessageContainer = styled.View`
	margin: 0 10px 10px 10px;
	padding: 20px;
	background-color:#fff;
	box-shadow: 0 2px 2px #00000055;
	elevation: 2;
	border-radius: 5px;
`;

const MessageTitle = styled.Text`
	font-size: 20px;
	margin-bottom: 10px;
`;

const MessageTime = styled.Text`
	color: #aaa;
	margin-top: 10px;
`;

const MessagesList = styled.View`
	flex: 1;
	background-color:#fff;
`;

interface IMessageBoxProps {
	message: INotification;
}

class MessageBox extends React.Component<IMessageBoxProps> {
	render() {
		let date = new Date(this.props.message.timestamp * 1000);
		// Hours part from the timestamp
		let hours = "0" + date.getHours();
		// Minutes part from the timestamp
		let minutes = "0" + date.getMinutes();

		// Will display time in 10:30 format
		let formattedTime = hours.substr(-2) + ':' + minutes.substr(-2);

		return <MessageContainer>
			<View>
				<MessageTitle>
					{this.props.message.title}
				</MessageTitle>
				<Text>
					{this.props.message.text}
				</Text>
				<MessageTime>
					{formattedTime}
				</MessageTime>
			</View>
		</MessageContainer>;
	}
}

interface IMessagesScreenProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class MessagesScreen extends React.Component<IMessagesScreenProps> {

	static navigationOptions = ({navigation}: any) => {
		return {
			title: 'Nachrichten'
		};
	};

	readonly state: {
		isLoading: boolean;
		notifications: INotification[];
	} = {
		isLoading: true,
		notifications: [],
	};

	constructor(props: IMessagesScreenProps) {
		super(props);
		this.onRefresh = this.onRefresh.bind(this);
	}

	loadData() {
		this.setState({
			isLoading: true,
			notifications: [],
		});
		return fetch(authStore.api_url + '/notification?hash=' + authStore.hash)
			.then((response) => response.json())
			.then((responseJson) => {

				this.setState({
					isLoading: false,
					notifications: responseJson,
				});

			})
			.catch((error) => {
				console.error(error);
			});
	}

	componentDidMount() {
		this.loadData();
	}

	onRefresh() {
		this.loadData();
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{flex: 1, padding: 20}}>
					<ActivityIndicator/>
				</View>
			)
		}

		return (
			<MessagesList>
				<ScrollView
					style={{ flex: 1, backgroundColor: '#fff' }}
					contentContainerStyle={{ paddingTop: 20 }}
					refreshControl={
						<RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh}/>
					}>
					{this.state.notifications.map((message, i) => {
						return <MessageBox message={message} key={i}></MessageBox>
					})}
				</ScrollView>
			</MessagesList>
		);
	}
}
