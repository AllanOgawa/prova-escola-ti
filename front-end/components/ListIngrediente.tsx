import { Ingrediente } from '@/schemas/ingrediente';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function ListIngrediente() {
    const [isLoading, setLoading] = useState(true);
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);

    const getIngredientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/ingrediente');
            const json = await response.json();
            setIngredientes(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getIngredientes();
    }, []);


    useFocusEffect(
        useCallback(() => {
            getIngredientes();
        }, [])
    );

    function CardIngrediente({ ingrediente }: { ingrediente: Ingrediente }) {
        return (
            <View style={styles.card}>
                <Text style={{ width: "70%", color: "white", fontSize: 25 }}>{ingrediente.nome}</Text>
                <View style={{ width: "30%" }}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "blue" }]}
                        onPress={() => router.push(`../(ingrediente)/edit/${ingrediente._id}`)}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>Alterar Ingrediente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "red", marginTop: 20 }]}
                        onPress={() => {
                            try {
                                fetch(`http://localhost:3000/ingrediente/${ingrediente._id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                }).then(async response => {
                                    const json = await response.json();
                                    setIngredientes(json);
                                });
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>Deletar Ingrediente</Text>
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
                    data={ingredientes}
                    keyExtractor={({ _id }) => _id}
                    renderItem={({ item }) => (
                        <CardIngrediente ingrediente={item} />
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