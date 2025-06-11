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
  ) {}

  async create(createIngressoDto: CreateIngressoDto) {
    const sessaoExists = await this.prismaService.sessao.findUnique({
      where: {
        id: createIngressoDto.sessaoId,
      },
    });
    if (!sessaoExists) {
      throw new NotFoundException(
        'Sessao não encontrada, não foi possível cadastrar ingresso',
      );
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
      throw new NotFoundException('Nenhum ingresso encontrado');
    }
    return Promise.all(
      response.map(async (ingresso) => {
        const sessao = await this.sessoesService.findOne(ingresso.sessaoId);
        if (!sessao) {
          throw new NotFoundException(
            'Sessão associada ao ingresso não encontrada',
          );
        }
        return new GetIngressoDto(
          ingresso.id,
          ingresso.cpfCliente,
          ingresso.formaPagamento,
          sessao,
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
      throw new NotFoundException('Ingresso não encontrado');
    }
    const sessao = await this.sessoesService.findOne(response.sessaoId);
    return new GetIngressoDto(
      id,
      response.cpfCliente,
      response.formaPagamento,
      sessao,
    );
  }

  async update(id: number, updateIngressoDto: UpdateIngressoDto) {
    const sessaoExists = await this.prismaService.sessao.findUnique({
      where: {
        id: updateIngressoDto.sessaoId,
      },
    });
    if (!sessaoExists) {
      throw new NotFoundException(
        'Sessao não encontrada, não foi possível atualizar ingresso',
      );
    }
    const ingressoExists = await this.prismaService.ingresso.findMany({
      where: {
        id: id,
      },
    });
    if (!ingressoExists) {
      throw new NotFoundException(
        'Não é possível atualizar um ingresso que não existe',
      );
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
      throw new NotFoundException(
        'Não é possível atualizar um ingresso que não existe',
      );
    }
    return await this.prismaService.ingresso.delete({
      where: {
        id: id,
      },
    });
  }
}
