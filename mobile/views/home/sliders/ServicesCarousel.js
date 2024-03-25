import React from 'react'
import { View, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './caroItem'
import { useQuery } from '@tanstack/react-query';
import client from '../../../utils/client';

const CarouselCards = () => {
  const { data: sliders, isLoading, isError } = useQuery({ queryKey: ['sliders'], queryFn: () => client.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/sliders`) });

  const isCarousel = React.useRef(null)

  if (isLoading) return <View style={{ margin: 10 }}>
    <ActivityIndicator animating={isLoading} />
  </View>

  return (
    <View>
      <Carousel
        data={sliders.data}
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