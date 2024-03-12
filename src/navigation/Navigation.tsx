import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import GalleryScreen from "../screens/GalleryScreen";
import CameraScreen from "../screens/CameraScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { RootState } from "../store/store";
import LoginScreen from "../screens/LoginScreen";

const Tab = createBottomTabNavigator();

export default function Navigation(): ReactNode {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? (
    <NavigationContainer>
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
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <LoginScreen />
  );
}
