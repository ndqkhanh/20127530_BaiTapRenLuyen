import * as React from "react";

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Colors } from "react-native-ui-lib";
import SearchBar from "~components/SearchBar/SearchBar";
import Post from "~components/Common/Post";
import Icon from "react-native-vector-icons/Ionicons";
const SearchScreen = ({ navigation }) => {
  const [titleSearch, setTitleSearch] = React.useState("");
  return (
    <SafeAreaView style={styles.backgroundView}>
      {/* <Text style={{ fontSize: 30, alignSelf: 'center', color: Colors.blue40 }}>Find question</Text> */}
      <View style={styles.headerContainer}>
        <View
          style={{
            height: 50,
            marginHorizontal: 20,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.header}>Q & A Forum</Text>
          <Icon
            name="log-out-outline"
            style={{
              fontSize: 30,
              color: Colors.cyan10,
            }}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <SearchBar textChange={setTitleSearch}></SearchBar>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <Post
            voting={30}
            dateText={"3 days ago"}
            title={"Câu hỏi về game?"}
            content={
              "Mọi người em có 1 thắc mắc là làm sao mình là như thế làm thế nọ ạ."
            }
            numOfAnswers={100}
            userData={{
              name: "Bảo Dragon",
              avatarUrl:
                "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg",
            }}
          />

          <Post
            voting={69}
            dateText={"14 days ago"}
            title={"Alo alo?"}
            content={
              "Mọi người em có 1 thắc mắc là làm sao mình là như thế làm thế nọ ạ."
            }
            numOfAnswers={22}
            image={
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            }
            userData={{
              name: "Chó Khánh",
              avatarUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD3TDQBB-_F1sfu-gElz73vtUAdlOdLerHDw&usqp=CAU",
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: Colors.cyan70,
  },
  body: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.cyan70,
  },
  headerContainer: {
    backgroundColor: Colors.white,
    // justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
