import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Skeleton from "./views/Skeleton";
import Status from "./components/Status";
import MessageList from "./components/MessageList";
import {
    createImageMessage,
    createLocationMessage,
    createTextMessage,
} from "./utils/MessageUtils";

export default class App extends React.Component {
    state = {
        messages: [
            createImageMessage("https://unsplash.it/300/300"),
            createTextMessage("World"),
            createTextMessage("Hello"),
            createLocationMessage({
                latitude: 37.78825,
                longitude: -122.4324,
            }),
        ],
    };

    handlePressMessage = () => {};

    renderMessageList = () => {
        const { messages } = this.state;
        return (
            <View style={styles.content}>
                <MessageList
                    messages={messages}
                    onPressMessage={this.handlePressMessage}
                />
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Status />
                <Skeleton />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
});
