import { StyleSheet, View, Text } from "react-native";

export default function Skeleton() {
  return (
    <>
      <View
        style={[
          styles.content,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text>MessageList</Text>
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
