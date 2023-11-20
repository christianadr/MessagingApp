import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MessageList from "../components/MessageList";
import {
    createImageMessage,
    createLocationMessage,
    createTextMessage,
} from "../utils/MessageUtils";
import { TouchableHighlight } from "react-native";

export default class Skeleton extends React.Component {
    state = {
        messages: [
            createImageMessage(
                "https://th.bing.com/th/id/OIP.o1yeiX4cqtfkE5_6aD7W-AAAAA?rs=1&pid=ImgDetMain"
            ),
            createTextMessage("With great power comes great responsibility"),
            // createTextMessage("I am..."),
            createLocationMessage({
                latitude: 19.741755,
                longitude: -155.844437,
            }),
        ],
        fullscreenImageId: null,
    };

    dismissFullscreenImage = () => {
        this.setState({ fullscreenImageId: null });
    };

    handlePressMessage = ({ id, type }) => {
        switch (type) {
            case "text":
            // ...
            case "image":
                this.setState({ fullscreenImageId: id });
                break;
            default:
                break;
        }
    };

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

    renderFullscreenImage = () => {
        const { messages, fullscreenImageId } = this.state;
        if (!fullscreenImageId) return null;
        const image = messages.find(
            (message) => message.id === fullscreenImageId
        );
        if (!image) return null;
        const { uri } = image;
        return (
            <TouchableHighlight
                style={styles.fullscreenOverlay}
                onPress={this.dismissFullscreenImage}
            >
                <Image style={styles.fullscreenImage} source={{ uri }} />
            </TouchableHighlight>
        );
    };

    render() {
        return (
            <>
                <View
                    style={[
                        styles.content,
                        { alignItems: "center", justifyContent: "center" },
                    ]}
                >
                    {this.renderMessageList()}
                </View>
                <View
                    style={[
                        styles.toolbar,
                        { alignItems: "center", justifyContent: "center" },
                    ]}
                >
                    <Text>Toolbar</Text>
                </View>
                <View
                    style={[
                        styles.inputMethodEditor,
                        { alignItems: "center", justifyContent: "center" },
                    ]}
                >
                    <Text>InputMethodEditor</Text>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    inputMethodEditor: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    toolbar: {
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.04)",
        backgroundColor: "#FFFFFF",
    },
});
