import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetIngressoDto } from './dto/get-ingresso.dto';
import { SessoesService } from 'src/sessoes/sessoes.service';

@Injectable()
export class IngressosService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sessoesService: SessoesService,
  ) { }

  async create(createIngressoDto: CreateIngressoDto) {
    const sessaoExists = await this.prismaService.sessao.findUnique({
      where: {
        id: createIngressoDto.sessaoId,
      },
    });
    if (!sessaoExists) {
      return null;
    }
    return await this.prismaService.ingresso.create({
      data: {
        ...createIngressoDto,
        dataHoraCompra: new Date(),
        preco: sessaoExists.preco,
      },
    });
  }

  async findAll() {
    const response = await this.prismaService.ingresso.findMany();
    if (!response) {
      return [];
    }
    return Promise.all(
      response.map(async (ingresso) => {
        const sessao = await this.sessoesService.findOne(ingresso.sessaoId);
        if (!sessao) {
          return [];
        }
        return new GetIngressoDto(
          ingresso.id,
          ingresso.cpfCliente,
          ingresso.nomeCliente,
          ingresso.formaPagamento,
          sessao,
          ingresso.preco,
          ingresso.dataHoraCompra,
        );
      }),
    );
  }

  async findOne(id: number) {
    const response = await this.prismaService.ingresso.findUnique({
      where: {
        id: id,
      },
    });
    if (!response) {
      return null;
    }
    const sessao = await this.sessoesService.findOne(response.sessaoId);
    return new GetIngressoDto(
      id,
      response.cpfCliente,
      response.nomeCliente,
      response.formaPagamento,
      sessao,
      response.preco,
      response.dataHoraCompra,
    );
  }

  async update(id: number, updateIngressoDto: UpdateIngressoDto) {
    const sessaoExists = await this.prismaService.sessao.findUnique({
      where: {
        id: updateIngressoDto.sessaoId,
      },
    });
    if (!sessaoExists) {
      return null;
    }
    const ingressoExists = await this.prismaService.ingresso.findMany({
      where: {
        id: id,
      },
    });
    if (!ingressoExists) {
      return null;
    }
    return await this.prismaService.ingresso.update({
      where: {
        id: id,
      },
      data: updateIngressoDto,
    });
  }

  async remove(id: number) {
    const ingressoExists = await this.prismaService.ingresso.findUnique({
      where: {
        id: id,
      },
    });
    if (!ingressoExists) {
      return null;
    }
    return await this.prismaService.ingresso.delete({
      where: {
        id: id,
      },
    });
  }
}
