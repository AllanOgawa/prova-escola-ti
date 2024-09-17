import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';

@Controller('receita')
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) { }

  @Get()
  async findAll() {
    console.log("findAll receita: " + new Date())
    return await this.receitaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log("findOne receita: " + new Date())
    return await this.receitaService.findById(id);
  }

  @Post()
  async create(@Body() receita: CreateReceitaDto) {
    console.log("create receita: " + new Date())
    return await this.receitaService.create(receita);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() receita: UpdateReceitaDto) {
    console.log("update receita: " + new Date())
    return await this.receitaService.update(id, receita);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log("remove receita: " + new Date())
    return await this.receitaService.remove(id);
  }
}
