import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ServicesCarousel from '../../views/home/services/ServicesCarousel';
import SlidersCarousel from '../../views/home/sliders/ServicesCarousel';
import { SafeAreaView } from 'react-native-safe-area-context';

export default () => {
  return (
    <SafeAreaView className='bg-zoorya-white h-full'>
      <ScrollView>
        <View className="p-2">
          <View className="m-1" >
            <Text className="text-3xl font-bold text-center">Our Services</Text>
            <ServicesCarousel />
          </View>
          <View>
            <SlidersCarousel />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}