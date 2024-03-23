import { Tabs } from "expo-router"
import { FontAwesome5 } from '@expo/vector-icons';

export default () => {
  return (
    <Tabs>
      <Tabs.Screen name="services/index" options={{
        title: 'Services',
        headerTitle: 'Services',
        tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="hands-helping" color={color} />,
      }} />
      <Tabs.Screen name="clinics/index" options={{
        title: 'Clinics',
        headerTitle: 'Clinics',
        tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="medkit" color={color} />,
      }} />
      <Tabs.Screen name="index" options={{
        title: 'Home',
        headerTitle: 'Home',
        tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="home" color={color} />,
      }} initial />
      <Tabs.Screen name="store/index" options={{
        title: 'Store',
        headerTitle: 'Store',
        tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="store" color={color} />,
      }} />
      <Tabs.Screen name="profile/index" options={{
        title: 'Profile',
        headerTitle: 'Profile',
        tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="user" color={color} />,
      }} />
    </Tabs>
  );
}