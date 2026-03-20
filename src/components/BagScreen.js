import { useMemo } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BagScreen({ items, onIncrease, onDecrease, onRemove, onBack, onCheckout }) {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={onBack}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.title}>Bag</Text>
        <View style={styles.backSlot} />
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Ionicons name="bag-outline" size={36} color="#A6A6A6" />
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptyText}>Add products from Home to see them here.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <View style={styles.imageWrap}>
                <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
              </View>

              <View style={styles.itemInfo}>
                <View style={styles.itemTopRow}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Pressable onPress={() => onRemove(item.id)} style={styles.removeBtn}>
                    <Ionicons name="close" size={22} color="#222" />
                  </Pressable>
                </View>

                <Text style={styles.meta}>Color / <Text style={styles.dot}>●</Text>  |  Size/32 MM</Text>

                <View style={styles.qtyRow}>
                  <Pressable style={styles.circleBtn} onPress={() => onDecrease(item.id)}>
                    <Ionicons name="remove" size={16} color="#1B1B1B" />
                  </Pressable>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <Pressable style={styles.circleBtn} onPress={() => onIncrease(item.id)}>
                    <Ionicons name="add" size={16} color="#1B1B1B" />
                  </Pressable>
                </View>

                <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            </View>
          )}
          ListFooterComponent={
            <View style={styles.totalWrap}>
              <Text style={styles.totalLabel}>Total Price :</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          }
        />
      )}

      <View style={styles.footer}>
        <Pressable
          style={[styles.checkoutBtn, items.length === 0 && styles.checkoutBtnDisabled]}
          onPress={onCheckout}
          disabled={items.length === 0}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F7F7' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backBtn: { width: 30, height: 30, justifyContent: 'center' },
  back: { fontSize: 28, color: '#0A0A0A', lineHeight: 28 },
  backSlot: { width: 30 },
  title: { fontSize: 20, fontWeight: '700', color: '#0A0A0A' },
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  emptyTitle: { marginTop: 10, fontSize: 18, fontWeight: '700', color: '#0A0A0A' },
  emptyText: { marginTop: 6, color: '#8E8E8E', textAlign: 'center', fontSize: 13 },
  list: { paddingHorizontal: 16, paddingBottom: 160, paddingTop: 6, gap: 10 },
  itemCard: {
    backgroundColor: '#F3F3F6',
    borderRadius: 16,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrap: { width: 84, height: 84, borderRadius: 12, backgroundColor: '#E5E5E9', overflow: 'hidden' },
  itemImage: { width: '100%', height: '100%' },
  itemInfo: { flex: 1, marginLeft: 10 },
  itemTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  itemName: { flex: 1, fontSize: 15, fontWeight: '600', color: '#0A0A0A' },
  removeBtn: { marginLeft: 6 },
  meta: { marginTop: 4, color: '#787878', fontSize: 12 },
  dot: { color: '#3A5A26' },
  qtyRow: { marginTop: 8, flexDirection: 'row', alignItems: 'center' },
  circleBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2F2F2F',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  qtyText: { marginHorizontal: 12, fontSize: 18, fontWeight: '600', color: '#0A0A0A' },
  price: { marginTop: 8, fontSize: 16, fontWeight: '700', color: '#0A0A0A', letterSpacing: -0.2 },
  totalWrap: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 8,
  },
  totalLabel: { fontSize: 16, color: '#ABABAB', fontWeight: '600' },
  totalValue: { fontSize: 28, color: '#0A0A0A', fontWeight: '800', letterSpacing: -0.4 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 28,
    backgroundColor: '#F7F7F7',
  },
  checkoutBtn: {
    backgroundColor: '#0A0A0A',
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutBtnDisabled: {
    opacity: 0.45,
  },
  checkoutText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});
