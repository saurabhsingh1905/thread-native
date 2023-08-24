import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserType } from "../UserContext";
import axios from "axios";

const ThreadsScreen = () => {
  const [content, setContent] = useState("");
  const { userId, setUserId } = useContext(UserType);
  console.log(userId);

  const handlePostSubmit = () => {
    const postData = {
      userId,
    };
    if (content) {
      postData.content = content;
    }

    axios
      .post("http://192.168.132.136:3000/create-post", postData)
      .then((response) => {
        setContent("");
      })
      .catch((error) => {
        console.log("Error creating post", error);
      });
  };

  return (
    <ScrollView style={{}}>
      <SafeAreaView style={{ padding: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              resizeMode: "contain",
            }}
            source={{
              uri: "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png",
            }}
          />

          <Text>Shivi</Text>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 10 }}>
          <TextInput
            placeholder="Type Your Thread...."
            placeholderTextColor={"black"}
            value={content}
            onChangeText={(text) => setContent(text)}
            multiline
          />
        </View>

        <View style={{ marginTop: 20 }} />

        <Button title="Share Thread" />
      </SafeAreaView>
    </ScrollView>
  );
};

export default ThreadsScreen;

const styles = StyleSheet.create({});
