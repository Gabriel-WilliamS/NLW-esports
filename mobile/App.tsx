import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello world!</Text>
      <StatusBar style="auto" backgroundColor="#006060" />
      <Button title="Cadastrar" />
      <Button title="Cadastrar" />
      <Button title="Cadastrar" />
    </View>
  );
}

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity style={styles.buttons}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5be4ff",
    alignItems: "center",
    justifyContent: "center"
  },

  title: {
    color: "#fff",
    fontSize: 22
  },

  buttons: {
    width: "50%",
    height: "5%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f",
    marginTop: "5%"
  }
});
