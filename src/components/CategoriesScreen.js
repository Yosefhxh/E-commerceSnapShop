import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const CATEGORY_ITEMS = [
  {
    id: '1',
    title: 'Handbag',
    targetCategory: 'Woman',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&q=80',
  },
  {
    id: '2',
    title: 'Shoulder bags',
    targetCategory: 'Woman',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=300&q=80',
  },
  {
    id: '3',
    title: 'Wallet & Clutch',
    targetCategory: 'Man',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&q=80',
  },
  {
    id: '4',
    title: 'Backpacks',
    targetCategory: 'Kids',
    image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=300&q=80',
  },
  {
    id: '5',
    title: 'Luggage',
    targetCategory: 'All',
    image: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=300&q=80',
  },
];

export default function CategoriesScreen({ onBack, onSelectCategory }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.title}>Categories</Text>
        <View style={styles.backSlot} />
      </View>

      <FlatList
        data={CATEGORY_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => onSelectCategory?.(item.targetCategory)}
          >
            <View style={styles.thumbWrap}>
              <Image source={{ uri: item.image }} style={styles.thumb} resizeMode="cover" />
            </View>
            <Text style={styles.label}>{item.title}</Text>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
  },
  backBtn: {
    width: 34,
    height: 34,
    justifyContent: 'center',
  },
  back: {
    fontSize: 36,
    color: '#0A0A0A',
    lineHeight: 36,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0A0A0A',
    letterSpacing: -0.3,
  },
  backSlot: {
    width: 34,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    minHeight: 126,
  },
  thumbWrap: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#ECECF1',
    overflow: 'hidden',
    marginRight: 18,
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A0A0A',
  },
  separator: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginLeft: 20,
    marginRight: 0,
  },
});
