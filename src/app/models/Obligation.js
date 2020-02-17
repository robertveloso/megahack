import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Obligation extends Model {
  static init(sequelize) {
    super.init(
      {
        data: Sequelize.DATE,
        data_venc_at: Sequelize.DATE,
        valor: Sequelize.FLOAT,
        instrucoes: Sequelize.STRING,
        link_doc: Sequelize.STRING,
        nosso_numero: Sequelize.STRING, // 8 number

        /* Dados do beneficiário/emitente */
        cpf_cnpj_beneficiario: Sequelize.STRING, // CPF/CNPJ
        nome_beneficiario: Sequelize.STRING, // CPF/CNPJ
        endereco_beneficiario: Sequelize.STRING, // CPF/CNPJ
        nome_fantasia_beneficiario: Sequelize.STRING, // CPF/CNPJ

        /* Dados do pagador */
        cpf_cnpj_pagador: Sequelize.STRING, // CPF/CNPJ
        nome_pagador: Sequelize.STRING, // CPF/CNPJ
        endereco_pagador: Sequelize.STRING, // CPF/CNPJ

        /* Dados bancários para pagamento */

        if_pagamento: Sequelize.STRING, // CPF/CNPJ
        agencia_pagamento: Sequelize.STRING, // CPF/CNPJ
        conta_pagamento: Sequelize.STRING, // PIX

        /* Dados de assinatura(opcional) */
        periodicidade_assinatura: Sequelize.STRING, // CPF/CNPJ
        nome_plano: Sequelize.STRING, // CPF/CNPJ

        /* Dados do processamento */
        data_hora_proc: Sequelize.DATE,
        meio_pg_proc: Sequelize.STRING,

        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'comprovante_id',
      as: 'comprovante',
    });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Obligation;
