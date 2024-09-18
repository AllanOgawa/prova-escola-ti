import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { IngredienteService } from './ingrediente.service';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';

@Controller('ingrediente')
export class IngredienteController {
  constructor(private readonly ingredienteService: IngredienteService) { }

  @Get()
  async findAll() {
    return await this.ingredienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ingredienteService.findById(id);
  }

  @Post()
  async create(@Body() ingrediente: CreateIngredienteDto) {
    return await this.ingredienteService.create(ingrediente);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() ingrediente: UpdateIngredienteDto) {
    return await this.ingredienteService.update(id, ingrediente);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ingredienteService.remove(id);
  }
}
