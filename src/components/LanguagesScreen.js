import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SUGGESTED = ['English (US)', 'English (UK)'];
const LANGUAGES = ['Mandarin', 'Hindi', 'Spanish', 'French', 'Arabic', 'Bengali', 'Russian', 'Indonesia'];

export default function LanguagesScreen({ onBack }) {
  const [selected, setSelected] = useState('English (US)');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={onBack}><Text allowFontScaling={false} style={styles.back}>←</Text></Pressable>
        <Text allowFontScaling={false} style={styles.title}>Languages</Text>
        <View style={styles.slot} />
      </View>

      <View style={styles.content}>
        <Text allowFontScaling={false} style={styles.section}>Suggested</Text>
        {SUGGESTED.map((item) => (
          <LangRow key={item} label={item} selected={selected === item} onPress={() => setSelected(item)} />
        ))}

        <View style={styles.hr} />
        <Text allowFontScaling={false} style={styles.section}>Language</Text>
        {LANGUAGES.map((item) => (
          <LangRow key={item} label={item} selected={selected === item} onPress={() => setSelected(item)} />
        ))}
      </View>
    </SafeAreaView>
  );
}

function LangRow({ label, selected, onPress }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Text allowFontScaling={false} style={styles.label}>{label}</Text>
      <Ionicons name={selected ? 'checkmark-circle' : 'ellipse-outline'} size={20} color="#0A0A0A" />
    </Pressable>
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
  section: { fontSize: 14, fontWeight: '700', color: '#1F1F1F', marginBottom: 3 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  label: { fontSize: 14, color: '#1F1F1F', fontWeight: '500' },
  hr: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 6 },
});
