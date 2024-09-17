import { StyleSheet, TouchableOpacity, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

export default function IngredienteEdit() {
    const param = useLocalSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [nome, setNome] = useState('');

    const getIngrediente = async () => {
        try {
            const response = await fetch(`http://localhost:3000/ingrediente/${param.id}`);
            const json = await response.json();
            setNome(json.nome);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getIngrediente();
    }, []);

    return (
        <View style={{ padding: 40 }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <Text style={{ fontSize: 20 }}>
                        Nome:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNome}
                        value={nome}
                    />
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            try {
                                fetch(`http://localhost:3000/ingrediente/${param.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        nome: nome
                                    }),
                                });
                                router.push("/(tabs)/ingrediente");
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>Salvar Alteração do Ingrediente</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        marginBottom: 40,
        fontSize: 20,
        borderRadius: 16
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 16

    },
});
