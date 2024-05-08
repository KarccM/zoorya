import { Link } from "expo-router";
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from "react-native";

export default () => {
  return (
    <SafeAreaView className='bg-zoorya-white'>
      <ScrollView>
        <View className="space-y-4 mx-4  min-h-[85vh] items-center justify-center">
          <Image
            source={require("../../assets/zoorya-logo.jpeg")}
            className="w-full h-60"
          />
          <Text className="text-2xl text-center font-semibold text-zoorya-black">
            Unlock a World of Pet Care Possibilities with
            <Text className="text-zoorya-yellow"> Zooray</Text>
          </Text>
          <View>
            <TouchableOpacity className="bg-zoorya-yellow p-4 border-0 rounded-md items-center w-full">
              <Link href="sign-in">
                <Text className="text-zoorya-white">
                  Continue With Email
                </Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}