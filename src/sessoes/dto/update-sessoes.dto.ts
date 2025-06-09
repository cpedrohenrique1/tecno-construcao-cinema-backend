import { PartialType } from '@nestjs/mapped-types';
import { CreateSessoesDto } from './create-sessoes.dto';

export class UpdateSessoesDto extends PartialType(CreateSessoesDto) {}
