import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Ionicons";
import Post from "~components/Common/Post";
import Q2APagination from "~components/Q2A/Pagination";

const ScreensQ2AMain = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View style={styles.headerContainer}>
        <Icon name="arrow-back-outline" style={styles.back} />
        <Text style={styles.header}>Câu hỏi về game?</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        style={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <Post
          dateText={"3 days ago"}
          // title={"Câu hỏi về game?"}
          content={
            "Mọi người em có 1 thắc mắc là làm sao mình là như thế làm thế nọ ạ."
          }
          userData={{
            name: "Bảo Dragon",
            avatarUrl:
              "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg",
          }}
        />

        <View style={styles.answerContainer}>
          <Text style={styles.numOfAnswers}>10 answers</Text>
        </View>
        <Q2APagination page={3} />
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Post
            voting={30}
            key={item}
            correctAnswer={item == 1}
            dateText={"3 days ago"}
            content={"Em xin trả lời bác như này."}
            userData={{
              name: "Bảo Dragon",
              avatarUrl:
                "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg",
            }}
          />
        ))}

        <Q2APagination page={3} />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: Colors.white,
    justifyContent: "center",
    marginHorizontal: 20,
    alignItems: "center",
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.blue40,
  },
  body: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.cyan70,
  },
  back: {
    fontSize: 30,
    color: Colors.cyan10,
    position: "absolute",
    left: 0,
    alignSelf: "center",
  },
  answerContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    marginTop: 20,
  },
  numOfAnswers: {
    fontWeight: "bold",
    fontSize: 23,
    color: Colors.blue40,
  },
});
export default ScreensQ2AMain;
