import { Injectable } from '@nestjs/common';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { Receita } from './schema/receita.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateIngredienteDto } from 'src/ingrediente/dto/create-ingrediente.dto';

@Injectable()
export class ReceitaService {
  constructor(@InjectModel(Receita.name) private receitaModel: Model<Receita>) { }

  async findAll(): Promise<Receita[]> {
    return this.receitaModel.find().populate('ingredientes', '_id nome').exec();
  }

  async findById(id: string): Promise<Receita> {
    return await this.receitaModel.findById(id).populate('ingredientes', '_id nome');
  }

  async create(receita: CreateReceitaDto): Promise<Receita> {
    return await this.receitaModel.create(receita);
  }

  async update(id: string, receita: UpdateReceitaDto): Promise<Receita> {
    return await this.receitaModel.findByIdAndUpdate(id, receita, { new: true });
  }

  async remove(id: string): Promise<Receita[]> {
    await this.receitaModel.findByIdAndDelete(id);
    return this.receitaModel.find().populate('ingredientes', '_id nome').exec();
  }

  async addIngrediente(id: string, ingrediente: CreateIngredienteDto): Promise<Receita> {
    const receita = await this.receitaModel.findById(id).populate('ingredientes', '_id nome');
    receita.ingredientes.push(ingrediente)
    return await this.receitaModel.findByIdAndUpdate(id, receita, { new: true }).populate('ingredientes', '_id nome');
  }

  async removeIngrediente(id: string, ingredientes: CreateIngredienteDto[]): Promise<Receita> {
    const receita = await this.receitaModel.findById(id).populate('ingredientes', '_id nome');
    receita.ingredientes = ingredientes;
    return await this.receitaModel.findByIdAndUpdate(id, receita, { new: true }).populate('ingredientes', '_id nome');
  }
}
