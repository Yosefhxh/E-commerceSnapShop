import { Text, View } from 'react-native';
import { styles } from '../styles/appStyles';

export default function AppHeader({ cartCount }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.brand}>DUKE</Text>
        <Text style={styles.subtitle}>Ecommerce iOS</Text>
      </View>

      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{cartCount}</Text>
      </View>
    </View>
  );
}
