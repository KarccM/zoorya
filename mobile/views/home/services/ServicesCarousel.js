import React from 'react'
import { ActivityIndicator, View } from 'react-native';
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './caroItem'
import { useQuery } from '@tanstack/react-query';
import client from '../../../utils/client';

const CarouselCards = () => {
  const { data: services, isLoading } = useQuery({ queryKey: ['services'], queryFn: () => client.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/services`) });

  const isCarousel = React.useRef(null);

  if (isLoading) return <View style={{ margin: 10 }}>
    <ActivityIndicator animating={isLoading} />
  </View>

  return (
    <View>
      <Carousel
        data={services.data}
        ref={isCarousel}
        useScrollView={true}
        layoutCardOffset={9}
        inactiveSlideShift={0}
        itemWidth={ITEM_WIDTH}
        sliderWidth={SLIDER_WIDTH}
        renderItem={CarouselCardItem}
      />
    </View>
  )
}

export default CarouselCards