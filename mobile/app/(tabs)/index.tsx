import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import ServicesCarousel from '../../views/home/services/ServicesCarousel';
import SlidersCarousel from '../../views/home/sliders/ServicesCarousel';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default () => {
  const { data, error, isError } = useQuery({ queryKey: ['services'], queryFn: () => axios.get(`${process.env.BACKEND_URL}/services`) });
  console.log('data :>> ', data);
  return (
    <View style={{ padding: 10 }}>
      <ScrollView>
        <View style={{ marginBottom: 10 }}>
          <Text>خدماتنا</Text>
          <ServicesCarousel />
        </View>
        <View>
          <Text>إعلانات</Text>
          <SlidersCarousel />
        </View>
      </ScrollView>
    </View>
  );
}