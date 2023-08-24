import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { UserType } from "../UserContext";

const User = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  // console.log(userId);

  const [requestSent, setRequestSent] = useState(false);

  const sendFollow = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch("http://192.168.132.136:3000/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selectedUserId }),
      });

      if (response.ok) {
        setRequestSent(true);
      }
    } catch (error) {
      res.status(500).json({ message: "error following the user" });
    }
  };

  const handleUnFollow = async (targetId) => {
    try {
      const response = await fetch("http://192.168.132.136:3000/user/unfollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loggedInUserId: userId,
          targetUserId: targetId,
        }),
      });
      if(response.ok){
        setRequestSent(false)
        console.log("Unfollowed successfully")
      }
    } catch (error) {
      console.log("Error while unfollow ", error.message);
      res.status(500).json({ message: "error Unfollowing the user" });
    }
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png",
          }}
        />

        <Text style={{ fontSize: 15, fontWeight: "500", flex: 1 }}>
          {item?.name}
        </Text>

        {requestSent || item?.followers?.includes(userId) ? (
          <Pressable
            onPress={() => handleUnFollow(item?._id)}
            style={{
              borderColor: "#D0D0D0",
              borderWidth: 1,
              padding: 10,
              marginLeft: 10,
              width: 100,
              borderRadius: 7,
              marginRight: 8,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
            >
              Following
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => sendFollow(userId, item._id)}
            style={{
              borderColor: "#D0D0D0",
              borderWidth: 1,
              padding: 10,
              marginLeft: 10,
              width: 100,
              borderRadius: 7,
              marginRight: 8,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
            >
              Follow
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
