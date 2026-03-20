import { Pressable, ScrollView, Text } from 'react-native';
import { styles } from '../styles/appStyles';

export default function CategoryTabs({ categories, activeCategory, onSelectCategory }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesWrap}
    >
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <Pressable
            key={category}
            style={[styles.categoryChip, isActive && styles.categoryChipActive]}
            onPress={() => onSelectCategory(category)}
          >
            <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
