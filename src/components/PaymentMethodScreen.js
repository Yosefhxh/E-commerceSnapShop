import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function CardItem({ active, title, number, onPress }) {
  return (
    <Pressable style={[styles.cardRow, active && styles.cardActive]} onPress={onPress}>
      <View style={styles.cardInfo}>
        <Text allowFontScaling={false} style={styles.cardTitle}>{title}</Text>
        <Text allowFontScaling={false} style={styles.cardNumber}>{number}</Text>
      </View>
      <Ionicons name={active ? 'radio-button-on' : 'radio-button-off'} size={20} color={active ? '#0A0A0A' : '#B8B8B8'} />
    </Pressable>
  );
}

export default function PaymentMethodScreen({ selectedCard, onSelectCard, onAddCard, onBack }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={onBack}><Text allowFontScaling={false} style={styles.back}>←</Text></Pressable>
        <Text allowFontScaling={false} style={styles.title}>Payment Method</Text>
        <View style={styles.slot} />
      </View>

      <View style={styles.content}>
        <CardItem active={selectedCard === 'visa'} title="Visa" number="**** **** **** 2512" onPress={() => onSelectCard('visa')} />
        <CardItem active={selectedCard === 'mastercard'} title="Master Card" number="**** **** **** 5258" onPress={() => onSelectCard('mastercard')} />

        <Pressable style={styles.addBtn} onPress={onAddCard}>
          <Ionicons name="add" size={18} color="#FFF" />
          <Text allowFontScaling={false} style={styles.addText}>Add New Card</Text>
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
  cardRow: {
    height: 58,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardActive: { borderColor: '#0A0A0A' },
  cardInfo: { gap: 2 },
  cardTitle: { fontSize: 14, color: '#111', fontWeight: '700' },
  cardNumber: { fontSize: 12, color: '#9B9B9B' },
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
