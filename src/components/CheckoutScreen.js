import { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CheckoutScreen({
  items,
  address,
  onBack,
  onOpenAddress,
  onPlaceOrder,
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const shipping = useMemo(() => (subtotal > 0 ? 24.36 : 0), [subtotal]);
  const discount = useMemo(() => (subtotal > 120 ? 20 : 0), [subtotal]);
  const total = useMemo(() => subtotal + shipping - discount, [subtotal, shipping, discount]);

  const canPlace = items.length > 0 && cardNumber.trim() && cardHolder.trim() && expDate.trim() && cvv.trim();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={onBack}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.title}>Checkout</Text>
        <View style={styles.backSlot} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Delivery Location</Text>
        <View style={styles.locationRow}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=200&q=80' }}
            style={styles.locationAvatar}
          />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLine1}>{address.line1}</Text>
            <Text style={styles.locationLine2}>{address.city}</Text>
          </View>
          <Pressable onPress={onOpenAddress}>
            <Ionicons name="pencil-outline" size={18} color="#8B8B8B" />
          </Pressable>
        </View>

        <Text style={[styles.sectionTitle, styles.paymentTitle]}>Payment Method</Text>
        <View style={styles.paymentMethods}>
          <View style={styles.methodBtn}><Text style={styles.methodText}>VISA</Text></View>
          <View style={styles.methodBtn}><Text style={styles.methodText}>PayPal</Text></View>
          <View style={styles.methodBtn}><Text style={styles.methodText}>Master</Text></View>
        </View>

        <View style={styles.cardPreview}>
          <View style={styles.cardTop}>
            <Ionicons name="card-outline" size={18} color="#FFFFFF" />
            <Text style={styles.cardDots}>•••</Text>
          </View>
          <Text style={styles.cardNumPreview}>5698   56254   6786   9979</Text>
          <Text style={styles.cardHolderLabel}>Card Holder</Text>
          <Text style={styles.cardHolderValue}>{cardHolder || 'Name Here'}</Text>
          <View style={styles.cardBadge} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Card Number"
          placeholderTextColor="#9B9B9B"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Card Holder"
          placeholderTextColor="#9B9B9B"
          value={cardHolder}
          onChangeText={setCardHolder}
        />

        <View style={styles.rowInputs}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Exp date"
            placeholderTextColor="#9B9B9B"
            value={expDate}
            onChangeText={setExpDate}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="CVV"
            placeholderTextColor="#9B9B9B"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="number-pad"
            secureTextEntry
          />
        </View>

        <View style={styles.summary}>
          <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <SummaryRow label="Shipping" value={`$${shipping.toFixed(2)}`} />
          <SummaryRow label="Discount" value={`-$${discount.toFixed(2)}`} />
          <SummaryRow label="Total" value={`$${total.toFixed(2)}`} isStrong />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalSmall}>TOTAL ${total.toFixed(2)}</Text>
          <Text style={styles.vat}>Vat included</Text>
        </View>
        <Pressable
          style={[styles.placeBtn, !canPlace && styles.placeBtnDisabled]}
          onPress={() => canPlace && onPlaceOrder()}
          disabled={!canPlace}
        >
          <Text style={styles.placeText}>Place Order</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value, isStrong }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, isStrong && styles.summaryLabelStrong]}>{label}</Text>
      <Text style={[styles.summaryValue, isStrong && styles.summaryValueStrong]}>{value}</Text>
    </View>
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
  back: { fontSize: 28, lineHeight: 28, color: '#0A0A0A' },
  backSlot: { width: 30 },
  title: { fontSize: 31, fontWeight: '700', color: '#0A0A0A', letterSpacing: -0.6 },
  content: { paddingHorizontal: 16, paddingBottom: 130 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#202020', marginBottom: 10 },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F4',
    borderRadius: 12,
    padding: 10,
  },
  locationAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E3E3E5' },
  locationInfo: { flex: 1, marginLeft: 10 },
  locationLine1: { fontSize: 14, fontWeight: '600', color: '#101010' },
  locationLine2: { marginTop: 2, fontSize: 12, color: '#8A8A8A' },
  paymentTitle: { marginTop: 14 },
  paymentMethods: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  methodBtn: {
    flex: 1,
    backgroundColor: '#F2F2F4',
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodText: { fontSize: 14, fontWeight: '700', color: '#222' },
  cardPreview: {
    backgroundColor: '#060606',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardDots: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  cardNumPreview: { marginTop: 14, color: '#FFFFFF', fontSize: 20, letterSpacing: 0.6 },
  cardHolderLabel: { marginTop: 10, color: '#BEBEBE', fontSize: 11 },
  cardHolderValue: { marginTop: 2, color: '#FFFFFF', fontSize: 19, fontWeight: '600' },
  cardBadge: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    width: 34,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F19952',
  },
  input: {
    height: 44,
    borderRadius: 12,
    backgroundColor: '#0A0A0A',
    color: '#FFFFFF',
    paddingHorizontal: 14,
    fontSize: 14,
    marginBottom: 10,
  },
  rowInputs: { flexDirection: 'row', gap: 10 },
  halfInput: { flex: 1 },
  summary: { marginTop: 8, paddingTop: 6 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: { color: '#A2A2A2', fontSize: 13 },
  summaryValue: { color: '#222', fontSize: 14, fontWeight: '600' },
  summaryLabelStrong: { color: '#707070', fontWeight: '700' },
  summaryValueStrong: { fontWeight: '800' },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalSmall: { fontSize: 17, fontWeight: '800', color: '#111' },
  vat: { marginTop: 2, fontSize: 12, color: '#B0B0B0' },
  placeBtn: {
    backgroundColor: '#0A0A0A',
    height: 52,
    minWidth: 138,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  placeBtnDisabled: {
    opacity: 0.45,
  },
  placeText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});
