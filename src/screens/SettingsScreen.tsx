import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { logOut } from "../store/slices/authSlice";

export default function SettingsScreen({ navigation }: any) {
  const dispatch: AppDispatch = useDispatch();

  function redirectProfileScreen() {
    navigation.navigate("Profile");
  }

  function disconnect() {
    dispatch(logOut());
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          redirectProfileScreen;
        }}
      >
        <View style={styles.profil}>
          <Text>Profile</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={disconnect}>
        <View style={styles.logOut}>
          <Text>Log out</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profil: {
    alignItems: "center",
    margin: 10,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    padding: 15,
    width: 250,
  },
  logOut: {
    alignItems: "center",
    backgroundColor: "#e74c3c",
    borderRadius: 5,
    padding: 15,
    width: 250,
  },
});
