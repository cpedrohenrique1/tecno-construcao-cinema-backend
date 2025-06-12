import { GetSessaoDto } from 'src/sessoes/dto/get-sessao.dto';

export class GetIngressoDto {
  id: number;
  cpfCliente: string;
  nomeCliente: string;
  formaPagamento: string;
  preco: number;
  dataHoraCompra: Date;
  sessao: GetSessaoDto;

  constructor(
    id: number,
    cpfCliente: string,
    nomeCliente: string,
    formaPagamento: string,
    sessao: GetSessaoDto,
    preco: number,
    dataHoraCompra: Date
  ) {
    this.id = id;
    this.cpfCliente = cpfCliente;
    this.nomeCliente = nomeCliente;
    this.formaPagamento = formaPagamento;
    this.sessao = sessao;
    this.preco = preco;
    this.dataHoraCompra = dataHoraCompra;
  }
}
