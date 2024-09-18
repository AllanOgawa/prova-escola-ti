import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ListIngrediente } from '@/components/ListIngrediente';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IngredienteScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#597400', dark: '#597400' }}
      headerImage={<MaterialCommunityIcons size={250} name="food-variant" style={styles.headerImage} />}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>INGREDIENTES</Text>
        <TouchableOpacity style={styles.button}
          onPress={() => router.push(`../(ingrediente)/create`)}>
          <Text style={{ fontSize: 20, color: "white" }}>Cadastrar Ingrediente</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.stepContainer}>
        <ListIngrediente />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: 'white',
    bottom: 0,
    left: 10,
    position: 'absolute',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: "space-between"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00ca00',
    padding: 10,
    borderRadius: 16

  },
});
