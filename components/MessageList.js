import React from "react";
import PropTypes from "prop-types";
import {
    FlatList,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { MessageShape } from "../utils/MessageUtils";
import { MapView } from "expo";

const keyExtractor = (item) => item.id.toString();

export default class MessageList extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(MessageShape).isRequired,
        onPressMessage: PropTypes.func,
    };

    static defaultProps = {
        onPressMessage: () => {},
    };

    //...

    renderMessageItem = ({ item }) => {
        const { onPressMessage } = this.props;
        return (
            <View key={item.id} style={styles.messageRow}>
                <TouchableOpacity onPress={() => onPressMessage(item)}>
                    {this.renderMessageBody(item)}
                </TouchableOpacity>
            </View>
        );
    };

    renderMessageBody = ({ type, text, uri, coordinate }) => {
        switch (type) {
            case "text":
                return (
                    <View style={styles.messageBubble}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                );

            case "image":
                return <Image style={styles.image} source={{ uri }} />;
            case "location":
                return (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            ...coordinate,
                            latitudeDelta: 0.08,
                            longitudeDelta: 0.04,
                        }}
                    >
                        <MapView.Marker coordinate={coordinate} />
                    </MapView>
                );
            default:
                return null;
        }
    };

    render() {
        const { messages } = this.props;
        return (
            <FlatList
                style={styles.container}
                inverted
                data={messages}
                renderItem={this.renderMessageItem}
                keyExtractor={keyExtractor}
                keyboardShouldPersistTaps={"handled"}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "visible", // prevents clipping on resize!
    },
});
