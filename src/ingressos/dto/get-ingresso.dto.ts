import { GetSessaoDto } from 'src/sessoes/dto/get-sessao.dto';

export class GetIngressoDto {
  id: number;
  cpfCliente: string;
  formaPagamento: string;
  sessao: GetSessaoDto;

  constructor(
    id: number,
    cpfCliente: string,
    formaPagamento: string,
    sessao: GetSessaoDto,
  ) {
    this.id = id;
    this.cpfCliente = cpfCliente;
    this.formaPagamento = formaPagamento;
    this.sessao = sessao;
  }
}
