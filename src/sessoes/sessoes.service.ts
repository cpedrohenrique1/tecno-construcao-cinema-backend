import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessoesDto } from './dto/create-sessoes.dto';
import { UpdateSessoesDto } from './dto/update-sessoes.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetSessaoDto } from './dto/get-sessao.dto';
import { CreateFilmeDto } from 'src/filme/dto/create-filme.dto';
import { CreateSalaDto } from 'src/salas/dto/create-sala.dto';

@Injectable()
export class SessoesService {
  constructor(private readonly prismaService: PrismaService) { }

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
    const sessoes = await this.prismaService.sessao.findMany();
    const getSessoesDto: GetSessaoDto[] = await Promise.all(
      sessoes.map(async value => {
        const filmeExists = await this.prismaService.filme.findUnique({
          where: { id: value.filmeId }
        });
        const salaExists = await this.prismaService.sala.findUnique({
          where: { id: value.salaId }
        });
        if (!filmeExists || !salaExists) {
          throw new NotFoundException("Não foi possível encontrar filme ou sala");
        }
        return new GetSessaoDto(
          value.id,
          new CreateFilmeDto(
            filmeExists.titulo,
            filmeExists.descricao,
            filmeExists.genero,
            filmeExists.classificacao,
            filmeExists.duracao,
            filmeExists.dataEstreia
          ),
          new CreateSalaDto(
            salaExists.nome,
            salaExists.capacidade,
            salaExists.tipo
          ),
          value.dataHora,
          value.preco,
          value.idioma,
          value.formato
        );
      })
    );
    return getSessoesDto;
  }

  async findOne(id: number) {
    const sessaoExists = await this.prismaService.sessao.findUnique({
      where: {
        id: id
      }
    });
    if (!sessaoExists) {
      throw new NotFoundException("Sessão não encontrada");
    }
    const filmeExists = await this.prismaService.filme.findUnique({
      where: {
        id: sessaoExists.filmeId
      }
    });
    if (!filmeExists) {
      throw new NotFoundException("Filme não encontrado");
    }
    const salaExists = await this.prismaService.sala.findUnique({
      where: {
        id: sessaoExists.salaId
      }
    });
    if (!salaExists) {
      throw new NotFoundException("Sala não encontrada");
    }
    const getSessaoDto: GetSessaoDto = new GetSessaoDto(sessaoExists.id, new CreateFilmeDto(
      filmeExists.titulo,
      filmeExists.descricao,
      filmeExists.genero,
      filmeExists.classificacao,
      filmeExists.duracao,
      filmeExists.dataEstreia
    ), new CreateSalaDto(
      salaExists.nome,
      salaExists.capacidade,
      salaExists.tipo
    ), sessaoExists.dataHora, 
    sessaoExists.preco,
    sessaoExists.idioma, 
    sessaoExists.formato);
    return getSessaoDto;
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
