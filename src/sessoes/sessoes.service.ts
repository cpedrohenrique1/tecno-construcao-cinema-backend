import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessoesDto } from './dto/create-sessoes.dto';
import { UpdateSessoesDto } from './dto/update-sessoes.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessoesService {
  constructor (private readonly prismaService: PrismaService) {}

  async create(createSessoesDto: CreateSessoesDto) {
    const salaExists = await this.prismaService.sala.findUnique({
      where: {
        id: createSessoesDto.salaId
      }
    });
    if (!salaExists) {
      throw new NotFoundException("Não foi encontrado esta sala");
    }
    const filmeExists = await this.prismaService.filme.findUnique({
      where: {
        id: createSessoesDto.filmeId
      }
    });
    if (!filmeExists) {
      throw new NotFoundException("Não foi encontrado este filme");
    }
    return await this.prismaService.sessao.create({
      data: createSessoesDto
    });
  }

  async findAll() {
    return await this.prismaService.sessao.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.sessao.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateSessoesDto: UpdateSessoesDto) {
    const salaExists = await this.prismaService.sala.findUnique({
      where: {
        id: updateSessoesDto.salaId
      }
    });
    if (!salaExists) {
      throw new NotFoundException("Não foi encontrado esta sala");
    }
    const filmeExists = await this.prismaService.filme.findUnique({
      where: {
        id: updateSessoesDto.filmeId
      }
    });
    if (!filmeExists) {
      throw new NotFoundException("Não foi encontrado este filme");
    }
    return await this.prismaService.sessao.update({
      where: {
        id: id
      },
      data: updateSessoesDto
    });
  }

  async remove(id: number) {
    return await this.prismaService.sessao.delete({
      where: {
        id: id
      }
    });
  }
}
