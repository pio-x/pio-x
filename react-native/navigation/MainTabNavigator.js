import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MessagesScreen from "../screens/MessagesScreen";
import InfosScreen from "../screens/InfosScreen";
import RiddlesScreen from "../screens/RiddlesScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import MapScreen from "../screens/MapScreen";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

/*
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';
*/


const MapStack = createStackNavigator(
  {
    Map: MapScreen,
  },
  config
);

MapStack.navigationOptions = {
  tabBarLabel: 'Karte',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'} />
  ),
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
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'} />
  ),
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
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-key' : 'md-key'} />
  ),
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
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'} />
  ),
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
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-megaphone' : 'md-megaphone'} />
  ),
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
