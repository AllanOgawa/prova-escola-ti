import { StyleSheet, TouchableOpacity, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

export default function ReceitaEdit() {
    const param = useLocalSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [nome, setNome] = useState('');
    const [tempo, setTempo] = useState('');
    const [custo, setCusto] = useState('');

    const getReceita = async () => {
        try {
            const response = await fetch(`http://localhost:3000/receita/${param.id}`);
            const json = await response.json();
            setNome(json.nome);
            setTempo(json.tempoPreparo);
            setCusto(json.custoAproximado);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReceita();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getReceita();
        }, [])
    );

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

                    <Text style={{ fontSize: 20 }}>
                        Tempo de Preparo:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTempo}
                        value={tempo}
                    />

                    <Text style={{ fontSize: 20 }}>
                        Custo Aproximado:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCusto}
                        value={custo}
                    />

                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            try {
                                fetch(`http://localhost:3000/receita/${param.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        nome: nome,
                                        tempoPreparo: tempo,
                                        custoAproximado: custo
                                    }),
                                });
                                router.push("/(tabs)");
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>Salvar Alteração da Receita</Text>
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
