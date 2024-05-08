import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from "expo-router";

export default ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL_STORAGE}/${item.path}` }} style={styles.image} />
      <TouchableOpacity style={styles.favoriteBtn}>
        <FontAwesome5 size={28} name="heart" color="#fff" />
      </TouchableOpacity>
      <Link href={`dogs/${item.id}`}>
        <Pressable>
          <View style={{ marginHorizontal: 6, marginTop: 4 }}>
            <View style={styles.textWapper}>
              <Text style={styles.title} >{item.name}</Text>
              <Text style={styles.category}>({item.category?.name})</Text>
            </View>
            <View>
              <View style={styles.chip}>
                <Text style={styles.chipText}> Male {item.age}Yrs</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: '50%',
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    overflow: 'hidden',
    position: 'relative',
    flex: 1,

  },
  image: {
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
  textWapper: {
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
  chip: {
    backgroundColor: '#DBE7EA',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginHorizontal: 3,
    marginTop: 8,
    alignSelf: 'start',
    padding: 12

  },
  chipText: {
    color: '#1E40AF',
    fontWeight: '600',
    fontSize: 12,
  }
});