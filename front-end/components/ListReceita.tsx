import { Receita } from '@/schemas/receita';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function ListReceita() {
    const [isLoading, setLoading] = useState(true);
    const [receitas, setReceitas] = useState<Receita[]>([]);

    const getReceitas = async () => {
        try {
            const response = await fetch('http://localhost:3000/receita');
            const json = await response.json();
            setReceitas(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReceitas();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getReceitas();
        }, [])
    );

    function CardReceita({ receita }: { receita: Receita }) {
        return (
            <View style={styles.card}>
                <View style={{ width: "70%" }}>
                    <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>{receita.nome.toUpperCase()}</Text>
                    <Text style={{ color: "white", fontSize: 20, marginTop: 15 }}>● Tempo Preparao: {receita.tempoPreparo} min</Text>
                    <Text style={{ color: "white", fontSize: 20 }}>● Custo Aproximado: R${receita.custoAproximado}</Text>
                    <Text style={{ color: "white", fontSize: 20 }}>● Ingredientes:</Text>
                    {
                        receita.ingredientes.map(item =>
                            <Text key={item._id} style={{ color: "white", fontSize: 18, marginLeft: 15 }}>- {item.nome}</Text>
                        )
                    }
                </View>
                <View style={{ width: "30%" }}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "blue" }]}
                        onPress={() => router.push(`../(receita)/edit/${receita._id}`)}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>Alterar Receita</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#b337c2", marginTop: 20 }]}
                        onPress={() => router.push(`../(receita)/updateIngrediente/${receita._id}`)}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>Alterar Ingredientes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "red", marginTop: 20 }]}
                        onPress={() => {
                            try {
                                fetch(`http://localhost:3000/receita/${receita._id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                }).then(async response => {
                                    const json = await response.json();
                                    setReceitas(json);
                                });
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>Deletar Receita</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    return (
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={receitas}
                    keyExtractor={({ _id }) => _id}
                    renderItem={({ item }) => (
                        <CardReceita receita={item} />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 210,
        borderRadius: 16,
        backgroundColor: "black",
        marginBottom: 20,
        padding: 20,
        flex: 1,
        display: "flex",
        flexDirection: "row"
    },
    button: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 16
    },
});