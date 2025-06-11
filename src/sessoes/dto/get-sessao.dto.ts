import { CreateFilmeDto } from 'src/filme/dto/create-filme.dto';
import { CreateSalaDto } from 'src/salas/dto/create-sala.dto';

export class GetSessaoDto {
  id: number;
  filme: CreateFilmeDto;
  sala: CreateSalaDto;
  dataHora: Date;
  preco: number;
  idioma: string;
  formato: string;

  constructor(
    id: number,
    filme: CreateFilmeDto,
    sala: CreateSalaDto,
    dataHora: Date,
    preco: number,
    idioma: string,
    formato: string,
  ) {
    this.id = id;
    this.filme = filme;
    this.sala = sala;
    this.dataHora = dataHora;
    this.preco = preco;
    this.idioma = idioma;
    this.formato = formato;
  }
}
