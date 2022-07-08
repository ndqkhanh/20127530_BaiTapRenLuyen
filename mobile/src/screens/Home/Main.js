import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Colors } from "react-native-ui-lib";
import HomeMainWelcome from "~components/Home/Main/Welcome";
import { UserContext } from "~provider/UserProvider";
import Icon from "react-native-vector-icons/Ionicons";
import HomeMainPosting from "~components/Home/Main/Posting";
import Post from "~components/Common/Post";
import { formatDistance } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFeed } from "~services/feed";
import { Alert } from "react-native";
import { API_URL } from "@env";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 100;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const ScreensHomeMain = ({ navigation }) => {
  const [maxLength, setMaxLength] = useState(0);
  const [page, setPage] = useState(0);
  const [feedData, setFeedData] = useState([]);

  const [refetch, setRefetch] = useState(false);
  const fetchFeedInformation = async (page) => {
    let token = await AsyncStorage.getItem("UserToken");
    const data = await getFeed(token, page);
    var maxLength = 5;
    try {
      maxLength = parseInt(data.count);
    } catch (error) {
      console.error("error---", error);
    }
    setMaxLength(maxLength);
    setFeedData((feedData) => [...feedData, ...data.data]);
    setPage((page) => page + 1);
    setRefetch(false);
    console.log("data:", feedData);
  };
  useEffect(() => {
    fetchFeedInformation(0);

    // Reload
    return () => {
      setPage(0);
      setRefetch(false);
      setFeedData([]);
      setMaxLength(0);

      setRefetch(false);
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Q & A Forum</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.navigate("Login");
          }}
        >
          <Icon
            name="log-out-outline"
            style={{
              fontSize: 30,
              color: Colors.cyan10,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.body}
        onScroll={({ nativeEvent }) => {
          if (
            !refetch &&
            isCloseToBottom(nativeEvent) &&
            feedData.length < maxLength
          ) {
            console.log("scrolled to bottom of feed");
            setRefetch(true);
            fetchFeedInformation(page);
          }
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}
      >
        <HomeMainPosting />
        {feedData.map((record) => (
          <Post
            key={record.id}
            dateText={formatDistance(new Date(record.updated_at), Date.now(), {
              addSuffix: true,
            })}
            title={record.title}
            content={record.content}
            numOfAnswers={record.numOfAnswers}
            userData={{
              name: record.userData.name,
              avatarUrl: record.userData.profilepictureurl,
            }}
            correctAnswer={record.correctAnswerExists}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: Colors.white,
    // justifyContent: "center",
    marginHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.cyan70,
  },
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
    color: Colors.blue10,
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
export default ScreensHomeMain;
