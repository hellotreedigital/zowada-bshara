import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { OnBoardingScreen } from "../screens";
import { Login } from "../screens/Auth/Login";
import { SignupType } from "../screens/Auth/SignupType";
import { Signup } from "../screens/Auth/Signup";
import { ForgetPassowrd } from "../screens/Auth/ForgetPassowrd";
import { Otp } from "../screens/Auth/Otp";
import { NewPassword } from "../screens/Auth/NewPassword";
import { BottomTabNavigator } from "./BottomTabNavigation";
import { ContinueSignup } from "../screens/Auth/ContinueSignup";
import AppContext from "../appContext/AppContext";
import CameraScreen from "../screens/Camera/CameraScreen";
import { ConfirmSelfieScreen } from "../screens/Camera/ConfirmSelfieScreen/ConfirmSelfieScreen";

export const Navigation = () => {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};
const Stack = createStackNavigator();

const RootNavigator = () => {
  const {
    setToken,
    token,
    isOnBoardingVisible,
    setIsOnBoardingVisible,
    isCamera,
  } = useContext(AppContext);

  const onBoardingHandler = async () => {
    try {
      await AsyncStorage.setItem("@onboardingStatus", JSON.stringify(false));
    } catch (e) {
      // saving error
    }
    setIsOnBoardingVisible(false); //testing only
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isOnBoardingVisible ? (
        <>
          <Stack.Screen
            name="onBoarding"
            children={({ navigation }) => (
              <OnBoardingScreen
                navigation={navigation}
                setIsOnBoardingVisible={setIsOnBoardingVisible}
                done={() => onBoardingHandler()}
              />
            )}
          />
        </>
      ) : (
        <>
          {!token ? (
            <Stack.Group>
              <Stack.Screen
                name="login"
                children={({ navigation }) => (
                  <Login setToken={setToken} navigation={navigation} />
                )}
              />
              <Stack.Screen
                name="signupType"
                children={({ navigation, route }) => (
                  <SignupType navigation={navigation} route={route} />
                )}
              />
              <Stack.Screen
                name="signup"
                children={({ navigation, route }) => (
                  <Signup navigation={navigation} route={route} />
                )}
              />
              <Stack.Screen
                name="continueSignup"
                children={({ navigation, route }) => (
                  <ContinueSignup navigation={navigation} route={route} />
                )}
              />
              <Stack.Screen
                name="forgetPassword"
                children={({ navigation }) => (
                  <ForgetPassowrd navigation={navigation} />
                )}
              />
              <Stack.Screen
                name="otp"
                children={({ navigation, route }) => (
                  <Otp navigation={navigation} route={route} />
                )}
              />
              <Stack.Screen
                name="newpassword"
                children={({ navigation, route }) => (
                  <NewPassword navigation={navigation} route={route} />
                )}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              {isCamera ? (
                <Stack.Group>
                  <Stack.Screen name="cameraScreen" component={CameraScreen} />
                  <Stack.Screen
                    name="confirmSelfie"
                    component={ConfirmSelfieScreen}
                  />
                </Stack.Group>
              ) : (
                <Stack.Screen name="root" component={BottomTabNavigator} />
              )}
            </Stack.Group>
          )}
        </>
      )}
    </Stack.Navigator>
  );
};
