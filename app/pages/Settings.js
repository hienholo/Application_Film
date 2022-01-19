import React, { Component } from "react";
import { View, Switch, Text, StyleSheet, Alert } from "react-native";
import Constants from "expo-constants";
import { ThemeContext } from "../contexts/ThemeContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { IMLocalized } from "../IMLocalized";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class Settings extends Component {
  state = {
    selectedTriggerValue: "15",
  };
  showLicenses = () =>
    Alert.alert(
      IMLocalized("politique de confidentialité"),
      "Science et Technologie de l'information et la Communication",
      [
        {
          text: IMLocalized("retour"),
          style: "cancel",
        },
        {
          text: IMLocalized("ok"),
          style: "ok",
        },
      ],
      {
        cancelable: true,
      }
    );

  getTriggerValue = async () => {
    try {
      const value = await AsyncStorage.getItem("triggerValue");
      //console.log(value);
      if (value == null) {
        await AsyncStorage.setItem("triggerValue", "15");
      } else {
        this.setState({
          selectedTriggerValue: value,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  constructor() {
    super();
    this.getTriggerValue();
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {(context) => {
          const { isDarkMode, light, dark, updateTheme } = context;
          return (
            <View
              style={[
                styles.container,
                { backgroundColor: isDarkMode ? dark.bg : light.bg },
              ]}
            >
              <Text
                style={[
                  styles.title,
                  { color: isDarkMode ? light.bg : dark.bg },
                ]}
              >
                {IMLocalized("Paramètres")}
              </Text>
              <View style={styles.settingsItem}>
                <View style={styles.settingsItem2}>
                  <MaterialCommunityIcons
                    name={isDarkMode ? "weather-night" : "weather-sunny"}
                    size={26}
                    color={isDarkMode ? light.bg : dark.bg}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: "poppins-l",
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    {IMLocalized(" mode sombre")}
                  </Text>
                </View>
                <Switch
                  value={isDarkMode}
                  onValueChange={updateTheme}
                  trackColor={{ false: "#f4f3f4", true: "#f4f3f4" }}
                  thumbColor={isDarkMode ? "#26ed7c" : "#f4f3f4"}
                />
              </View>
              <View style={styles.settingsItem}>
                <View style={[styles.settingsItem2, { marginVertical: 10 }]}>
                  <MaterialCommunityIcons
                    name="bell-outline"
                    size={26}
                    color={isDarkMode ? light.bg : dark.bg}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: "poppins-l",
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    {IMLocalized("pas d'intervalles")}
                  </Text>
                </View>
                <Picker
                  style={{ width: 140, height: 40 }}
                  selectedValue={this.state.selectedTriggerValue}
                  onValueChange={async (itemValue) => {
                    this.setState({ selectedTriggerValue: itemValue });
                    await AsyncStorage.setItem(
                      "triggerValue",
                      itemValue.toString()
                    );
                  }}
                >
                  <Picker.Item
                    label={15 + " " + IMLocalized("min")}
                    value="15"
                  />
                  <Picker.Item
                    label={30 + " " + IMLocalized("min")}
                    value="30"
                  />
                  <Picker.Item label={1 + " " + IMLocalized("jour")} value="1" />
                  <Picker.Item label={2 + " " + IMLocalized("jour")} value="2" />
                </Picker>
              </View>
              <TouchableWithoutFeedback
                style={styles.listitem}
                onPress={this.showLicenses}
              >
                <View style={[styles.settingsItem2, { paddingHorizontal: 20 }]}>
                  <MaterialCommunityIcons
                    name="book-open-outline"
                    size={24}
                    color={isDarkMode ? light.bg : dark.bg}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: "poppins-l",
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    {IMLocalized("politique de confidentialité")}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <View
                style={[
                  styles.settingsItem2,
                  { paddingHorizontal: 20, marginBottom: 10 },
                ]}
              >
                <MaterialCommunityIcons
                  name="account-outline"
                  size={26}
                  color={isDarkMode ? light.bg : dark.bg}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: "poppins-l",
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    {IMLocalized("auteurs")}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins-l",
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    Gompou, Hien et Koffi Mathieu
                  </Text>
                </View>
              </View>
              <View style={[styles.settingsItem2, { paddingHorizontal: 20 }]}>
                <MaterialCommunityIcons
                  name="information-outline"
                  size={26}
                  color={isDarkMode ? light.bg : dark.bg}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: "poppins-l",
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    {IMLocalized("version")}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins-l",
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    v{Constants.manifest.version}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
  },
  listitem: {
    marginVertical: 10,
  },
  settingsItem: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  settingsItem2: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
  },
  example: {
    width: 150,
    height: 150,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    paddingLeft: 20,
    fontSize: 22,
    fontFamily: "poppins-sb",
    marginBottom: 20,
  },
});
