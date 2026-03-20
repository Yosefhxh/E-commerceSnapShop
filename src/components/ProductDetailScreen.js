import { useMemo, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const SIZE_SYSTEMS = ['EU', 'US', 'UK'];

export default function ProductDetailScreen({
  product,
  favoriteIds,
  onToggleFavorite,
  onBack,
  onAddToCart,
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] ?? product.sizes[0]);
  const [sizeSystem, setSizeSystem] = useState('EU');
  const isFav = useMemo(() => Boolean(favoriteIds?.[product.id]), [favoriteIds, product.id]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main image */}
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: product.image }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <Pressable
            style={styles.favBtn}
            onPress={() => onToggleFavorite(product.id)}
          >
            <Text style={[styles.favIcon, isFav && styles.favIconActive]}>
              {isFav ? '♥' : '♡'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.info}>
          {/* Name + price */}
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price}.00</Text>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Size */}
          <View style={styles.sizeHeader}>
            <Text style={styles.sizeLabel}>Size</Text>
            <View style={styles.sizeSystemRow}>
              {SIZE_SYSTEMS.map((sys) => (
                <Pressable key={sys} onPress={() => setSizeSystem(sys)}>
                  <Text
                    style={[
                      styles.sizeSystem,
                      sizeSystem === sys && styles.sizeSystemActive,
                    ]}
                  >
                    {sys}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sizesRow}
          >
            {product.sizes.map((size) => (
              <Pressable
                key={size}
                onPress={() => setSelectedSize(size)}
                style={[
                  styles.sizeChip,
                  selectedSize === size && styles.sizeChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.sizeChipLabel,
                    selectedSize === size && styles.sizeChipLabelActive,
                  ]}
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Add to Cart */}
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.addBtn, pressed && styles.addBtnPressed]}
          onPress={() => {
            onAddToCart(product.id);
            onBack();
          }}
        >
          <Text style={styles.addBtnLabel}>Add to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: '#0A0A0A',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A0A0A',
  },
  imageWrap: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    height: width - 40,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  favBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favIcon: {
    fontSize: 18,
    color: '#ABABAB',
  },
  favIconActive: {
    color: '#E03030',
  },
  info: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  productName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0A0A0A',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A0A0A',
    marginBottom: 14,
  },
  description: {
    fontSize: 13,
    color: '#8A8A8A',
    lineHeight: 20,
    marginBottom: 24,
  },
  sizeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A0A0A',
  },
  sizeSystemRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeSystem: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ABABAB',
  },
  sizeSystemActive: {
    color: '#0A0A0A',
    fontWeight: '800',
  },
  sizesRow: {
    gap: 10,
    paddingRight: 4,
  },
  sizeChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeChipActive: {
    backgroundColor: '#0A0A0A',
    borderColor: '#0A0A0A',
  },
  sizeChipLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B6B6B',
  },
  sizeChipLabelActive: {
    color: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 36,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  addBtn: {
    backgroundColor: '#0A0A0A',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
  },
  addBtnPressed: {
    backgroundColor: '#2A2A2A',
  },
  addBtnLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
