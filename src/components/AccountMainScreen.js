import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GENERAL_ITEMS = [
  { key: 'details', title: 'Account Details', subtitle: 'Edit your account information', icon: 'person-outline' },
  { key: 'payment', title: 'Payment Method', subtitle: 'Add your credit or debit Card', icon: 'card-outline' },
  { key: 'addresses', title: 'Delivery Addresses', subtitle: 'Edit or add new address', icon: 'location-outline' },
  { key: 'password', title: 'Security & Password', subtitle: 'Edit your password', icon: 'shield-checkmark-outline' },
];

const SETTING_ITEMS = [
  { key: 'notifications', title: 'Notifications', subtitle: 'Manage your notifications', icon: 'notifications-outline' },
  { key: 'language', title: 'Language', subtitle: '', icon: 'globe-outline' },
  { key: 'help', title: 'Help Center', subtitle: '', icon: 'help-circle-outline' },
  { key: 'privacy', title: 'Privacy & Policy', subtitle: '', icon: 'information-circle-outline' },
  { key: 'contact', title: 'Contact Us', subtitle: '', icon: 'call-outline' },
];

export default function AccountMainScreen({ onOpen, onLogout, onBack }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.title}>My Account</Text>
        <View style={styles.backSlot} />
      </View>

      <Text style={styles.sectionTitle}>General</Text>
      {GENERAL_ITEMS.map((item) => (
        <MenuRow key={item.key} item={item} onPress={() => onOpen(item.key)} />
      ))}

      <Text style={[styles.sectionTitle, styles.settingTitle]}>Setting</Text>
      {SETTING_ITEMS.map((item) => (
        <MenuRow key={item.key} item={item} onPress={() => onOpen(item.key)} />
      ))}

      <Pressable
        onPress={() =>
          Alert.alert('Logout', 'The less text people have to read onscreen, the better.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: onLogout },
          ])
        }
      >
        <Text style={styles.logout}>Log Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function MenuRow({ item, onPress }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.leftCol}>
        <View style={styles.iconWrap}>
          <Ionicons name={item.icon} size={16} color="#111" />
        </View>
        <View>
          <Text style={styles.rowTitle}>{item.title}</Text>
          {!!item.subtitle && <Text style={styles.rowSub}>{item.subtitle}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#222" />
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
  back: { width: 28, fontSize: 34, lineHeight: 34, color: '#0A0A0A' },
  backSlot: { width: 28 },
  title: { fontSize: 24, fontWeight: '700', color: '#0A0A0A', letterSpacing: -0.3 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#202020',
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 6,
  },
  settingTitle: { marginTop: 2 },
  row: {
    minHeight: 66,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftCol: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CECECE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowTitle: { fontSize: 14, fontWeight: '700', color: '#111' },
  rowSub: { marginTop: 1, fontSize: 9, color: '#9B9B9B' },
  logout: {
    marginTop: 14,
    marginBottom: 12,
    textAlign: 'center',
    color: '#E32121',
    fontSize: 12,
    fontWeight: '600',
  },
});
