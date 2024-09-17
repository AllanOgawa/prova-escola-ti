import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { ListReceita } from '@/components/ListReceita';

export default function ReceitaScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Receitas</ThemedText>
        <TouchableOpacity style={styles.button}
          onPress={() => router.push(`../(receita)/create`)}>
          <Text style={{ fontSize: 20, color: "white" }}>Cadastrar Receita</Text>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ListReceita />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
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
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 16
  },
});
