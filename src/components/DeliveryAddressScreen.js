import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function AddressRow({ active, title, address, onPress }) {
  return (
    <Pressable style={[styles.addrCard, active && styles.addrActive]} onPress={onPress}>
      <View>
        <Text allowFontScaling={false} style={styles.addrTitle}>{title}</Text>
        <Text allowFontScaling={false} style={styles.addrText}>{address}</Text>
      </View>
      <Ionicons name={active ? 'radio-button-on' : 'radio-button-off'} size={20} color={active ? '#0A0A0A' : '#B8B8B8'} />
    </Pressable>
  );
}

export default function DeliveryAddressScreen({ selectedAddress, onSelectAddress, onAddNewAddress, onBack }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={onBack}><Text allowFontScaling={false} style={styles.back}>←</Text></Pressable>
        <Text allowFontScaling={false} style={styles.title}>Delivery Address</Text>
        <View style={styles.slot} />
      </View>

      <View style={styles.content}>
        <AddressRow
          active={selectedAddress === 'home'}
          title="Home"
          address="925 S Chugach St #APT 10, Alaska 99645"
          onPress={() => onSelectAddress('home')}
        />
        <AddressRow
          active={selectedAddress === 'office'}
          title="Office"
          address="2432 Main Street #APT 2, Anchorage 9907"
          onPress={() => onSelectAddress('office')}
        />

        <Pressable style={styles.addBtn} onPress={onAddNewAddress}>
          <Ionicons name="add" size={18} color="#FFF" />
          <Text allowFontScaling={false} style={styles.addText}>Add New Address</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F2F2F2' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
  },
  backBtn: { width: 28, justifyContent: 'center' },
  back: { width: 28, fontSize: 34, lineHeight: 34, color: '#0A0A0A' },
  slot: { width: 28 },
  title: { fontSize: 24, fontWeight: '700', color: '#0A0A0A', letterSpacing: -0.3 },
  content: { paddingHorizontal: 20 },
  addrCard: {
    minHeight: 66,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 14,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  addrActive: { borderColor: '#0A0A0A' },
  addrTitle: { fontSize: 14, color: '#111', fontWeight: '700', marginBottom: 2 },
  addrText: { fontSize: 12, color: '#9B9B9B', maxWidth: 230 },
  addBtn: {
    marginTop: 6,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  addText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
});
