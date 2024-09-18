import { StyleSheet, TouchableOpacity, Text, TextInput, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function ReceitaCreate() {
    const [nome, setNome] = useState('');
    const [tempo, setTempo] = useState('');
    const [custo, setCusto] = useState('');

    return (
        <ScrollView style={{ padding: 40 }}>

            <Text style={{ fontSize: 20 }}>
                Nome:
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={setNome}
                value={nome}
            />

            <Text style={{ fontSize: 20 }}>
                Tempo de Preparo:
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={setTempo}
                value={tempo}
                keyboardType="numeric"
            />

            <Text style={{ fontSize: 20 }}>
                Custo Aproximado:
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={setCusto}
                value={custo}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button}
                onPress={() => {
                    try {
                        fetch(`http://localhost:3000/receita/`, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                nome: nome,
                                tempoPreparo: tempo,
                                custoAproximado: custo,
                            }),
                        });
                        router.push("/(tabs)");
                    } catch (error) {
                        console.error(error);
                    }
                }}
            >
                <Text style={{ fontSize: 20, color: "white" }}>Cadastrar Receita</Text>
            </TouchableOpacity>
        </ScrollView>
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
        backgroundColor: '#00ca00',
        padding: 10,
        borderRadius: 16

    },
});
