import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import RoomScreen from "./containers/RoomScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import MyProfileScreen from "./containers/MyProfileScreen";
import SplashScreen from "./containers/SplashScreen";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { Button, Text, View, Image, StyleSheet } from "react-native";
import CustomGoback from "./components/CustomGoBack";
import { Feather } from "@expo/vector-icons";
import AroundMeScreen from "./containers/AroundMeScreen";
import HeaderLogo from "./components/HeaderLogo";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // gère l'ensemble des screens & permet d'avoir l'hsitorique du parcours de l'utilisateur

export default function App() {
  const [isLoading, setisLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setuserId] = useState(null);

  const setToken = async (token, id) => {
    if (token && id) {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", id); // stocker une clé non crypté synchrone qui sera global à toute l'app
    } else {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
    }

    // Recap :
    // Si token existe, la fonction AsyncStorage va stocker token dans la mémoire l'appareil de manière asynchrone donc
    //(elle ne bloque pas l'execution du reste du code pendant l'opération)
    // Si le token n'est pas défini : on va le supprimer de la mémoire avec .removeitem
    // => permet de savoir si le user est connecté ou non et si il est connecté sauvegarder son token

    setUserToken(token);
    setuserId(id);
    console.log("id from app.js", id);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      // ici on va crécupérer la valeur stockée dans AsyncStorage pour la clé userToken donc le token et je vais l'assigner à la variable usertoken

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);
      setuserId(userId);

      // mettre à jour le token

      setisLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {(props) => <SignInScreen {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{ headerShown: false }}>
              {(props) => <SignUpScreen {...props} setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons
                        name="house-siding"
                        size={24}
                        color="#EB5A62"
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerTitle: (props) => <HeaderLogo {...props} />,
                          headerStyle: {
                            backgroundColor: "white",
                          },
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Room"
                        options={{
                          headerTitle: (props) => <HeaderLogo {...props} />,
                          headerStyle: {
                            backgroundColor: "white",
                          },
                          headerBackTitleVisible: false,
                          headerLeft: () => <CustomGoback />,
                        }}
                      >
                        {() => <RoomScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabAroundMe"
                  options={{
                    tabBarLabel: "Around Me",
                    tabBarIcon: ({ color, size }) => (
                      <Feather name="map-pin" size={24} color="#EB5A62" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Around Me"
                        options={{
                          headerTitle: (props) => <HeaderLogo {...props} />,
                          headerStyle: {
                            backgroundColor: "white",
                          },
                          headerBackTitleVisible: false,
                          headerLeft: () => <CustomGoback />,
                        }}
                      >
                        {() => <AroundMeScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="My Profile Tab"
                  options={{
                    tabBarLabel: "My Profile",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name="ios-person-outline"
                        size={24}
                        color="#EB5A62"
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="My Profile Screen"
                        options={{
                          title: "My Profile",
                          headerTitle: () => <HeaderLogo />,
                          headerStyle: { backgroundColor: "white" },
                          headerBackTitleVisible: false,
                          headerLeft: () => <CustomGoback />,
                        }}
                      >
                        {() => (
                          <MyProfileScreen
                            setToken={setToken}
                            userId={userId}
                            userToken={userToken}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
