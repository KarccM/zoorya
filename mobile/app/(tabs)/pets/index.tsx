import React, { useState } from 'react'
import { ActivityIndicator, FlatList, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import Chip from '../../../components/chip';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../../../utils/client';
import Animals from '../../../views/store/animals';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

export default () => {

  const [activeCategories, setActiveCategories] = useState([]);
  const queryClient = useQueryClient();
  const { data: categories, isLoading } = useQuery({ queryKey: ['categories'], queryFn: () => client.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/categories`) });

  const handleCategoryPress = (category) => {
    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter(item => item !== category));
    } else {
      setActiveCategories([...activeCategories, category]);
    }
  }

  if (isLoading) return (
    <View style={{ margin: 10 }}>
      <ActivityIndicator animating={isLoading} />
    </View>
  );

  return (
    <SafeAreaView className='bg-zoorya-white h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View>
          {/* <View className='flex flex-row items-center rounded-lg border-2 m-2 bg-zoorya-yellow'>
            <TextInput
              className="border p-4 rounded-l-md bg-zoorya-white text-zoorya-green border-zoorya-yellow w-4/5"
              onChangeText={(e) => console.log('e :>> ', e)}
              placeholder="Search..."
            />
            <View>
              <TouchableOpacity>
                <FontAwesome name="search" size={24} color="color" />
              </TouchableOpacity>
            </View>

          </View> */}
          <View>
            <View className='flex flex-row items-center rounded-lg border-2 m-2 bg-zoorya-yellow'>
              <TextInput
                className="border p-4 rounded-l-md bg-zoorya-white text-zoorya-green border-zoorya-yellow w-4/5"
                onChangeText={(e) => console.log('e :>> ', e)}
                placeholder="Search..."
              />
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity>
                  <FontAwesome name="search" size={24} color="color" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <FlatList
            data={categories?.data}
            renderItem={
              ({ item }) => (
                <Chip
                  key={item.id}
                  active={activeCategories.includes(item.name)}
                  title={item.name}
                  onPress={() => handleCategoryPress(item.name)}
                />
              )}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className='my-2 mx-1'
          />
          <Animals />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}