import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useQuery } from '@tanstack/react-query';
import client from "../../utils/client";
import AnimalCard from "./animal-card";

export default () => {
  const { data: animals, isLoading } = useQuery({
    queryKey: ['animals'],
    queryFn: () => client.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/animals`)
  });

  if (isLoading) return (
    <View style={{ margin: 10 }}>
      <ActivityIndicator animating={isLoading} />
    </View>
  );

  return (
    <FlatList
      data={animals.data}
      renderItem={({ item }) => (
        <AnimalCard key={item.id} item={{ ...item, ...item?.resource }} />
      )}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
      columnWrapperStyle={{ gap: 5 }}
      numColumns={2}
      style={{ margin: 10, marginBottom: 60 }}
    />
  );
}