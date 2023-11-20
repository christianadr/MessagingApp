import {
    StyleSheet,
    Text,
    View,
    Image,
    BackHandler,
    Dimensions,
} from "react-native";
import React from "react";
import Status from "./components/Status";
import MessageList from "./components/MessageList";
import {
    createImageMessage,
    createLocationMessage,
    createTextMessage,
} from "./utils/MessageUtils";
import { TouchableHighlight } from "react-native";
import { Alert } from "react-native";

export default class App extends React.Component {
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

    componentDidMount() {
        this.subscription = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                const { fullscreenImageId } = this.state;
                if (fullscreenImageId) {
                    this.dismissFullscreenImage();
                    return true;
                }
                return false;
            }
        );
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    dismissFullscreenImage = () => {
        this.setState({ fullscreenImageId: null });
    };

    handleDeleteMessage = (messageId) => {
        const temp = this.state.messages.filter(
            (message) => message.id !== messageId
        );
        this.setState({ messages: temp });
    };

    alert = (id) => {
        Alert.alert("Delete", "Do you want to delete this message?", [
            {
                text: "Delete",
                onPress: () => {
                    this.handleDeleteMessage(id);
                },
            },
            {
                text: "Cancel",
            },
        ]);
    };

    handlePressMessage = ({ id, type }) => {
        switch (type) {
            case "text":
                this.alert(id);
                break;
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
        const { width, height } = Dimensions.get("window");

        if (!fullscreenImageId) return null;
        const image = messages.find(
            (message) => message.id === fullscreenImageId
        );
        if (!image) return null;
        const { uri } = image;
        return (
            <TouchableHighlight
                style={[
                    styles.fullscreenOverlay,
                    { width: width, height: height },
                ]}
                onPress={this.dismissFullscreenImage}
            >
                <Image style={styles.fullscreenImage} source={{ uri }} />
            </TouchableHighlight>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Status />
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
                {this.renderFullscreenImage()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
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
    fullscreenOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "black",
    },
    fullscreenImage: {
        resizeMode: "contain",
        flex: 1,
    },
});
