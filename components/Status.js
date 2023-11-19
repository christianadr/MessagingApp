import React, { useRef, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import Constants from "expo";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
} from "react-native";

export default class Status extends React.Component {
  state = {
    info: null,
    isConnected: true,
    fadeIn: new Animated.Value(0), // setting animation property to 0
  };

  componentDidMount() {
    NetInfo.fetch().then((state) => {
      this.setState({
        isConnected: state.isConnected,
      });
    });

    NetInfo.addEventListener((state) => {
      this.setState({
        isConnected: state.isConnected,
      });
    });

    // hook call for allowing fade in transition in
    // Animated component
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { isConnected, fadeIn } = this.state;

    const backgroundColor = isConnected ? "white" : "red";

    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? "dark-content" : "light-content"}
        animated={false}
      />
    );

    const messageContainer = (
      <Animated.View
        style={[styles.messageContainer, { opacity: fadeIn }]}
        pointerEvents={"none"}
      >
        {statusBar}
        {!isConnected && (
          <View style={[styles.bubble]}>
            <Text style={styles.text}>No network connection</Text>
          </View>
        )}
      </Animated.View>
    );

    if (Platform.OS === "ios") {
      return (
        <View style={[styles.status, { backgroundColor }]}>
          {messageContainer}
        </View>
      );
    }

    return messageContainer;
  }
}

const statusHeight = Platform.OS == "ios" ? Constants.statusBarHeight : 0;
const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: "absolute",
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: "center",
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "red",
  },
  text: {
    color: "white",
  },
});
