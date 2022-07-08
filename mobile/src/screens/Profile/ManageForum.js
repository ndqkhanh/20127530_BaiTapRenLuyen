import React, { useState, useContext, useEffect } from "react";
import { View, Text, Avatar, Card, Colors } from "react-native-ui-lib";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { UserContext } from "~provider/UserProvider";
import PendingQuestion from "~components/Common/PendingQuestionList";
import User from "~components/Common/UserList";
import { TextInput } from "react-native-gesture-handler";
import { formatDistance } from "date-fns";
import { getMetrics, getPendingQuestions, getUsers } from "~services/admin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 280;
  // console.log(
  //   layoutMeasurement,
  //   contentOffset,
  //   contentSize,
  //   layoutMeasurement.height + contentOffset.y,
  //   contentSize.height - paddingToBottom,
  //   layoutMeasurement.height + contentOffset.y >=
  //     contentSize.height - paddingToBottom,
  // );
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const ManageForumScreen = () => {
  const [isPressed, setIsPressed] = useState([true, false, false]);
  const questionsPressed = () => {
    setIsPressed([true, false, false]);
  };
  const usersPressed = () => {
    setIsPressed([false, true, false]);
  };
  const configPressed = () => {
    setIsPressed([false, false, true]);
  };
  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [numOfUsers, setNumOfUsers] = useState(0);
  const [numOfAnswers, setNumOfAnswers] = useState(0);

  const fetchMetricsInformation = async () => {
    let token = await AsyncStorage.getItem("UserToken");
    const metricsData = await getMetrics(token);
    setNumOfQuestions(metricsData.numOfQuestions);
    setNumOfUsers(metricsData.numOfUsers);
    setNumOfAnswers(metricsData.numOfAnswers);
    console.log("metricsData:", metricsData);
  };

  const [maxPendingQuestionsLength, setMaxPendingQuestionsLength] = useState(0);
  const [pendingQuestionsPage, setPendingQuestionsPage] = useState(0);
  const [pendingQuestionsData, setPendingQuestionsData] = useState([]);
  const fetchPendingQuestions = async (page, limit) => {
    const data = await getPendingQuestions(page, limit);
    var maxLength = 5;
    try {
      maxLength = parseInt(data.count);
    } catch (e) {
      console.log(e);
    }
    setMaxPendingQuestionsLength(maxLength);
    setPendingQuestionsData((pendingQuestionsData) => [
      ...pendingQuestionsData,
      ...data.data,
    ]);
    setPendingQuestionsPage((pendingQuestionsPage) => pendingQuestionsPage + 1);
    setRefetch(false);
    console.log("data:", pendingQuestionsData);
  };

  const [maxUsersLength, setMaxUsersLength] = useState(0);
  const [usersPage, setUsersPage] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const fetchUsers = async (page, limit) => {
    const data = await getUsers(page, limit);
    var maxLength = 5;
    try {
      maxLength = parseInt(data.count);
    } catch (e) {
      console.log(e);
    }
    setMaxUsersLength(maxLength);
    setUsersData((usersData) => [...usersData, ...data.data]);
    setUsersPage((usersPage) => usersPage + 1);
    setRefetch(false);
    console.log("data:", usersData);
  };
  useEffect(() => {
    fetchPendingQuestions(0, 5);
    fetchUsers(0, 10);
    fetchMetricsInformation();

    return () => {
      setNumOfQuestions(0);
      setNumOfAnswers(0);
      setNumOfUsers(0);

      setMaxPendingQuestionsLength(0);
      setPendingQuestionsPage(0);
      setPendingQuestionsData([]);

      setMaxUsersLength(0);
      setUsersPage(0);
      setUsersData([]);

      setIsPressed([true, false, false]);
      setRefetch(false);
    };
  }, []);

  const [refetch, setRefetch] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Manage Forum</Text>
        <Icon
          name="log-out-outline"
          style={{
            fontSize: 30,
            color: Colors.cyan10,
          }}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.infoSection}>
          <Card style={styles.QA_card}>
            <Text style={{ fontWeight: "bold", fontSize: 30 }} center black>
              {numOfQuestions}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 12 }} center black>
              Questions
            </Text>
          </Card>
          <Card style={styles.QA_card}>
            <Text style={{ fontWeight: "bold", fontSize: 30 }} center black>
              {numOfUsers}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 12 }} center black>
              Users
            </Text>
          </Card>
          <Card style={styles.QA_card}>
            <Text style={{ fontWeight: "bold", fontSize: 30 }} center black>
              {numOfAnswers}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 12 }} center black>
              Answers
            </Text>
          </Card>
        </View>
        <View style={styles.infoSection}>
          <TouchableOpacity onPress={questionsPressed}>
            <Card
              style={styles.menu}
              {...(isPressed[0] ? { backgroundColor: Colors.blue60 } : {})}
            >
              <Text black>Pending questions</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={usersPressed}>
            <Card
              style={styles.menu}
              {...(isPressed[1] ? { backgroundColor: Colors.blue60 } : {})}
            >
              <Text black>Users</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={configPressed}>
            <Card
              style={styles.menu}
              {...(isPressed[2] ? { backgroundColor: Colors.blue60 } : {})}
            >
              <Text black>Config</Text>
            </Card>
          </TouchableOpacity>
        </View>
        {isPressed[0] ? (
          <ScrollView
            key={1}
            style={styles.body}
            onScroll={({ nativeEvent }) => {
              if (
                !refetch &&
                isCloseToBottom(nativeEvent) &&
                pendingQuestionsData.length < maxPendingQuestionsLength
              ) {
                console.log("scrolled to bottom of pending questions");
                setRefetch(true);

                fetchPendingQuestions(pendingQuestionsPage, 5);
              }
            }}
            contentContainerStyle={{
              paddingBottom: 280,
            }}
            showsVerticalScrollIndicator={false}
          >
            {pendingQuestionsData.map((record) => (
              <PendingQuestion
                key={record.id}
                dateText={formatDistance(
                  new Date(record.updated_at),
                  Date.now(),
                  {
                    addSuffix: true,
                  },
                )}
                title={record.title}
                content={record.content}
                userData={{
                  name: record.userData.name,
                  avatarUrl: record.userData.profilepictureurl,
                }}
              />
            ))}
          </ScrollView>
        ) : isPressed[1] ? (
          <ScrollView
            key={2}
            style={styles.body}
            onScroll={({ nativeEvent: event2 }) => {
              if (
                !refetch &&
                isCloseToBottom(event2) &&
                usersData.length < maxUsersLength
              ) {
                console.log("scrolled to bottom users");
                setRefetch(true);
                fetchUsers(usersPage, 10);
              }
            }}
            contentContainerStyle={{
              paddingBottom: 280,
            }}
            showsVerticalScrollIndicator={false}
          >
            {usersData.map((record) => (
              <User
                key={record.id}
                userData={{
                  name: record.name,
                  avatarUrl: record.profilepictureurl,
                }}
              />
            ))}
          </ScrollView>
        ) : (
          isPressed[2] && (
            <View>
              <View style={styles.config}>
                <Text style={styles.configText}>
                  Number of questions in feed:
                </Text>
                <Card style={styles.inputCard} paddingRight={50}>
                  <TextInput maxLength={2} style={styles.inputText}></TextInput>
                </Card>
              </View>
              <View style={styles.config}>
                <Text style={styles.configText}>Forum name:</Text>
                <Card style={styles.inputCard} paddingRight={95}>
                  <TextInput
                    placeholder="Max 20 letters"
                    maxLength={20}
                  ></TextInput>
                </Card>
              </View>
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default ManageForumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   marginLeft: 10,
    //   marginRight: 10
  },
  body: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerContainer: {
    height: 50,
    backgroundColor: Colors.white,
    // justifyContent: "center",
    //marginHorizontal: 20,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoSection: {
    margin: 10,
    flexDirection: "row",
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  QA_card: {
    height: 80,
    width: "30%",
    padding: 5,
    marginLeft: 10,
  },
  menu: {
    borderRadius: 0,
    paddingLeft: 20,
    paddingRight: 30,
    marginRight: 2,
  },
  config: {
    backgroundColor: "white",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.blue20,
    margin: 20,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  configText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  inputCard: {
    marginLeft: 10,
    backgroundColor: Colors.grey60,
    height: "80%",
  },
  inputText: {
    textAlign: "center",
  },
});
