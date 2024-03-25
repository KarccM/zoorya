import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ServicesCarousel from '../../views/home/services/ServicesCarousel';
import SlidersCarousel from '../../views/home/sliders/ServicesCarousel';

export default () => {
  return (
    <View style={{ padding: 10 }}>
      <ScrollView>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.servicesTitle}>Our Services</Text>
          <ServicesCarousel />
        </View>
        <View>
          <SlidersCarousel />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  servicesTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  }
})