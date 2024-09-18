import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { CreateIngredienteDto } from 'src/ingrediente/dto/create-ingrediente.dto';

@Controller('receita')
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) { }

  @Get()
  async findAll() {
    return await this.receitaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.receitaService.findById(id);
  }

  @Post()
  async create(@Body() receita: CreateReceitaDto) {
    return await this.receitaService.create(receita);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() receita: UpdateReceitaDto) {
    return await this.receitaService.update(id, receita);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.receitaService.remove(id);
  }

  @Put('/addIngrediente/:id')
  async addIngrediente(@Param('id') id: string, @Body() ingrediente: CreateIngredienteDto) {
    return await this.receitaService.addIngrediente(id, ingrediente);
  }

  @Delete('/removeIngrediente/:id')
  async removeIngrediente(@Param('id') id: string, @Body() ingredientes: CreateIngredienteDto[]) {
    return await this.receitaService.removeIngrediente(id, ingredientes);
  }
}
