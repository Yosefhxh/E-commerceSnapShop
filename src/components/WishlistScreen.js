import { useRef } from 'react';
import { Animated, FlatList, Image, PanResponder, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function SwipeRemoveWishlistItem({ item, onOpenProduct, onToggleFavorite }) {
  const dragX = useRef(new Animated.Value(0)).current;

  const reset = () => {
    Animated.spring(dragX, {
      toValue: 0,
      useNativeDriver: true,
      damping: 16,
      stiffness: 230,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => (
        Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy)
      ),
      onPanResponderMove: (_, gesture) => {
        const next = Math.max(-110, Math.min(0, gesture.dx));
        dragX.setValue(next);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -70) {
          Animated.timing(dragX, {
            toValue: -130,
            duration: 120,
            useNativeDriver: true,
          }).start(() => {
            onToggleFavorite(item.id);
            dragX.setValue(0);
          });
          return;
        }
        reset();
      },
      onPanResponderTerminate: reset,
      onPanResponderTerminationRequest: () => false,
    })
  ).current;

  const removeHintOpacity = dragX.interpolate({
    inputRange: [-90, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.swipeRow}>
      <Animated.View style={[styles.removeBg, { opacity: removeHintOpacity }]}>
        <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
        <Text style={styles.removeText}>Remove</Text>
      </Animated.View>

      <Animated.View style={{ transform: [{ translateX: dragX }] }} {...panResponder.panHandlers}>
        <Pressable style={styles.card} onPress={() => onOpenProduct(item)}>
          <Image source={{ uri: item.image }} style={styles.thumb} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
          <Pressable onPress={() => onToggleFavorite(item.id)} style={styles.heartBtn}>
            <Ionicons name="heart" size={20} color="#0A0A0A" />
          </Pressable>
        </Pressable>
      </Animated.View>
    </View>
  );
}

export default function WishlistScreen({ items, onOpenProduct, onToggleFavorite }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Ionicons name="heart-outline" size={42} color="#A5A5A5" />
          <Text style={styles.emptyTitle}>No favorite products yet</Text>
          <Text style={styles.emptyText}>Tap the heart icon on products to save them here.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <SwipeRemoveWishlistItem
              item={item}
              onOpenProduct={onOpenProduct}
              onToggleFavorite={onToggleFavorite}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F7F7' },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#0A0A0A' },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  emptyTitle: { marginTop: 12, fontSize: 20, fontWeight: '700', color: '#0A0A0A' },
  emptyText: { marginTop: 8, fontSize: 14, textAlign: 'center', color: '#838383' },
  list: { padding: 20, paddingTop: 10, gap: 12 },
  swipeRow: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  removeBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 126,
    borderRadius: 16,
    backgroundColor: '#D93B3B',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  removeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
  },
  thumb: { width: 78, height: 78, borderRadius: 12, backgroundColor: '#ECECEC' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, fontWeight: '600', color: '#0A0A0A' },
  category: { marginTop: 4, fontSize: 13, color: '#7B7B7B' },
  price: { marginTop: 8, fontSize: 22, fontWeight: '700', color: '#0A0A0A', letterSpacing: -0.4 },
  heartBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },
});
