import { StyleSheet, Text, View } from "react-native";
import Skeleton from "./views/Skeleton";
import Status from "./components/Status";

export default function App() {
  return (
    <View style={styles.container}>
      <Status />
      <Skeleton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
