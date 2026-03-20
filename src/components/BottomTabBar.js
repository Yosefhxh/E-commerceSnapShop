import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TABS = [
  { id: 'home', icon: 'home-outline' },
  { id: 'search', icon: 'grid-outline' },
  { id: 'wishlist', icon: 'heart-outline' },
  { id: 'bag', icon: 'bag-outline' },
  { id: 'profile', icon: 'person-outline' },
];

export default function BottomTabBar({ activeTab, onTabPress, cartCount }) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
          >
            <View
              style={[
                styles.iconWrap,
                isActive && styles.iconWrapActive,
              ]}
            >
              <Ionicons
                name={tab.icon}
                size={isActive ? 20 : 26}
                color={isActive ? '#FFFFFF' : '#1F242C'}
              />
              {tab.id === 'bag' && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          </Pressable>
        );
      })}
      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: '#0A0A0A',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 9,
    alignSelf: 'center',
    width: 140,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#0A0A0A',
    left: '50%',
    marginLeft: -70,
  },
});
