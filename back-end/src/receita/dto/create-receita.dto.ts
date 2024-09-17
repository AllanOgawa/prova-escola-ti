import { Ingrediente } from "src/ingrediente/schema/receita.schema";

export class CreateReceitaDto {
    nome: string;
    tempoPreparo: number;
    custoAproximado: number;
    ingredientes: Ingrediente[];
}
