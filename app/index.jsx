import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const RootLayout = () => {
  return (
    <View className="flex flex-1 justify-center items-center">
      <Text className="text-lg text-red-700 font-pmedium">welcome to six </Text>
      <StatusBar style="auto" />
      <Link href="/profile" style={{ color: "blue" }}>
        Go to profile
      </Link>
    </View>
  );
};

export default RootLayout;
