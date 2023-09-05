import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import * as  Font from 'expo-font';

import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';
import PostsScreen from './Screens/PostsScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePostsScreen from './secondaryScreens/CreatePostsScreen';
import ProfileScreen from './secondaryScreens/ProfileScreen';
import MapScreen from './secondaryScreens/MapScreen';
import CommentsScreen from './secondaryScreens/CommentsScreen';



 const MainStack = createNativeStackNavigator();

export default function App() {
 
   const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Roboto: require('./assets/font/Roboto-Regular.ttf'),
        });
      } catch (error) {
        console.warn('Error loading assets:', error);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  return (
      <NavigationContainer>
        <MainStack.Navigator initialRouteName='PostScren' screenOptions={{ headerShown: false }}>
          <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Registration" component={RegistrationScreen} />
        <MainStack.Screen name="PostScren" component={PostsScreen} />
        <MainStack.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
        <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
        <MainStack.Screen name="Map" component={MapScreen} />
        <MainStack.Screen name="Comments" component={CommentsScreen}/>
          </MainStack.Navigator>
     </NavigationContainer>
  );
}

