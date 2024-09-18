import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IngredienteDocument = HydratedDocument<Ingrediente>;

@Schema()
export class Ingrediente {
  @Prop()
  nome: string;

}

export const IngredienteSchema = SchemaFactory.createForClass(Ingrediente);