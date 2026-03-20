import { StatusBar } from 'expo-status-bar';
import { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingScreen from './src/components/OnboardingScreen';
import LoginScreen from './src/components/LoginScreen';
import SignUpScreen from './src/components/SignUpScreen';
import HomeScreen from './src/components/HomeScreen';
import ProductDetailScreen from './src/components/ProductDetailScreen';
import BottomTabBar from './src/components/BottomTabBar';
import CategoriesScreen from './src/components/CategoriesScreen';
import WishlistScreen from './src/components/WishlistScreen';
import BagScreen from './src/components/BagScreen';
import CheckoutScreen from './src/components/CheckoutScreen';
import AddAddressScreen from './src/components/AddAddressScreen';
import OrderSuccessScreen from './src/components/OrderSuccessScreen';
import AccountMainScreen from './src/components/AccountMainScreen';
import AccountDetailsScreen from './src/components/AccountDetailsScreen';
import PaymentMethodScreen from './src/components/PaymentMethodScreen';
import AddCardScreen from './src/components/AddCardScreen';
import DeliveryAddressScreen from './src/components/DeliveryAddressScreen';
import PasswordScreen from './src/components/PasswordScreen';
import NotificationsScreen from './src/components/NotificationsScreen';
import LanguagesScreen from './src/components/LanguagesScreen';
import HelpCenterScreen from './src/components/HelpCenterScreen';
import TermsScreen from './src/components/TermsScreen';
import ContactUsScreen from './src/components/ContactUsScreen';
import { PRODUCTS } from './src/data/shopData';

export default function App() {
  const [screen, setScreen] = useState('onboarding');
  const [activeTab, setActiveTab] = useState('home');
  const [homeCategory, setHomeCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [cart, setCart] = useState({});
  const [address, setAddress] = useState({
    line1: 'Moon Road, West Subidbazar',
    city: 'Sylhet-3100',
  });
  const [selectedCard, setSelectedCard] = useState('visa');
  const [selectedAddress, setSelectedAddress] = useState('home');

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  const addToCart = useCallback((id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const decreaseFromBag = useCallback((id) => {
    setCart((prev) => {
      const next = { ...prev };
      const nextQty = (next[id] || 0) - 1;
      if (nextQty <= 0) {
        delete next[id];
      } else {
        next[id] = nextQty;
      }
      return next;
    });
  }, []);

  const removeFromBag = useCallback((id) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const favoriteProducts = useMemo(
    () => PRODUCTS.filter((item) => favorites[item.id]),
    [favorites]
  );

  const bagItems = useMemo(
    () => Object.entries(cart)
      .map(([id, quantity]) => {
        const found = PRODUCTS.find((p) => p.id === id);
        if (!found) {
          return null;
        }
        return { ...found, quantity };
      })
      .filter(Boolean),
    [cart]
  );

  const openProduct = useCallback((product) => {
    setSelectedProduct(product);
    setScreen('product');
  }, []);

  const handleTabPress = useCallback((tab) => {
    setActiveTab(tab);
    if (tab === 'search') {
      setScreen('categories');
      return;
    }
    if (tab === 'wishlist') {
      setScreen('wishlist');
      return;
    }
    if (tab === 'bag') {
      setScreen('bag');
      return;
    }
    if (tab === 'profile') {
      setScreen('account');
      return;
    }
    setScreen('home');
  }, []);

  const handlePickCategory = useCallback((category) => {
    setHomeCategory(category);
    setActiveTab('home');
    setScreen('home');
  }, []);

  const placeOrder = useCallback(() => {
    setScreen('order-success');
  }, []);

  // ── Onboarding ──
  if (screen === 'onboarding') {
    return (
      <>
        <StatusBar style="light" />
        <OnboardingScreen onFinish={() => setScreen('login')} />
      </>
    );
  }

  // ── Login ──
  if (screen === 'login') {
    return (
      <>
        <StatusBar style="dark" />
        <LoginScreen
          onLogin={() => setScreen('home')}
          onGoSignUp={() => setScreen('signup')}
        />
      </>
    );
  }

  // ── Sign Up ──
  if (screen === 'signup') {
    return (
      <>
        <StatusBar style="dark" />
        <SignUpScreen
          onSignUp={() => setScreen('home')}
          onGoLogin={() => setScreen('login')}
        />
      </>
    );
  }

  // ── Product Detail ──
  if (screen === 'product' && selectedProduct) {
    return (
      <>
        <StatusBar style="dark" />
        <ProductDetailScreen
          product={selectedProduct}
          favoriteIds={favorites}
          onToggleFavorite={toggleFavorite}
          onBack={() => setScreen('home')}
          onAddToCart={addToCart}
        />
      </>
    );
  }

  // ── Wishlist ──
  if (screen === 'wishlist') {
    return (
      <>
        <StatusBar style="dark" />
        <View style={styles.appShell}>
          <WishlistScreen
            items={favoriteProducts}
            onOpenProduct={openProduct}
            onToggleFavorite={toggleFavorite}
          />
          <BottomTabBar
            activeTab={activeTab}
            onTabPress={handleTabPress}
            cartCount={cartCount}
          />
        </View>
      </>
    );
  }

  // ── Bag ──
  if (screen === 'bag') {
    return (
      <>
        <StatusBar style="dark" />
        <BagScreen
          items={bagItems}
          onIncrease={addToCart}
          onDecrease={decreaseFromBag}
          onRemove={removeFromBag}
          onBack={() => {
            setActiveTab('home');
            setScreen('home');
          }}
          onCheckout={() => setScreen('checkout')}
        />
      </>
    );
  }

  // ── Checkout ──
  if (screen === 'checkout') {
    return (
      <>
        <StatusBar style="dark" />
        <CheckoutScreen
          items={bagItems}
          address={address}
          onBack={() => setScreen('bag')}
          onOpenAddress={() => setScreen('add-address')}
          onPlaceOrder={placeOrder}
        />
      </>
    );
  }

  // ── Add Address ──
  if (screen === 'add-address') {
    return (
      <>
        <StatusBar style="dark" />
        <AddAddressScreen
          initialAddress={address}
          onBack={() => setScreen('checkout')}
          onSave={(nextAddress) => {
            setAddress(nextAddress);
            setScreen('checkout');
          }}
        />
      </>
    );
  }

  // ── Success ──
  if (screen === 'order-success') {
    return (
      <>
        <StatusBar style="dark" />
        <OrderSuccessScreen
          onContinue={() => {
            setCart({});
            setActiveTab('home');
            setScreen('home');
          }}
        />
      </>
    );
  }

  // ── Account ──
  if (screen === 'account') {
    return (
      <>
        <StatusBar style="dark" />
        <AccountMainScreen
          onOpen={(key) => {
            if (key === 'details') {
              setScreen('account-details');
              return;
            }
            if (key === 'payment') {
              setScreen('payment-method');
              return;
            }
            if (key === 'addresses') {
              setScreen('delivery-addresses');
              return;
            }
            if (key === 'password') {
              setScreen('account-password');
              return;
            }
            if (key === 'notifications') {
              setScreen('account-notifications');
              return;
            }
            if (key === 'language') {
              setScreen('account-language');
              return;
            }
            if (key === 'help') {
              setScreen('account-help');
              return;
            }
            if (key === 'privacy') {
              setScreen('account-terms');
              return;
            }
            if (key === 'contact') {
              setScreen('account-contact');
            }
          }}
          onBack={() => {
            setActiveTab('home');
            setScreen('home');
          }}
          onLogout={() => {
            setActiveTab('home');
            setScreen('login');
          }}
        />
      </>
    );
  }

  if (screen === 'account-details') {
    return (
      <>
        <StatusBar style="dark" />
        <AccountDetailsScreen onBack={() => setScreen('account')} />
      </>
    );
  }

  if (screen === 'payment-method') {
    return (
      <>
        <StatusBar style="dark" />
        <PaymentMethodScreen
          selectedCard={selectedCard}
          onSelectCard={setSelectedCard}
          onAddCard={() => setScreen('account-add-card')}
          onBack={() => setScreen('account')}
        />
      </>
    );
  }

  if (screen === 'account-add-card') {
    return (
      <>
        <StatusBar style="dark" />
        <AddCardScreen onBack={() => setScreen('payment-method')} />
      </>
    );
  }

  if (screen === 'delivery-addresses') {
    return (
      <>
        <StatusBar style="dark" />
        <DeliveryAddressScreen
          selectedAddress={selectedAddress}
          onSelectAddress={setSelectedAddress}
          onAddNewAddress={() => setScreen('account-add-address')}
          onBack={() => setScreen('account')}
        />
      </>
    );
  }

  if (screen === 'account-add-address') {
    return (
      <>
        <StatusBar style="dark" />
        <AddAddressScreen
          initialAddress={address}
          onBack={() => setScreen('delivery-addresses')}
          onSave={(nextAddress) => {
            setAddress(nextAddress);
            setScreen('delivery-addresses');
          }}
        />
      </>
    );
  }

  if (screen === 'account-password') {
    return (
      <>
        <StatusBar style="dark" />
        <PasswordScreen onBack={() => setScreen('account')} />
      </>
    );
  }

  if (screen === 'account-notifications') {
    return (
      <>
        <StatusBar style="dark" />
        <NotificationsScreen onBack={() => setScreen('account')} />
      </>
    );
  }

  if (screen === 'account-language') {
    return (
      <>
        <StatusBar style="dark" />
        <LanguagesScreen onBack={() => setScreen('account')} />
      </>
    );
  }

  if (screen === 'account-help') {
    return (
      <>
        <StatusBar style="dark" />
        <HelpCenterScreen onBack={() => setScreen('account')} />
      </>
    );
  }

  if (screen === 'account-terms') {
    return (
      <>
        <StatusBar style="dark" />
        <TermsScreen onBack={() => setScreen('account')} />
      </>
    );
  }

  if (screen === 'account-contact') {
    return (
      <>
        <StatusBar style="dark" />
        <ContactUsScreen onBack={() => setScreen('account')} />
      </>
    );
  }

  // ── Categories ──
  if (screen === 'categories') {
    return (
      <>
        <StatusBar style="dark" />
        <View style={styles.appShell}>
          <CategoriesScreen
            onBack={() => {
              setActiveTab('home');
              setScreen('home');
            }}
            onSelectCategory={handlePickCategory}
          />
          <BottomTabBar
            activeTab={activeTab}
            onTabPress={handleTabPress}
            cartCount={cartCount}
          />
        </View>
      </>
    );
  }

  // ── Home (with tab bar) ──
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        <HomeScreen
          selectedCategory={homeCategory}
          favoriteIds={favorites}
          onToggleFavorite={toggleFavorite}
          onAddToCart={addToCart}
          onOpenProduct={openProduct}
        />
        <BottomTabBar
          activeTab={activeTab}
          onTabPress={handleTabPress}
          cartCount={cartCount}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
