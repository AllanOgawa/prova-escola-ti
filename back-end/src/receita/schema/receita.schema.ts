import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Ingrediente } from 'src/ingrediente/schema/receita.schema';

export type ReceitaDocument = HydratedDocument<Receita>;

@Schema()
export class Receita {
    @Prop()
    nome: string;

    @Prop()
    tempoPreparo: number;

    @Prop()
    custoAproximado: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingrediente' }] })
    ingredientes: Ingrediente[];
}

export const ReceitaSchema = SchemaFactory.createForClass(Receita);