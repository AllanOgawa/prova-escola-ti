import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { IngredienteService } from './ingrediente.service';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';

@Controller('ingrediente')
export class IngredienteController {
  constructor(private readonly ingredienteService: IngredienteService) { }

  @Get()
  async findAll() {
    console.log("findAll: " + new Date())
    return await this.ingredienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log("findOne ingrediente: " + new Date())
    return await this.ingredienteService.findById(id);
  }

  @Post()
  async create(@Body() ingrediente: CreateIngredienteDto) {
    console.log("create ingrediente: " + new Date())
    return await this.ingredienteService.create(ingrediente);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() ingrediente: UpdateIngredienteDto) {
    console.log("update ingrediente: " + new Date())
    return await this.ingredienteService.update(id, ingrediente);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log("remove ingrediente: " + new Date())
    return await this.ingredienteService.remove(id);
  }
}
