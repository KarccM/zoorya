import React from 'react'
import { FlatList, Text, View } from 'react-native'
import Chip from '../../../components/chip';

export default () => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      active: true,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      active: false,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      active: false,
    },
  ];

  return (
    <View>
      <Text>Stoooore</Text>
    </View>
  );
}