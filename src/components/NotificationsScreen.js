import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';

export default function NotificationsScreen({ onBack }) {
  const [appNoti, setAppNoti] = useState(true);
  const [emailNoti, setEmailNoti] = useState(true);
  const [smsNoti, setSmsNoti] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={onBack}><Text allowFontScaling={false} style={styles.back}>←</Text></Pressable>
        <Text allowFontScaling={false} style={styles.title}>Notifications</Text>
        <View style={styles.slot} />
      </View>

      <View style={styles.content}>
        <SettingRow label="App Notification" value={appNoti} onChange={setAppNoti} />
        <SettingRow label="Email Notification" value={emailNoti} onChange={setEmailNoti} />
        <SettingRow label="SMS Notification" value={smsNoti} onChange={setSmsNoti} />
      </View>
    </SafeAreaView>
  );
}

function SettingRow({ label, value, onChange }) {
  return (
    <View style={styles.row}>
      <Text allowFontScaling={false} style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: '#DDD', true: '#22C77A' }} thumbColor="#FFF" />
    </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  label: { fontSize: 14, color: '#1F1F1F', fontWeight: '500' },
});
