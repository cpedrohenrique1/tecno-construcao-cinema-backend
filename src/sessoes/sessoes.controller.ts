import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SessoesService } from './sessoes.service';
import { CreateSessoesDto } from './dto/create-sessoes.dto';
import { UpdateSessoesDto } from './dto/update-sessoes.dto';

@Controller('sessoes')
export class SessoesController {
  constructor(private readonly sessoesService: SessoesService) {}

  @Post()
  create(@Body() createSessoesDto: CreateSessoesDto) {
    return this.sessoesService.create(createSessoesDto);
  }

  @Get()
  findAll() {
    return this.sessoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sessoesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSessoesDto: UpdateSessoesDto) {
    return this.sessoesService.update(id, updateSessoesDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sessoesService.remove(id);
  }
}
