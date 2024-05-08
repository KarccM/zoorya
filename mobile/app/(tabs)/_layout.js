import { Tabs } from "expo-router"
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F4CE14',
        tabBarInactiveTintColor: '#F5F7F8',
        tabBarStyle: {
          backgroundColor: '#45474B'
        }
      }}
    >
      <Tabs.Screen name="pets/index" options={{
        title: 'Pets',
        headerTitle: 'Pets',
        headerShown: false,
        tabBarIcon: ({ color }) => <MaterialIcons name="pets" size={28} color={color} />,
      }} />

      <Tabs.Screen name="clinics/index" options={{
        title: 'Clinics',
        headerTitle: 'Clinics',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="medkit" color={color} />,
      }} />
      <Tabs.Screen name="index" options={{
        title: 'Home',
        headerTitle: 'Home',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="home" color={color} />,
      }} initial />
      <Tabs.Screen name="store/index" options={{
        title: 'Store',
        headerTitle: 'Store',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="store" color={color} />,
      }} />
      <Tabs.Screen name="profile/index" options={{
        title: 'Profile',
        headerTitle: 'Profile',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="user" color={color} />,
      }} />
    </Tabs >

  );
}