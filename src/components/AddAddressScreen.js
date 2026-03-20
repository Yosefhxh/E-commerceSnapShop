import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  NativeModules,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const hasMapsModule = Boolean(
  NativeModules?.RNMapsAirModule || NativeModules?.AIRMapModule
);

let Location = null;
try {
  Location = require('expo-location');
} catch {
  Location = null;
}
const hasLocationModule = Boolean(Location);

let MapView = null;
let Marker = null;
if (hasMapsModule) {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
}

export default function AddAddressScreen({ initialAddress, onBack, onSave }) {
  const [line1, setLine1] = useState(initialAddress.line1);
  const [city, setCity] = useState(initialAddress.city);
  const [isLocating, setIsLocating] = useState(false);
  const [searchText, setSearchText] = useState(initialAddress.line1);
  const [region, setRegion] = useState({
    latitude: 24.8949,
    longitude: 91.8687,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const marker = useMemo(
    () => ({ latitude: region.latitude, longitude: region.longitude }),
    [region.latitude, region.longitude]
  );

  const reverseLookup = async (coords) => {
    if (!hasLocationModule) {
      return;
    }
    try {
      const results = await Location.reverseGeocodeAsync(coords);
      const first = results?.[0];
      if (!first) {
        return;
      }

      const street = [first.streetNumber, first.street].filter(Boolean).join(' ').trim();
      const district = [first.city, first.region, first.postalCode].filter(Boolean).join(', ').trim();

      if (street) {
        setLine1(street);
        setSearchText(street);
      }
      if (district) {
        setCity(district);
      }
    } catch {
      // Ignore reverse geocode failures and keep current text values.
    }
  };

  const locateMe = async () => {
    if (!hasLocationModule) {
      Alert.alert('Location unavailable', 'This build does not include ExpoLocation yet. Rebuild the iOS app to enable it.');
      return;
    }

    setIsLocating(true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Location needed', 'Enable location permission to use your current position.');
        return;
      }

      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const nextRegion = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(nextRegion);
      await reverseLookup({ latitude: nextRegion.latitude, longitude: nextRegion.longitude });
    } catch {
      Alert.alert('Location error', 'Unable to fetch your current location right now.');
    } finally {
      setIsLocating(false);
    }
  };

  const searchAddress = async () => {
    if (!hasLocationModule) {
      Alert.alert('Search unavailable', 'Address search needs ExpoLocation in the native build.');
      return;
    }

    const query = searchText.trim();
    if (!query) {
      return;
    }

    setIsLocating(true);
    try {
      const results = await Location.geocodeAsync(query);
      if (!results?.length) {
        Alert.alert('Not found', 'No location found for that address.');
        return;
      }

      const first = results[0];
      const nextRegion = {
        latitude: first.latitude,
        longitude: first.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(nextRegion);
      await reverseLookup({ latitude: first.latitude, longitude: first.longitude });
    } catch {
      Alert.alert('Search error', 'Unable to search this address right now.');
    } finally {
      setIsLocating(false);
    }
  };

  useEffect(() => {
    locateMe();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      {hasMapsModule && MapView && Marker ? (
        <MapView
          style={styles.mapBg}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          <Marker
            coordinate={marker}
            draggable
            onDragEnd={(e) => {
              const coords = e.nativeEvent.coordinate;
              setRegion((prev) => ({ ...prev, latitude: coords.latitude, longitude: coords.longitude }));
              reverseLookup(coords);
            }}
          />
        </MapView>
      ) : (
        <View style={styles.mapFallback}>
          <Ionicons name="map-outline" size={28} color="#6B6B6B" />
          <Text style={styles.mapFallbackTitle}>Map preview unavailable in current build</Text>
          <Text style={styles.mapFallbackText}>
            You can still use current location and search address.
          </Text>
        </View>
      )}

      <View style={styles.overlay}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={onBack}>
            <Text style={styles.back}>←</Text>
          </Pressable>
          <Text style={styles.title}>Add New Address</Text>
          <View style={styles.backSlot} />
        </View>

        <View style={styles.searchBar}>
          <Pressable onPress={searchAddress}>
            <Ionicons name="search-outline" size={18} color="#FFFFFF" />
          </Pressable>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#CFCFCF"
            returnKeyType="search"
            onSubmitEditing={searchAddress}
          />
          <Pressable style={styles.locateBtn} onPress={locateMe}>
            {isLocating ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Ionicons name="locate-outline" size={18} color="#FFFFFF" />
            )}
          </Pressable>
        </View>

        <View style={styles.spacer} />

        <View style={styles.footerCard}>
          <Text style={styles.label}>Address line</Text>
          <TextInput
            value={line1}
            onChangeText={setLine1}
            placeholder="Moon Road, West Subidbazar"
            placeholderTextColor="#9D9D9D"
            style={styles.input}
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="Sylhet-3100"
            placeholderTextColor="#9D9D9D"
            style={styles.input}
          />

          <Pressable
            style={styles.saveBtn}
            onPress={() =>
              onSave({
                line1: line1.trim() || searchText.trim() || initialAddress.line1,
                city: city.trim() || initialAddress.city,
                latitude: region.latitude,
                longitude: region.longitude,
              })
            }
          >
            <Text style={styles.saveText}>Save Address</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  mapBg: { ...StyleSheet.absoluteFillObject },
  mapFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E9ECEF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  mapFallbackTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#2B2B2B',
    textAlign: 'center',
  },
  mapFallbackText: {
    marginTop: 6,
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
  },
  overlay: { flex: 1, backgroundColor: 'rgba(255,255,255,0.02)' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
  },
  backBtn: { width: 30, height: 30, justifyContent: 'center' },
  back: { fontSize: 28, lineHeight: 28, color: '#0A0A0A' },
  backSlot: { width: 30 },
  title: { fontSize: 30, fontWeight: '700', color: '#0A0A0A', letterSpacing: -0.6 },
  searchBar: {
    marginHorizontal: 16,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#0A0A0A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 14 },
  locateBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1C',
  },
  spacer: { flex: 1 },
  footerCard: {
    backgroundColor: '#F7F7F7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 26,
  },
  label: { fontSize: 13, color: '#7A7A7A', marginBottom: 6 },
  input: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    marginBottom: 10,
    color: '#0A0A0A',
  },
  saveBtn: {
    marginTop: 4,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: { color: '#FFF', fontSize: 17, fontWeight: '700' },
});
