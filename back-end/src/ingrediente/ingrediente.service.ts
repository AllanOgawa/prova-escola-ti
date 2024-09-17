import { Injectable } from '@nestjs/common';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';
import { Ingrediente } from './schema/receita.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class IngredienteService {
  constructor(@InjectModel(Ingrediente.name) private ingredienteModel: Model<Ingrediente>) { }

  async findAll(): Promise<Ingrediente[]> {
    return await this.ingredienteModel.find().exec();
  }

  async findById(id: string): Promise<Ingrediente> {
    return await this.ingredienteModel.findById(id);
  }

  async create(ingrediente: CreateIngredienteDto): Promise<Ingrediente> {
    return await this.ingredienteModel.create(ingrediente);
  }

  async update(id: string, ingrediente: UpdateIngredienteDto): Promise<Ingrediente> {
    return await this.ingredienteModel.findByIdAndUpdate(id, ingrediente);
  }

  async remove(id: string): Promise<Ingrediente> {
    return await this.ingredienteModel.findByIdAndDelete(id);
  }

}
