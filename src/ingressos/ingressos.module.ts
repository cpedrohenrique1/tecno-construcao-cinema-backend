import { Module } from '@nestjs/common';
import { IngressosService } from './ingressos.service';
import { IngressosController } from './ingressos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessoesService } from 'src/sessoes/sessoes.service';

@Module({
  controllers: [IngressosController],
  providers: [IngressosService, PrismaService, SessoesService],
})
export class IngressosModule {}
