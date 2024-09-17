import { Ingrediente } from "./ingrediente";

export type Receita = {
    _id: string;
    nome: string;
    tempoPreparo: number;
    custoAproximado: number;
    ingredientes: Ingrediente[];
};