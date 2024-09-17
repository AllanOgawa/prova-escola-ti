import { Module } from '@nestjs/common';
import { IngredienteService } from './ingrediente.service';
import { IngredienteController } from './ingrediente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ingrediente, IngredienteSchema } from './schema/receita.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ingrediente.name, schema: IngredienteSchema }])],
  controllers: [IngredienteController],
  providers: [IngredienteService],
})
export class IngredienteModule { }
