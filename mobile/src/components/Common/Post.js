import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Ionicons";
const Post = ({
  voting,
  content,
  title,
  userData,
  dateText,
  image,
  numOfAnswers,
  correctAnswer = false,
}) => {
  return (
    <View style={styles.postContainer}>
      {typeof voting == "number" && (
        <View style={styles.votingContainer}>
          <Icon name="caret-up-outline" style={styles.votingUp} />
          <Icon name="caret-down-outline" style={styles.votingDown} />
          <Text style={styles.votingScore}>+{voting}</Text>
        </View>
      )}

      <View style={styles.postContentContainer}>
        <View style={styles.infoUserContainer}>
          {userData.avatarUrl && (
            <Image
              source={{
                uri: userData.avatarUrl,
              }}
              style={styles.avatar}
            ></Image>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.nameAndDate}>
              {userData.name && (
                <Text style={styles.name}>{userData.name}</Text>
              )}
              {dateText && <Text style={styles.createdAt}>{dateText}</Text>}
            </View>

            {correctAnswer && (
              <View
                style={{
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="checkmark-circle"
                  style={{
                    color: Colors.yellow10,
                    fontSize: 40,
                  }}
                />
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
          }}
        >
          {title && <Text style={styles.questionTitle}>{title}</Text>}

          {content && <Text style={styles.questionContent}>{content}</Text>}

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

      {typeof numOfAnswers == "number" && (
        <View style={styles.questionFooterContainer}>
          <Icon name="chatbubble-ellipses" style={styles.commentIcon} />
          <Text style={styles.numOfAnswers}>{numOfAnswers}</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: Colors.white,
    marginTop: 20,
  },
  votingContainer: {
    backgroundColor: Colors.grey60,
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  votingUp: {
    fontSize: 35,
    color: Colors.yellow10,
  },
  votingDown: {
    fontSize: 35,
    color: Colors.red50,
  },
  votingScore: {
    color: Colors.blue30,
    fontSize: 17,
    fontWeight: "bold",
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
    color: Colors.blue40,
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
  commentIcon: {
    fontSize: 25,
    color: Colors.cyan10,
  },
  numOfAnswers: {
    marginLeft: 5,
    color: Colors.cyan30,
    fontWeight: "bold",
  },
});
export default Post;
