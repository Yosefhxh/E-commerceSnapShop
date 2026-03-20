import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TermsScreen({ onBack }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={onBack}><Text allowFontScaling={false} style={styles.back}>←</Text></Pressable>
        <Text allowFontScaling={false} style={styles.title}>Terms & Conditions</Text>
        <View style={styles.slot} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text allowFontScaling={false} style={styles.updated}>Last update: 17/2/2023</Text>
        <Text allowFontScaling={false} style={styles.p}>Please read these terms of service, carefully before using our app operated by us.</Text>

        <Text allowFontScaling={false} style={styles.h2}>Conditions of Uses</Text>
        <Text allowFontScaling={false} style={styles.p}>
          It is a long established fact that a reader will be distracted by the readable content of a page when
          looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
          of letters, as opposed to using 'Content here, content here', making it look like readable English.
          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
          and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
        </Text>
      </ScrollView>
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
  content: { paddingBottom: 20, paddingHorizontal: 20 },
  updated: { color: '#1F1F1F', fontSize: 12, marginBottom: 5 },
  h2: { fontSize: 16, color: '#111', fontWeight: '700', marginBottom: 4 },
  p: { color: '#4E4E4E', fontSize: 13, lineHeight: 18, marginBottom: 7 },
});
