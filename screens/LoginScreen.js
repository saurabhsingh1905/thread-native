import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  
  const navigation = useNavigation()

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 50 }}>
        <Image
          style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://logos-world.net/wp-content/uploads/2023/07/Threads-Logo.jpg",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 20 }}>
            Login to your account
          </Text>
        </View>

        <View>
          <View style={{ marginTop: 40 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderColor: "#C0C0C0",
                borderWidth: 1,
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <MaterialIcons
                name="email"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter your Email"
                placeholderTextColor={"gray"}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 280,
                  fontSize: password ? 16 : 16,
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 28 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderColor: "#C0C0C0",
                borderWidth: 1,
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />
              <TextInput
                placeholder="Enter your Password"
                placeholderTextColor={"gray"}
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 280,
                  fontSize: password ? 16 : 16,
                }}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
              alignItems: "center",
            }}
          >
            <Text>Keep me LoggedIn</Text>
            <Text style={{ fontWeight: "500", color: "#007FFF" }}>
              Forgot password ?
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 45 }} />

        <Pressable
          style={{
            width:200,
            borderWidth: 0.8,
            padding: 15,
            marginTop:30,
            marginLeft:"auto",
            marginRight:"auto",
           borderRadius:6,
            backgroundColor: "black",
          }}
        >
          <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:16}}>Login</Text>
        </Pressable>

        <Pressable style={{marginTop:10}} onPress={()=> navigation.navigate("Register")}>
          <Text style={{textAlign:"center",fontSize:16}}> Dont have an account ? SignUp </Text></Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
