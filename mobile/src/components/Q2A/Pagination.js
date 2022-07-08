import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native-ui-lib";

const Q2APagination = ({ page }) => {
  return (
    <View style={styles.container}>
      <View style={styles.btnPage}>
        <Text style={styles.btnTextPage}>Previous</Text>
      </View>
      <View style={styles.pageContainer}>
        <Text style={styles.pageNumber}>{page}</Text>
      </View>
      <View style={styles.btnPage}>
        <Text style={styles.btnTextPage}>Next</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btnPage: {
    backgroundColor: Colors.blue40,
    paddingVertical: 5,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  btnTextPage: {
    fontWeight: "bold",
    fontSize: 15,
    color: Colors.white,
  },
  pageContainer: {
    backgroundColor: Colors.blue20,
    borderRadius: 5,
    paddingVertical: 5,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  pageNumber: {
    fontWeight: "bold",
    fontSize: 15,
    color: Colors.white,
  },
});

export default Q2APagination;
