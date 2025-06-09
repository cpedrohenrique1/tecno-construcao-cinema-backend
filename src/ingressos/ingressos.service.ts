import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IngressosService {
  constructor (private readonly prismaService: PrismaService) {}

  async create(createIngressoDto: CreateIngressoDto) {
    const sessaoExists = await this.prismaService.sessao.findUnique({
      where: {
        id: createIngressoDto.sessaoId
      }
    });
    if (!sessaoExists) {
      throw new NotFoundException("Sessao não encontrada, não foi possível cadastrar ingresso");
    }
    return await this.prismaService.ingresso.create({
      data: {
        ...createIngressoDto,
        dataHoraCompra: new Date(),
        preco: sessaoExists.preco
      }
    });
  }

  async findAll() {
    return await this.prismaService.ingresso.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.ingresso.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateIngressoDto: UpdateIngressoDto) {
    const sessaoExists = await this.prismaService.sessao.findUnique({
      where: {
        id: updateIngressoDto.sessaoId
      }
    });
    if (!sessaoExists) {
      throw new NotFoundException("Sessao não encontrada, não foi possível atualizar ingresso");
    }
    const ingressoExists = await this.prismaService.ingresso.findMany({
      where:{
        id: id
      }
    });
    if (!ingressoExists) {
      throw new NotFoundException("Não é possível atualizar um ingresso que não existe");
    }
    return await this.prismaService.ingresso.update({
      where: {
        id: id
      },
      data: updateIngressoDto
    });
  }

  async remove(id: number) {
    const ingressoExists = await this.prismaService.ingresso.findUnique({
      where:{
        id: id
      }
    });
    if (!ingressoExists) {
      throw new NotFoundException("Não é possível atualizar um ingresso que não existe");
    }
    return await this.prismaService.ingresso.delete({
      where: {
        id: id
      }
    });
  }
}
