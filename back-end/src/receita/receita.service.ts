import { Injectable } from '@nestjs/common';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { Receita } from './schema/receita.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Ingrediente } from 'src/ingrediente/schema/receita.schema';
import { UpdateIngredienteDto } from 'src/ingrediente/dto/update-ingrediente.dto';

@Injectable()
export class ReceitaService {
  constructor(@InjectModel(Receita.name) private receitaModel: Model<Receita>) { }

  @InjectModel(Ingrediente.name) private ingredienteModel: Model<Ingrediente>


  async findAll(): Promise<Receita[]> {
    const receitas = await this.receitaModel.find().exec();
    const ingredientes = await this.ingredienteModel.find().exec();

    return receitas
  }

  async findById(id: string): Promise<Receita> {
    return await this.receitaModel.findById(id);
  }

  async create(receita: CreateReceitaDto): Promise<Receita> {
    return await this.receitaModel.create(receita);
  }

  async update(id: string, receita: UpdateReceitaDto): Promise<Receita> {
    return await this.receitaModel.findByIdAndUpdate(id, receita);
  }

  async remove(id: string): Promise<Receita> {
    return await this.receitaModel.findByIdAndDelete(id);
  }

  // async addIngrediente(id: string, ingredientes: UpdateIngredienteDto): Promise<Receita> {
  //   return await this.receitaModel.findByIdAndDelete(id);
  // }
}
