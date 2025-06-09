import { Module } from '@nestjs/common';
import { IngressosService } from './ingressos.service';
import { IngressosController } from './ingressos.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [IngressosController],
  providers: [IngressosService, PrismaService],
})
export class IngressosModule {}
