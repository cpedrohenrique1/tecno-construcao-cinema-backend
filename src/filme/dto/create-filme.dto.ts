export class CreateFilmeDto {
  titulo: string;
  descricao: string;
  genero: string;
  classificacao: string;
  duracao: number;
  dataEstreia: Date;

  constructor(
    titulo: string,
    descricao: string,
    genero: string,
    classificacao: string,
    duracao: number,
    dataEstreia: Date,
  ) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.genero = genero;
    this.classificacao = classificacao;
    this.duracao = duracao;
    this.dataEstreia = dataEstreia;
  }
}
