import React from 'react';
import {
	ScrollView,
	Text,
	RefreshControl,
	ActivityIndicator,
	View,
} from 'react-native';
import styled from 'styled-components'
import {observer} from "mobx-react";
import teamStore from "../stores/teamStore";
import distinctColor from "../helpers/distinctColor";

const LeaderboardContainer = styled.View`
	background-color:#fff;
	flex: 1;
`;

const TeamRow = styled.View`
	padding: 10px 20px;
	flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    border-bottom-color: #eee;
    border-bottom-width: 1px;
`;

const TeamName = styled.View`
	width: 65%;
	padding-left: 10px;
`;

const TeamNameText = styled.Text`
	line-height: 20px;
	font-size: 16px;
`;

const TeamScore = styled.View`
	width: 25%;
`;

const TeamScoreText = styled.Text`
	flex: 1;
	text-align: right;
	line-height: 20px;
	font-size: 16px;
`;

const TeamColor = styled.View`
	width: 20px;
	height: 20px;
	background-color: ${props => props.color + '55'};
	border: 1px solid #000;
	border-radius: 20px;
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
	}

	onRefresh() {
		teamStore.reload();
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
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={this.isLoading} onRefresh={this.onRefresh}/>
					}>
					{teamStore.teams.map((team, i) => {
						return (
							<TeamRow key={team.t_ID}>
								<TeamColor color={distinctColor(team.t_ID)}/>
								<TeamName>
									<TeamNameText>{team.name}</TeamNameText>
								</TeamName>
								<TeamScore>
									<TeamScoreText>{team.score}</TeamScoreText>
								</TeamScore>
							</TeamRow>
						);
					})}
				</ScrollView>
			</LeaderboardContainer>
		);
	}
}

