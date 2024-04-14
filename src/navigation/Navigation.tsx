import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import GalleryScreen from "../screens/GalleryScreen";
import {CameraScreen} from "../screens/CameraScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { RootState } from "../store/store";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

export default function Navigation(): ReactNode {
  let token = useSelector((state: RootState) => state.auth.token);

  return (
    <NavigationContainer>
      {token ? (
        <>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: any;

                if (route.name === "Camera") {
                  iconName = focused ? "camera" : "camera-outline";
                } else if (route.name === "Gallery") {
                  iconName = focused ? "image" : "image-outline";
                } else if (route.name === "Settings") {
                  iconName = focused ? "share-social" : "share-social-outline";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "blue",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="Gallery" component={GalleryScreen} />
            <Tab.Screen
              name="Camera"
              component={CameraScreen}
              options={{ unmountOnBlur: true, headerShown:false }}
            />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </>
      ) : (
        <AuthStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
          <AuthStack.Screen name="Profile" component={ProfileScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
