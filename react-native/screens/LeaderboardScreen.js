import React from 'react';
import {
	ScrollView,
	Text,
	RefreshControl,
	ActivityIndicator,
	View,
	Image,
} from 'react-native';
import styled from 'styled-components'
import {observer} from "mobx-react";
import teamStore from "../stores/teamStore";
import distinctColor from "../helpers/distinctColor";
import authStore from "../stores/authStore";
import configStore from "../stores/configStore";

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
	background-color: ${props => props.tid == authStore.team ? '#eee' : '#fff'};
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
	background-color: ${props => props.color};
	border-radius: 10px;
	margin-right: 5px;
	margin-top: 15px;
`;

const TeamNameText = styled.Text`
	line-height: 20px;
	padding: 10px 0;
	font-size: 16px;
	font-weight: ${props => props.tid == authStore.team ? 'bold' : 'normal'};
`;

const TeamScoreText = styled.Text`
	line-height: 20px;
	padding: 10px 0;
	font-size: 16px;
	align-self: flex-end;
	border-radius: 10px;
	font-weight: ${props => props.tid == authStore.team ? 'bold' : 'normal'};
`;
const LeaderboardDeactivatedTitle = styled.Text`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 20px;
`;

@observer
export default class LeaderboardScreen extends React.Component {

	static navigationOptions = ({navigation}) => {
		return {
			title: 'Rangliste'
		};
	};

	constructor(props) {
		super(props);
		this.onRefresh = this.onRefresh.bind(this);
	}

	componentDidMount() {
		teamStore.reload();
		configStore.reload();
	}

	onRefresh() {
		teamStore.reload();
		configStore.reload();
	}

	render() {
		if (teamStore.isLoading) {
			return (
				<View style={{flex: 1, padding: 20}}>
					<ActivityIndicator/>
				</View>
			)
		}

		return (
			<LeaderboardContainer>
				{
					configStore.config.show_team_points
				?
						<ScrollView
							refreshControl={
								<RefreshControl refreshing={this.isLoading} onRefresh={this.onRefresh}/>
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
												<TeamColor color={distinctColor(team.t_ID)}/>
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

