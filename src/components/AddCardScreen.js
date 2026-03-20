import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddCardScreen({ onBack }) {
  const [holder, setHolder] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={onBack}><Text allowFontScaling={false} style={styles.back}>←</Text></Pressable>
        <Text allowFontScaling={false} style={styles.title}>Add New Card</Text>
        <View style={styles.slot} />
      </View>

      <View style={styles.content}>
        <View style={styles.scanBox}>
          <Ionicons name="scan" size={34} color="#0A0A0A" />
          <Text allowFontScaling={false} style={styles.scanText}>Scan your card here</Text>
        </View>

        <TextInput allowFontScaling={false} style={styles.input} placeholder="Cardholder Name" placeholderTextColor="#B2B2B2" value={holder} onChangeText={setHolder} />
        <TextInput allowFontScaling={false} style={styles.input} placeholder="Card Number" placeholderTextColor="#B2B2B2" value={number} onChangeText={setNumber} keyboardType="number-pad" />

        <View style={styles.row}>
          <TextInput allowFontScaling={false} style={[styles.input, styles.half]} placeholder="Expiry Date" placeholderTextColor="#B2B2B2" value={expiry} onChangeText={setExpiry} />
          <TextInput allowFontScaling={false} style={[styles.input, styles.half]} placeholder="CVV" placeholderTextColor="#B2B2B2" value={cvv} onChangeText={setCvv} keyboardType="number-pad" secureTextEntry />
        </View>

        <Pressable style={styles.btn}><Text allowFontScaling={false} style={styles.btnText}>Add Card</Text></Pressable>
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
  content: { flex: 1, paddingHorizontal: 20 },
  scanBox: {
    height: 106,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 4,
  },
  scanText: { fontSize: 14, color: '#0A0A0A', fontWeight: '600' },
  input: {
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    paddingHorizontal: 14,
    marginBottom: 7,
    backgroundColor: '#F2F2F2',
    color: '#111',
    fontSize: 14,
  },
  row: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  btn: { marginTop: 'auto', marginBottom: 14, height: 42, borderRadius: 12, backgroundColor: '#0A0A0A', alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
});
