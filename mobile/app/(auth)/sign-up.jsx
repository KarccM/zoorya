import { Link } from "expo-router";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
  return (
    <SafeAreaView>
      <View className="space-y-6 mx-4">
        <Text className="text-2xl text-zoorya-black font-semibold text-center">
          Sign up with <Text className="text-zoorya-yellow font-bold">Zoorya</Text>
        </Text>
        <View>
          <Text className=" text-xs mb-2 text-zoorya-green ">Username</Text>
          <TextInput
            className=" border p-4 rounded-md bg-zoorya-white text-zoorya-green border-zoorya-yellow"
            onChangeText={(e) => console.log('e :>> ', e)}
          />
        </View>

        <View>
          <Text className=" text-xs mb-2 text-zoorya-green ">Email</Text>
          <TextInput
            className=" border p-4 rounded-md bg-zoorya-white text-zoorya-green border-zoorya-yellow"
            onChangeText={(e) => console.log('e :>> ', e)}
          />
        </View>

        <View>
          <Text className=" text-xs mb-2 text-zoorya-green ">Gender</Text>
          <TextInput
            className=" border p-4 rounded-md bg-zoorya-white text-zoorya-green border-zoorya-yellow"
            onChangeText={(e) => console.log('e :>> ', e)}
          />
        </View>

        <View>
          <Text className=" text-xs mb-2 text-zoorya-green ">Phone</Text>
          <TextInput
            className=" border p-4 rounded-md bg-zoorya-white text-zoorya-green border-zoorya-yellow"
            onChangeText={(e) => console.log('e :>> ', e)}
          />
        </View>

        <View>
          <Text className=" text-xs mb-2 text-zoorya-green ">Age</Text>
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
          I already have account? <Link href="sign-in">
            <Text className="text-zoorya-yellow underline">Sign in</Text>
          </Link>
        </Text>

      </View>
    </SafeAreaView>
  );
}