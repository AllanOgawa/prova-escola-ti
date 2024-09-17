import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceitaModule } from './receita/receita.module';
import { IngredienteModule } from './ingrediente/ingrediente.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/receitas'), ReceitaModule, IngredienteModule]
})
export class AppModule { }
