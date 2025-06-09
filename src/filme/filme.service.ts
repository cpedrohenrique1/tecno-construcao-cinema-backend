import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilmeService {
  constructor(private prismaService: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto) {
    const filmeAlreadyExists = await this.prismaService.filme.findUnique({
      where: {
        titulo: createFilmeDto.titulo,
      },
    });
    if (filmeAlreadyExists) {
      throw new ConflictException('Filme já cadastrado');
    }
    return await this.prismaService.filme.create({
      data: createFilmeDto,
    });
  }

  async findAll() {
    return await this.prismaService.filme.findMany();
  }

  async findOne(id: number) {
    const filme = await this.prismaService.filme.findUnique({
      where: {
        id: id,
      },
    });
    if (!filme) {
      throw new NotFoundException('Filme não encontrado');
    }
    return filme;
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto) {
    const filme = await this.prismaService.filme.findUnique({
      where: {
        id: id,
      },
    });
    if (!filme) {
      throw new NotFoundException('Filme não encontrado');
    }
    return await this.prismaService.filme
      .update({
        where: {
          id: id,
        },
        data: updateFilmeDto,
      })
      .catch(() => {
        throw new ConflictException('Filme já cadastrado com este título');
      });
  }

  async remove(id: number) {
    const filme = await this.prismaService.filme.findUnique({
      where: {
        id: id,
      },
    });
    if (!filme) {
      throw new NotFoundException('Filme não encontrado');
    }
    return await this.prismaService.filme.delete({
      where: {
        id: id,
      },
    });
  }
}
