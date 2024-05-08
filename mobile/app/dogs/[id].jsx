import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native"
import client from "../../utils/client";

export default () => {
  const localSearchParams = useLocalSearchParams();
  console.log('localSearchParams.id :>> ', localSearchParams.id);
  const { data: dog, isLoading } = useQuery({
    queryKey: ['dog', localSearchParams.id],
    queryFn: () => client.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/dogs/${localSearchParams.id}`)
      .then(data => {
        console.log('data :>> ', data);
        return data.data
      })
  });

  if (isLoading) return <View style={{ margin: 10 }}>
    <ActivityIndicator animating={isLoading} />
  </View>

  console.log('dog :>> ', dog);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL_STORAGE}/${dog?.path}` }}
        style={styles.image}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.contentCard}>
          <View style={styles.textWapper}>
            <Text style={styles.title} >{dog?.name}</Text>
            {/* <Text style={styles.category}>({dog?.category?.name})</Text> */}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.blueChip}>
              <Text style={styles.blueChipText}>Male</Text>
            </View>
            <View style={styles.redChip}>
              <Text style={styles.redChipText}>{dog?.age} Yrs</Text>
            </View>
            <View style={styles.orangeChip}>
              <Text style={styles.orangeChipText}>{dog?.weight} kg</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    height: '60%'
  },
  contentWrapper: {
    position: 'absolute',
    alignItems: 'center',
    top: '56%',
    zIndex: 10,
    backgroundColor: 'rgba(239, 239, 239, 1)',
    color: 'white',
    width: '100%',
    height: '52%',
    borderRadius: 24,
  },
  contentCard: {
    width: '80%',
    margin: 'auto',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.65,
    elevation: 3,
  }, textWapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    width: '100%'
  },
  title: {
    fontWeight: '800',
    fontSize: 16,
  },
  category: {
    fontWeight: '500',
    fontSize: 14,
    color: '#666'
  },
  favoriteBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: `rgba(0,0,0,0.6)`,
    padding: 5,
    borderRadius: 4,
  },
  blueChip: {
    backgroundColor: '#DBE7EA',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginHorizontal: 3,
    marginTop: 8,
    alignSelf: 'start',
    padding: 12,
  },
  redChip: {
    backgroundColor: '#FEE2E2',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginHorizontal: 3,
    marginTop: 8,
    alignSelf: 'start',
    padding: 12,
  },
  orangeChip: {
    backgroundColor: '#FCD34D',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginHorizontal: 3,
    marginTop: 8,
    alignSelf: 'start',
    padding: 12,
  },
  blueChipText: {
    color: '#1E40AF',
    fontWeight: '600',
    fontSize: 12,
  },
  redChipText: {
    color: '#B91C1C',
    fontWeight: '600',
    fontSize: 12,
  },
  orangeChipText: {
    color: '#D97706',
    fontWeight: '600',
    fontSize: 12,
  }
});