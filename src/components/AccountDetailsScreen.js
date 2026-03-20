import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AccountDetailsScreen({ onBack }) {
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={onBack}><Text allowFontScaling={false} style={styles.back}>←</Text></Pressable>
        <Text allowFontScaling={false} style={styles.title}>Account Details</Text>
        <View style={styles.slot} />
      </View>

      <View style={styles.content}>
        <TextInput allowFontScaling={false} style={styles.input} placeholder="Username" placeholderTextColor="#B2B2B2" value={username} onChangeText={setUsername} />
        <TextInput allowFontScaling={false} style={styles.input} placeholder="Mobile Number" placeholderTextColor="#B2B2B2" value={mobile} onChangeText={setMobile} />
        <TextInput allowFontScaling={false} style={styles.input} placeholder="Email" placeholderTextColor="#B2B2B2" value={email} onChangeText={setEmail} />
        <TextInput allowFontScaling={false} style={styles.input} placeholder="Password" placeholderTextColor="#B2B2B2" value={password} onChangeText={setPassword} secureTextEntry />

        <Pressable style={styles.btn}><Text allowFontScaling={false} style={styles.btnText}>Edit</Text></Pressable>
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
  input: {
    height: 42,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    paddingHorizontal: 14,
    marginBottom: 7,
    backgroundColor: '#F2F2F2',
    color: '#111',
    fontSize: 14,
  },
  btn: { marginTop: 2, height: 42, borderRadius: 13, backgroundColor: '#0A0A0A', alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
});
