import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MessagesScreen from "../screens/MessagesScreen";
import InfosScreen from "../screens/InfosScreen";
import RiddlesScreen from "../screens/RiddlesScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/Colors";

const config = Platform.select({
	web: {headerMode: 'screen'},
	default: {},
});

const MapStack = createStackNavigator(
	{
		Map: MapScreen,
	},
	config
);

MapStack.navigationOptions = {
	tabBarLabel: 'Karte',
	tabBarIcon: ({focused}) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}/>
	),
	tabBarOptions: {
		activeTintColor: Colors.tabIconSelected,
		inactiveTintColor: Colors.tabIconDefault,
	},
};

MapStack.path = '';


const LeaderboardStack = createStackNavigator(
	{
		Leaderboard: LeaderboardScreen,
	},
	config
);

LeaderboardStack.navigationOptions = {
	tabBarLabel: 'Rangliste',
	tabBarIcon: ({focused}) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'}/>
	),
	tabBarOptions: {
		activeTintColor: Colors.tabIconSelected,
		inactiveTintColor: Colors.tabIconDefault,
	},
};

LeaderboardStack.path = '';


const RiddlesStack = createStackNavigator(
	{
		Riddles: RiddlesScreen,
	},
	config
);

RiddlesStack.navigationOptions = {
	tabBarLabel: 'Rätsel',
	tabBarIcon: ({focused}) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-key' : 'md-key'}/>
	),
	tabBarOptions: {
		activeTintColor: Colors.tabIconSelected,
		inactiveTintColor: Colors.tabIconDefault,
	},
};

RiddlesStack.path = '';


const InfosStack = createStackNavigator(
	{
		Infos: InfosScreen,
	},
	config
);

InfosStack.navigationOptions = {
	tabBarLabel: 'Infos',
	tabBarIcon: ({focused}) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}/>
	),
	tabBarOptions: {
		activeTintColor: Colors.tabIconSelected,
		inactiveTintColor: Colors.tabIconDefault,
	},
};

InfosStack.path = '';


const MessagesStack = createStackNavigator(
	{
		Messages: MessagesScreen,
	},
	config
);

MessagesStack.navigationOptions = {
	tabBarLabel: 'Nachrichten',
	tabBarIcon: ({focused}) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-megaphone' : 'md-megaphone'}/>
	),
	tabBarOptions: {
		activeTintColor: Colors.tabIconSelected,
		inactiveTintColor: Colors.tabIconDefault,
	},
};

MessagesStack.path = '';


const tabNavigator = createBottomTabNavigator({
	MapStack,
	LeaderboardStack,
	RiddlesStack,
	InfosStack,
	MessagesStack,
});

tabNavigator.path = '';

export default tabNavigator;
