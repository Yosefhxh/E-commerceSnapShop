import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FAQS = [
  { id: '1', q: 'What is Snapshop?', a: 'Snapshop is an ecommerce app to discover products, save favorites, and purchase quickly.' },
  { id: '2', q: 'How do I track my order?', a: 'After checkout, your order status is available in your account order section.' },
  { id: '3', q: 'How to change payment method?', a: 'Open My Account > Payment Method and choose or add a new card.' },
  { id: '4', q: 'How can I contact support?', a: 'Use Contact Us from settings to reach customer service.' },
];

export default function HelpCenterScreen({ onBack }) {
  const [openId, setOpenId] = useState('1');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={onBack}><Text allowFontScaling={false} style={styles.back}>←</Text></Pressable>
        <Text allowFontScaling={false} style={styles.title}>Help Center</Text>
        <View style={styles.slot} />
      </View>

      <View style={styles.content}>
        <View style={styles.tabsRow}>
          <View style={[styles.tab, styles.tabActive]}><Text allowFontScaling={false} style={styles.tabActiveText}>General</Text></View>
          <View style={styles.tab}><Text allowFontScaling={false} style={styles.tabText}>Account</Text></View>
          <View style={styles.tab}><Text allowFontScaling={false} style={styles.tabText}>Service</Text></View>
        </View>

        {FAQS.map((item) => {
          const open = item.id === openId;
          return (
            <Pressable key={item.id} style={styles.faqCard} onPress={() => setOpenId(open ? '' : item.id)}>
              <View style={styles.faqHead}>
                <Text allowFontScaling={false} style={styles.faqQ}>{item.q}</Text>
                <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color="#111" />
              </View>
              {open && <Text allowFontScaling={false} style={styles.faqA}>{item.a}</Text>}
            </Pressable>
          );
        })}
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
  tabsRow: { flexDirection: 'row', gap: 6, marginBottom: 10 },
  tab: { paddingHorizontal: 9, height: 26, borderRadius: 13, borderWidth: 1, borderColor: '#D9D9D9', justifyContent: 'center' },
  tabActive: { backgroundColor: '#0A0A0A', borderColor: '#0A0A0A' },
  tabText: { color: '#B1B1B1', fontSize: 12, fontWeight: '500' },
  tabActiveText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  faqCard: { backgroundColor: '#EBEBEB', borderRadius: 10, padding: 9, marginBottom: 6 },
  faqHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQ: { flex: 1, fontSize: 14, fontWeight: '600', color: '#111' },
  faqA: { marginTop: 5, fontSize: 12, color: '#6F6F6F', lineHeight: 17 },
});
