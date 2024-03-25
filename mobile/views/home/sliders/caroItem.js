import React from 'react'
import { View, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL_STORAGE}/${item.path}` }} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: ITEM_WIDTH,
    shadowRadius: 4.65,
    height: 400,
    overflow: 'hidden',
  },
  image: {
    width: ITEM_WIDTH,
    height: 400,
  },
})

export default CarouselCardItem