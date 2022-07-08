import React from "react";
import { Image, Text, View } from "react-native";
import { Colors } from "react-native-ui-lib";
const HomeMainPosting = () => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        padding: 10,
        marginTop: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg",
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: Colors.green5,
          }}
        ></Image>

        <View
          style={{
            flex: 1,
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              color: Colors.grey40,
              fontSize: 15,
            }}
          >
            Write something...
          </Text>
        </View>
      </View>
      <View
        style={{
          borderTopColor: Colors.grey70,
          borderTopWidth: 2,
          alignItems: "flex-end",
          marginTop: 10,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.blue30,
            width: 70,
            height: 30,
            borderRadius: 5,
            marginTop: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontWeight: "bold",
            }}
          >
            Post
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeMainPosting;
