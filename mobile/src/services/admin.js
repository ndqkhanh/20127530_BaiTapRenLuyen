import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const getMetrics = async (token) => {
  try {
    // let token = await AsyncStorage.getItem("UserToken");
    // let token = "";
    let data = await fetch(`${API_URL}/admin/metrics`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    data = await data.json();
    return data;
  } catch (error) {
    console.error("error---", error);
  }
  return null;
};

const getPendingQuestions = async (page, limit) => {
  try {
    let token = await AsyncStorage.getItem("UserToken");
    let data = await fetch(
      `${API_URL}/admin/manage-questions/${page}/${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    data = await data.json();
    return data;
  } catch (error) {
    console.error("error---", error);
  }
  return null;
};

const approveDeclineQuestion = async (questionId, status) => {
  try {
    let token = await AsyncStorage.getItem("UserToken");
    let data = await fetch(`${API_URL}/admin/manage-questions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        questionId,
        status,
      }),
    });
    return data;
  } catch (error) {
    console.error("error---", error);
  }
  return null;
};

const getUsers = async (page, limit) => {
  try {
    let token = await AsyncStorage.getItem("UserToken");
    let data = await fetch(`${API_URL}/admin/list-users/${page}/${limit}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    data = await data.json();
    return data;
  } catch (error) {
    console.error("error---", error);
  }
  return null;
};

export { getMetrics, getPendingQuestions, approveDeclineQuestion, getUsers };
