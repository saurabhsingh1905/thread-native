import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from "jwt-decode"

import { UserType } from "../UserContext";
import User from "../components/User";

const HomeScreen = () => {

    
  const {userId,setUserId} = useContext(UserType)

  useEffect(()=>{
    const fetchUsers = async ()=> {
      const token = await AsyncStorage.getItem("authToken")
    
      const decodedToken = jwt_decode(token)
      // console.log(decodedToken)
    
      const userId = decodedToken.userId
      setUserId (userId );
    
      
    }
    
    fetchUsers()
      },[])

    
  return (
    <ScrollView style={{marginTop:50}}>
      <Text>HomeScreen</Text>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})