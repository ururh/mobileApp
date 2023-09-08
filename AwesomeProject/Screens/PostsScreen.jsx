import React from "react";
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "../secondaryScreens/CreatePostsScreen";
import ProfileScreen from "../secondaryScreens/ProfileScreen";
import Home from "../secondaryScreens/Home";

import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

export default function PostsScreen() {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <Tabs.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: { height: 80, justifyContent: 'center' },
      headerTitleAlign: 'center',

      headerRightContainerStyle: styles.headerRightContainer,
      headerLeftContainerStyle: styles.headerLeftContainer,
    }}>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          title: "Публікації",
          headerShown: true,
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.tabBarIconContainer, { backgroundColor: focused ? '#FFFFFF' : 'transparent' }]}>
              <Ionicons
                name="grid-outline"
                size={20}
                color={focused ? '#FF6C00' : '#212121'}
                strokeOpacity={0.8}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
              <Feather name="log-out" size={24} color={'#BDBDBD'} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ size }) => (
            <View style={[styles.tabBarIconContainer, { backgroundColor: '#FF6C00' }]}>
              <AntDesign
                name="plus"
                size={size}
                color={'#FFFFFF'}
                fillOpacity={0.8}
                fill={'#FFFFFF'}
              />
            </View>
          ),
          headerLeft: ({ color }) => (
            <TouchableOpacity onPress={handleGoBack}>
              <AntDesign name="arrowleft" size={24} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <View style={styles.tabBarIconContainer}>
              <Feather
                name="user"
                size={size}
                color={focused ? '#FF6C00' : '#212121'}
                stroke={'#212121'}
              />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 40,
    borderRadius: 20,
  },
  headerRightContainer: {
    paddingRight: 16,
    paddingBottom: 9,
  },
  headerLeftContainer: {
    paddingLeft: 16,
    paddingBottom: 9,
  },
});