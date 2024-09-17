import { StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function IngredienteCreate() {
    const [nome, setNome] = useState('');

    return (
        <View style={{ padding: 40 }}>
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
                        fetch(`http://localhost:3000/ingrediente/`, {
                            method: 'POST',
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
                <Text style={{ fontSize: 20, color: "white" }}>Cadastrar Ingrediente</Text>
            </TouchableOpacity>
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
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 16

    },
});
