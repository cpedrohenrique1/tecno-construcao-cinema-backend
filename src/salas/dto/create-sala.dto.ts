export class CreateSalaDto {
  nome: string;
  capacidade: number;
  tipo: string;

  constructor(nome: string, capacidade: number, tipo: string) {
    this.nome = nome;
    this.capacidade = capacidade;
    this.tipo = tipo;
  }
}
