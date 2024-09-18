import { StyleSheet, TouchableOpacity, Text, View, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Ingrediente } from '@/schemas/ingrediente';

export default function ReceitaChangeIngrediente() {
    const param = useLocalSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [ingredientesSelect, setIngredientesSelect] = useState<Ingrediente[]>([]);
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);

    const getIngredientes = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/ingrediente');
            const json = await response.json();
            setIngredientes(json);

            const responseSelect = await fetch(`http://localhost:3000/receita/${param.id}`);
            const jsonSelect = await responseSelect.json();
            setIngredientesSelect(jsonSelect.ingredientes);
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
        const backgroundColor = ingredientesSelect.find(select => select._id == ingrediente._id) ? "#004300" : "#4d4d4d"

        return (
            <View style={[styles.card, { backgroundColor: backgroundColor }]}
            >
                <Text style={{ width: "70%", color: "white", fontSize: 30 }}>{ingrediente.nome}</Text>
                <View style={{ width: "30%" }}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#00ca00" }]}
                        onPress={() => {
                            try {
                                fetch(`http://localhost:3000/receita/addIngrediente/${param.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify((ingredientesSelect.find(select => select._id == ingrediente._id)) ? {} : ingrediente)
                                }).then(async response => {
                                    const json = await response.json();
                                    setIngredientesSelect(json.ingredientes);
                                });
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>Adicionar Ingrediente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "red", marginTop: 20 }]}
                        onPress={() => {
                            try {
                                fetch(`http://localhost:3000/receita/removeIngrediente/${param.id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(ingredientesSelect.filter(select => select._id !== ingrediente._id))
                                }).then(async response => {
                                    const json = await response.json();
                                    setIngredientesSelect(json.ingredientes);
                                });
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>Remover Ingrediente</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    return (
        <ScrollView style={{ flex: 1, padding: 24 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: 30 }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ width: 40, height: 40, backgroundColor: "#004300", borderColor: "black", borderWidth: 4 }}>
                    </View>
                    <Text style={{ fontSize: 20, marginLeft: 10 }}>
                        Item adicionado a Receita
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ width: 40, height: 40, backgroundColor: "#4d4d4d", borderColor: "black", borderWidth: 4 }}>
                    </View>
                    <Text style={{ fontSize: 20, marginLeft: 10 }}>
                        Item não adicionado a Receita
                    </Text>
                </View>
            </View>

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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 210,
        borderRadius: 16,
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