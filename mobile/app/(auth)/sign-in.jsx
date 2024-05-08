import { Link } from "expo-router";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
  return (
    <SafeAreaView>
      <View className="mx-4 space-y-6">
        <Image source={require("../../assets/zoorya-logo.jpeg")} className="w-full h-40 object-contain" />
        <Text className="text-2xl text-zoorya-black font-semibold text-center">
          Log in into <Text className="text-zoorya-yellow font-bold">Zoorya</Text>
        </Text>

        <View>
          <Text className=" text-xs mb-2 text-zoorya-green ">Username</Text>
          <TextInput
            className=" border p-4 rounded-md bg-zoorya-white text-zoorya-green border-zoorya-yellow"
            onChangeText={(e) => console.log('e :>> ', e)}
          />
        </View>

        <View>
          <Text className=" text-xs mb-2 text-zoorya-green ">Password</Text>
          <TextInput
            className=" border p-4 rounded-md bg-zoorya-white text-zoorya-green border-zoorya-yellow"
            onChangeText={(e) => console.log('e :>> ', e)}
          />
        </View>

        <TouchableOpacity className="bg-zoorya-green p-4 border-0 rounded-md shadow-sm items-center w-full">
          <Text className="text-zoorya-white">Submit</Text>
        </TouchableOpacity>

        <Text className="text-center">
          Don't have account? <Link href="sign-up">
            <Text className="text-zoorya-yellow underline">Sign up</Text>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}