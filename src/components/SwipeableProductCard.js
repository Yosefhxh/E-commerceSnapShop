import { memo, useRef } from 'react';
import { Animated, Image, PanResponder, Pressable, Text, View } from 'react-native';
import { styles } from '../styles/appStyles';

function SwipeableProductCard({
  product,
  width,
  quantity,
  onAdd,
  onRemove,
  onSwipeStart,
  onSwipeEnd,
}) {
  const swipeX = useRef(new Animated.Value(0)).current;
  const SWIPE_LIMIT = 72;
  const isSwipingRef = useRef(false);

  const notifySwipeEnd = () => {
    if (isSwipingRef.current) {
      isSwipingRef.current = false;
      onSwipeEnd?.();
    }
  };

  const notifySwipeStart = (dx) => {
    if (!isSwipingRef.current && Math.abs(dx) > 6) {
      isSwipingRef.current = true;
      onSwipeStart?.();
    }
  };

  const resetPosition = () => {
    Animated.spring(swipeX, {
      toValue: 0,
      damping: 18,
      stiffness: 220,
      mass: 0.7,
      useNativeDriver: true,
    }).start(() => {
      notifySwipeEnd();
    });
  };

  const commitSwipe = (toValue, callback) => {
    Animated.spring(swipeX, {
      toValue,
      damping: 20,
      stiffness: 260,
      mass: 0.65,
      useNativeDriver: true,
    }).start(() => {
      callback(product.id);
      Animated.spring(swipeX, {
        toValue: 0,
        damping: 17,
        stiffness: 230,
        mass: 0.7,
        useNativeDriver: true,
      }).start(() => {
        notifySwipeEnd();
      });
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderGrant: () => {
        swipeX.stopAnimation();
      },
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dx) > 10 && Math.abs(gesture.dx) > Math.abs(gesture.dy);
      },
      onPanResponderMove: (_, gesture) => {
        notifySwipeStart(gesture.dx);
        const clampedDx = Math.max(-140, Math.min(140, gesture.dx));
        swipeX.setValue(clampedDx);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_LIMIT) {
          commitSwipe(130, onAdd);
          return;
        }

        if (gesture.dx < -SWIPE_LIMIT) {
          commitSwipe(-130, onRemove);
          return;
        }

        resetPosition();
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: resetPosition,
    })
  ).current;

  const rotate = swipeX.interpolate({
    inputRange: [-130, 0, 130],
    outputRange: ['-7deg', '0deg', '7deg'],
    extrapolate: 'clamp',
  });

  const addHintOpacity = swipeX.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const removeHintOpacity = swipeX.interpolate({
    inputRange: [-80, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.cardSlot, { width }]}>
      <Animated.View style={[styles.swipeHint, styles.addHint, { opacity: addHintOpacity }]}>
        <Text style={styles.swipeHintText}>+ Agregar</Text>
      </Animated.View>

      <Animated.View style={[styles.swipeHint, styles.removeHint, { opacity: removeHintOpacity }]}>
        <Text style={styles.swipeHintText}>- Quitar</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.productCard,
          {
            transform: [{ translateX: swipeX }, { rotate }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={[styles.cardImageWrap, { backgroundColor: product.tint }]}>
          <Image source={{ uri: product.image }} style={styles.cardImage} resizeMode="cover" />
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardCategory}>{product.category}</Text>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {product.name}
          </Text>

          <View style={styles.cardFooter}>
            <Text style={styles.cardPrice}>${product.price}</Text>
            <Pressable onPress={() => onAdd(product.id)} style={styles.quickAddBtn}>
              <Text style={styles.quickAddLabel}>+</Text>
            </Pressable>
          </View>

          {quantity > 0 ? <Text style={styles.qtyLabel}>En carrito: {quantity}</Text> : null}
        </View>
      </Animated.View>
    </View>
  );
}

export default memo(SwipeableProductCard);
