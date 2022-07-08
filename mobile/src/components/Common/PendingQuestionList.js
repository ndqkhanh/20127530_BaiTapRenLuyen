import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors, Card } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Ionicons";
const PendingQuestion = ({ content, title, userData, dateText, image }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postContentContainer}>
        <View style={styles.infoUserContainer}>
          <Image
            source={{
              uri: userData.avatarUrl,
            }}
            style={styles.avatar}
          ></Image>

          <View style={styles.nameAndDate}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.createdAt}>{dateText}</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text style={styles.questionTitle}>{title}</Text>

          <Text style={styles.questionContent}>{content}</Text>

          {image && (
            <Image
              source={{
                uri: image,
              }}
              style={{
                alignSelf: "stretch",
                height: 400,
                marginVertical: 10,
              }}
            />
          )}
        </View>
      </View>
      <View style={styles.questionFooterContainer}>
        <Card style={styles.verifyCard}>
          <TouchableOpacity flexDirection={"row"}>
            <View flexDirection={"row"} alignItems={"center"}>
              <Icon
                name="checkmark-outline"
                style={styles.verifyIcon}
                color={Colors.green10}
              />
              <Text style={styles.approve}>Approve</Text>
            </View>
          </TouchableOpacity>
        </Card>
        <Card style={styles.verifyCard}>
          <TouchableOpacity>
            <View flexDirection={"row"} alignItems={"center"}>
              <Icon
                name="close-outline"
                style={styles.verifyIcon}
                color={Colors.red10}
              />
              <Text style={styles.disapprove} red>
                Disapprove
              </Text>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: Colors.white,
    marginTop: 20,
  },
  postContentContainer: {
    padding: 10,
  },
  infoUserContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.green5,
  },
  nameAndDate: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    color: Colors.grey30,
    fontSize: 15,
    fontWeight: "bold",
  },
  createdAt: {
    color: Colors.grey40,
    fontSize: 15,
  },
  questionTitle: {
    color: Colors.grey10,
    fontSize: 25,
    fontWeight: "bold",
  },
  questionContent: {
    color: Colors.grey30,
    fontSize: 15,
    marginTop: 5,
  },
  questionFooterContainer: {
    backgroundColor: Colors.white,
    height: 35,
    flexDirection: "row",
    borderTopColor: Colors.blue80,
    borderTopWidth: 2,
    marginHorizontal: 8,
    marginTop: 5,
    alignItems: "center",
  },
  verifyCard: {
    flexDirection: "row",
    width: "50%",
    //alignContent:'center',
    justifyContent: "center",
  },
  verifyIcon: {
    fontSize: 25,
  },
  approve: {
    marginLeft: 5,
    fontWeight: "bold",
    color: Colors.green10,
  },
  disapprove: {
    marginLeft: 5,
    fontWeight: "bold",
    color: Colors.red10,
  },
});
export default PendingQuestion;
