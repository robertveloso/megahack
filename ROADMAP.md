1. BD contendo as obrigações (boletos) cadastro de usuários (login senha é suficiente)
   1.1) Função para ordenação do DB por data de emissão dos boletos
   1.2) Segundo DB que será uma cópia do primeiro db, porém sem copiar as linhas (depois explico o pq disso)
   1.3) Terceiro DB apenas para login/senha de acesso ao sistema
2. API com funções:
   2.1) PUTObrigacao(todos dados da obrigação) - se tiver uma maneira mais criativa de fazer essa parte seria ótimo
   2.2) GETObrigações(CPF/CNPJ) que irá responder com XML ou JSON no formato {{contas pagas},{contas a pagar}}
   2.3) PUTComprovante(comprovante recebido pela PIX) que irá inserir o comprovante na sua devida obrigação no BD

- Dados da Obrigação - Data/hora da emissão - Valor - Data de vencimento - Instruções (multa/juros/descontos/etc) - Documento associado (NF/Fatura/etc) – link padronizado - Identificador da obrigação no sistema do emitente – para conciliação

- Dados do beneficiário/emitente - CPF/CNPJ - Nome - Endereço - Nome Fantasia

- Dados do Pagador - CPF/CNPJ - Nome - Endereço

- Dados bancários para pagamento - IF, Agência, Conta (no padrão definido pelo PIX)

- Dados de assinatura(opcional) - Periodicidade (mensal/anual/recorrente/semanal) - Nome do plano

- Dados do processamento - Data/hora - Meio de pagamento - Comprovante Vinculado(recibo/imagem)

Tabela pessoa - CPF/CNPJ - Nome - Endereço - Nome Fantasia - Agencia/Conta: ENUM
