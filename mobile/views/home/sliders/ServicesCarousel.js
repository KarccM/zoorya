import React from 'react'
import { View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './caroItem'
import data from './data'

const CarouselCards = () => {
  const isCarousel = React.useRef(null)

  return (
    <View>
      <Carousel
        data={data}
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