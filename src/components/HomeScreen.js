import { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, PRODUCTS } from '../data/shopData';

const { width } = Dimensions.get('window');
const CARD_GAP = 14;
const H_PAD = 20;
const CHIP_GAP = 8;
const CHIP_WIDTH = Math.min(82, (width - H_PAD * 2 - CHIP_GAP * 3) / 4);
const CARD_WIDTH = (width - H_PAD * 2 - CARD_GAP) / 2;
const PRICE_MIN = 0;
const PRICE_MAX = 300;
const PRICE_STEP = 10;

export default function HomeScreen({
  selectedCategory = 'All',
  favoriteIds,
  onToggleFavorite,
  onAddToCart,
  onOpenProduct,
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [tempCategory, setTempCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);

  useEffect(() => {
    setActiveCategory(selectedCategory);
    setTempCategory(selectedCategory);
  }, [selectedCategory]);

  const filtered = useMemo(() => {
    let list = activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (searchText.trim()) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return list;
  }, [activeCategory, searchText, priceRange]);

  const clearFilters = () => {
    setTempCategory('All');
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setActiveCategory('All');
    setShowFilters(false);
  };

  const decreaseMin = () => {
    setPriceRange(([min, max]) => [Math.max(PRICE_MIN, min - PRICE_STEP), max]);
  };

  const increaseMin = () => {
    setPriceRange(([min, max]) => [Math.min(max, min + PRICE_STEP), max]);
  };

  const decreaseMax = () => {
    setPriceRange(([min, max]) => [min, Math.max(min, max - PRICE_STEP)]);
  };

  const increaseMax = () => {
    setPriceRange(([min, max]) => [min, Math.min(PRICE_MAX, max + PRICE_STEP)]);
  };

  const applyFilters = () => {
    setActiveCategory(tempCategory);
    setShowFilters(false);
  };

  const renderProduct = ({ item, index }) => {
    const isRight = index % 2 === 1;
    return (
      <Pressable
        style={[styles.cardWrap, isRight && { marginLeft: CARD_GAP }]}
        onPress={() => onOpenProduct(item)}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />

        <View style={styles.cardShade} />

        {/* Favorite */}
        <Pressable style={styles.favBtn} onPress={() => onToggleFavorite(item.id)}>
          <Ionicons
            name={favoriteIds[item.id] ? 'heart' : 'heart-outline'}
            size={16}
            color="#FFFFFF"
          />
        </Pressable>

        {/* Bottom overlay */}
        <View style={styles.cardOverlay}>
          <View>
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardPrice}>${item.price}</Text>
          </View>
          <Pressable
            style={styles.addCartBtn}
            onPress={() => onAddToCart(item.id)}
          >
            <Ionicons name="bag-handle-outline" size={15} color="#FFFFFF" />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>SnapShop</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={22} color="#0A0A0A" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#ABABAB"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <Pressable style={styles.searchAction}>
          <Ionicons name="camera-outline" size={19} color="#0A0A0A" />
        </Pressable>
        <Pressable style={styles.searchAction} onPress={() => setShowFilters(true)}>
          <Ionicons name="options-outline" size={20} color="#0A0A0A" />
        </Pressable>
      </View>

      {/* Category chips */}
      <View style={styles.categoriesRow}>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setActiveCategory(cat)}
            android_ripple={null}
            style={[
              styles.chip,
              activeCategory === cat && styles.chipActive,
            ]}
          >
            <Text
              style={[
                styles.chipLabel,
                activeCategory === cat && styles.chipLabelActive,
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Product grid */}
      <FlatList
        data={filtered}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />

      <Modal
        visible={showFilters}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterSheet}>
            <View style={styles.filterHeader}>
              <Pressable onPress={() => setShowFilters(false)}>
                <Text style={styles.filterClose}>×</Text>
              </Pressable>
              <Text style={styles.filterTitle}>Filter</Text>
              <View style={styles.filterCloseSlot} />
            </View>

            <Text style={styles.filterSectionTitle}>Categories</Text>
            <View style={styles.filterCatsWrap}>
              {CATEGORIES.map((cat) => {
                const selected = tempCategory === cat;
                return (
                  <Pressable
                    key={cat}
                    onPress={() => setTempCategory(cat)}
                    style={[styles.filterChip, selected && styles.filterChipSelected]}
                  >
                    <Text style={[styles.filterChipText, selected && styles.filterChipTextSelected]}>
                      {cat}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={[styles.filterSectionTitle, styles.priceTitle]}>Price</Text>
            <View style={styles.priceTrackWrap}>
              <View style={styles.priceTrack} />
              <View
                style={[
                  styles.priceRangeTrack,
                  {
                    left: `${(priceRange[0] / PRICE_MAX) * 100}%`,
                    width: `${((priceRange[1] - priceRange[0]) / PRICE_MAX) * 100}%`,
                  },
                ]}
              />
              <View style={[styles.priceThumb, { left: `${(priceRange[0] / PRICE_MAX) * 100}%` }]} />
              <View style={[styles.priceThumb, { left: `${(priceRange[1] / PRICE_MAX) * 100}%` }]} />
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>${priceRange[0]}</Text>
              <Text style={styles.priceLabel}>${priceRange[1]}</Text>
            </View>

            <View style={styles.priceAdjustRow}>
              <View style={styles.adjustGroup}>
                <Text style={styles.adjustTitle}>Min</Text>
                <View style={styles.adjustBtns}>
                  <Pressable style={styles.adjustBtn} onPress={decreaseMin}>
                    <Text style={styles.adjustBtnText}>-</Text>
                  </Pressable>
                  <Pressable style={styles.adjustBtn} onPress={increaseMin}>
                    <Text style={styles.adjustBtnText}>+</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.adjustGroup}>
                <Text style={styles.adjustTitle}>Max</Text>
                <View style={styles.adjustBtns}>
                  <Pressable style={styles.adjustBtn} onPress={decreaseMax}>
                    <Text style={styles.adjustBtnText}>-</Text>
                  </Pressable>
                  <Pressable style={styles.adjustBtn} onPress={increaseMax}>
                    <Text style={styles.adjustBtnText}>+</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.filterActions}>
              <Pressable style={styles.clearBtn} onPress={clearFilters}>
                <Text style={styles.clearText}>Clear</Text>
              </Pressable>
              <Pressable style={styles.applyBtn} onPress={applyFilters}>
                <Text style={styles.applyText}>Apply</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    paddingHorizontal: H_PAD,
    paddingTop: 12,
    paddingBottom: 10,
  },
  brand: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0A0A0A',
    letterSpacing: -0.5,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: H_PAD,
    gap: 4,
    marginBottom: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 26,
    paddingHorizontal: 13,
    height: 50,
    borderWidth: 1.2,
    borderColor: '#CFCFCF',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 0,
    color: '#0A0A0A',
  },
  searchAction: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: H_PAD,
    paddingBottom: 12,
    columnGap: CHIP_GAP,
  },
  chip: {
    width: CHIP_WIDTH,
    height: 48,
    borderRadius: 50,
    borderWidth: 1.1,
    borderColor: '#D7D7D7',
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: '#0A0A0A',
    borderColor: '#0A0A0A',
  },
  chipLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#686868',
  },
  chipLabelActive: {
    color: '#FFFFFF',
  },
  grid: {
    paddingHorizontal: H_PAD,
    paddingBottom: 18,
  },
  row: { marginBottom: CARD_GAP },
  cardWrap: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.34,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.14)',
  },
  favBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.30)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400',
  },
  cardPrice: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0,
  },
  addCartBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.36)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterSheet: {
    width: width * 0.82,
    backgroundColor: '#F7F7F7',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterClose: {
    fontSize: 24,
    color: '#1A1A1A',
    width: 22,
  },
  filterCloseSlot: {
    width: 22,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#232323',
    marginBottom: 10,
  },
  filterCatsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#F7F7F7',
  },
  filterChipSelected: {
    backgroundColor: '#0A0A0A',
    borderColor: '#0A0A0A',
  },
  filterChipText: {
    color: '#7A7A7A',
    fontSize: 13,
    fontWeight: '500',
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
  },
  priceTitle: {
    marginTop: 18,
    marginBottom: 6,
  },
  priceTrackWrap: {
    width: '100%',
    height: 28,
    justifyContent: 'center',
    marginTop: 2,
  },
  priceTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#CFCFCF',
  },
  priceRangeTrack: {
    position: 'absolute',
    height: 3,
    borderRadius: 2,
    backgroundColor: '#1F1F1F',
  },
  priceThumb: {
    position: 'absolute',
    marginLeft: -7,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0A0A0A',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#232323',
  },
  priceAdjustRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  adjustGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adjustTitle: {
    color: '#767676',
    fontSize: 12,
    fontWeight: '600',
  },
  adjustBtns: {
    flexDirection: 'row',
    gap: 6,
  },
  adjustBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#B8B8B8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  adjustBtnText: {
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: '700',
    marginTop: -1,
  },
  filterActions: {
    flexDirection: 'row',
    gap: 12,
  },
  clearBtn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#8C8C8C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    color: '#6F6F6F',
    fontSize: 16,
    fontWeight: '500',
  },
  applyBtn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
