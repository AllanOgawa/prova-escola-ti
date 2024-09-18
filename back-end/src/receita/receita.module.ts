import { Module } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { ReceitaController } from './receita.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Receita, ReceitaSchema } from './schema/receita.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Receita.name, schema: ReceitaSchema }]),
  ],
  controllers: [ReceitaController],
  providers: [ReceitaService],
})
export class ReceitaModule { }
