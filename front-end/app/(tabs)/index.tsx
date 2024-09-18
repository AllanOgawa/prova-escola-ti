import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { router } from 'expo-router';
import { ListReceita } from '@/components/ListReceita';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ReceitaScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'red', dark: '#8f0000' }}
      headerImage={<MaterialCommunityIcons size={250} name="food" style={styles.headerImage} />}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>RECEITAS</Text>
        <TouchableOpacity style={styles.button}
          onPress={() => router.push(`../(receita)/create`)}>
          <Text style={{ fontSize: 20, color: "white" }}>Cadastrar Receita</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.stepContainer}>
        <ListReceita />
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
