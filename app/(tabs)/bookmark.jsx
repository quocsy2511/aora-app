import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";
import EmptyState from "../../components/EmptyState";

const Bookmark = () => {
  const { user } = useGlobalContext();
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex justify-between items-start mb-6 flex-row my-6 px-4 ">
        <View className="">
          <Text className="font-pmedium text-sm text-gray-100">Bookmarked</Text>
          <Text className="font-psemibold text-2xl text-white">
            {user?.username}
          </Text>
        </View>

        <View className="mt-1.5">
          <Image
            source={images.logoSmall}
            className="w-9 h-10"
            resizeMode="contain"
          />
        </View>
      </View>
      <EmptyState
        title="This page will update soon"
        subtitle="you can create your own videos"
      />
    </SafeAreaView>
  );
};

export default Bookmark;
