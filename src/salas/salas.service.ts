import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalasService {
  constructor(private prismaService: PrismaService) {}

  async create(createSalaDto: CreateSalaDto) {
    const salaAlreadyExists = await this.prismaService.sala.findUnique({
      where: {
        nome: createSalaDto.nome,
      },
    });
    if (salaAlreadyExists) {
      throw new ConflictException('Sala já cadastrada');
    }
    return this.prismaService.sala.create({
      data: createSalaDto,
    });
  }

  async findAll() {
    return await this.prismaService.sala.findMany();
  }

  async findOne(id: number) {
    const sala = await this.prismaService.sala.findUnique({
      where: {
        id: id,
      },
    });
    if (!sala) {
      throw new NotFoundException('Sala não encontrada');
    }
    return sala;
  }

  async update(id: number, updateSalaDto: UpdateSalaDto) {
    const salaExists = await this.prismaService.sala.findUnique({
      where: {
        id: id,
      },
    });
    if (!salaExists) {
      throw new NotFoundException(
        'A sala não foi encontrada, impossível atualizar',
      );
    }
    return await this.prismaService.sala.update({
      where: {
        id: id,
      },
      data: updateSalaDto,
    });
  }

  async remove(id: number) {
    const salaExists = await this.prismaService.sala.findUnique({
      where: {
        id: id,
      },
    });
    if (!salaExists) {
      throw new NotFoundException('A sala não foi encontrada');
    }
    return await this.prismaService.sala.delete({
      where: {
        id: id,
      },
    });
  }
}
