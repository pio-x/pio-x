import React from 'react';
import {
	ScrollView,
	Text,
	RefreshControl,
	View,
} from 'react-native';
import styled from 'styled-components/native';
import {observer} from "mobx-react";
import teamStore from "../stores/teamStore";
import distinctColor from "../helpers/distinctColor";
import authStore from "../stores/authStore";
import configStore from "../stores/configStore";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";
import Colors from "../constants/Colors";

const LeaderboardContainer = styled.View`
	background-color:#fff;
	flex: 1;
`;

const TeamRow = styled.View`
	padding: 5px 20px;
	flex: 1;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;
	border-bottom-color: #eee;
	border-bottom-width: 1px;
	background-color: ${(props: {tid: number}) => props.tid == authStore.team ? Colors.tintColor : '#fff'};
`;

const TeamImage = styled.Image`
	width: 40px;
	height: 40px;
	border-radius: 20px;
`;

const TeamName = styled.View`
	padding-left: 10px;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;
`;

const TeamColor = styled.View`
	width: 10px;
	height: 10px;
	background-color: ${(props: {tid: number, color: string}) => props.tid == authStore.team ? '#00BD00' : props.color};
	border-radius: 10px;
	margin-right: 5px;
	margin-top: 15px;
`;

const TeamNameText = styled.Text`
	color: ${(props: {tid: number}) => props.tid == authStore.team ? '#fff' : '#000'};
	line-height: 20px;
	padding: 10px 0;
	font-size: 16px;
	font-weight: ${(props: {tid: number}) => props.tid == authStore.team ? 'bold' : 'normal'};
`;

const TeamScoreText = styled.Text`
	color: ${(props: {tid: number}) => props.tid == authStore.team ? '#fff' : '#000'};
	line-height: 20px;
	padding: 10px 0;
	font-size: 16px;
	align-self: flex-end;
	border-radius: 10px;
	font-weight: ${(props: {tid: number}) => props.tid == authStore.team ? 'bold' : 'normal'};
`;
const LeaderboardDeactivatedTitle = styled.Text`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 20px;
`;

interface ILeaderboardScreenProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class LeaderboardScreen extends React.Component<ILeaderboardScreenProps> {

	static navigationOptions = ({navigation}: any) => {
		return {
			title: 'Rangliste'
		};
	};

	readonly state: {
		isLoading: boolean;
	} = {
		isLoading: false,
	};

	constructor(props: ILeaderboardScreenProps) {
		super(props);
		this.onRefresh = this.onRefresh.bind(this);
	}

	componentDidMount() {
		teamStore.reload();
		configStore.reload();
	}

	onRefresh() {
		teamStore.reload().then(() => {
			this.setState({ isLoading: false })
		});
		configStore.reload();
	}

	render() {
		return (
			<LeaderboardContainer>
				{
					configStore.config.show_team_points
				?
						<ScrollView
							refreshControl={
								<RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh}/>
							}>
							{teamStore.teams.map((team, i) => {
								return (
									<TeamRow key={team.t_ID} tid={team.t_ID}>
										<View style={{flex: 1}}>
											<TeamImage
												source={{uri: authStore.api_url + '/uploaded_images/' + team.img_ID + '.jpg'}}
											/>
										</View>
										<View style={{flex: 6}}>
											<TeamName>
												<TeamColor color={distinctColor(team.t_ID)} tid={team.t_ID}/>
												<TeamNameText tid={team.t_ID}>{team.name}</TeamNameText>
											</TeamName>
										</View>
										<View style={{flex: 2}}>
											<TeamScoreText tid={team.t_ID}>{team.score}</TeamScoreText>
										</View>
									</TeamRow>
								);
							})}
						</ScrollView>
				:
						<View style={{padding: 20}}>
							<LeaderboardDeactivatedTitle>Die Rangliste ist deaktiviert</LeaderboardDeactivatedTitle>
							<Text>Das Schlussresultat erfahrt ihr bei der Rangverkündigung.</Text>
						</View>
				}
			</LeaderboardContainer>
		);
	}
}
