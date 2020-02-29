import React from 'react';
import {createAppContainer, createSwitchNavigator, createStackNavigator} from 'react-navigation';

import MainTabNavigatorTeam from './MainTabNavigatorTeam';
import MainTabNavigatorMrx from './MainTabNavigatorMrx';
import SignInScreen from "../screens/SignInScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

const AuthStack = createStackNavigator({SignIn: SignInScreen});

export default createAppContainer(
	createSwitchNavigator({
			AuthLoading: AuthLoadingScreen,
			AppTeam: MainTabNavigatorTeam,
			AppMrx: MainTabNavigatorMrx,
			Auth: AuthStack,
		},
		{
			initialRouteName: 'AuthLoading',
		})
);
