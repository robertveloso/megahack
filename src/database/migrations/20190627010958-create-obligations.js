module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('obligations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      data: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      data_venc_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      valor: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      instrucoes: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      link_doc: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nosso_numero: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cpf_cnpj_beneficiario: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nome_beneficiario: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      endereco_beneficiario: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nome_fantasia_beneficiario: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cpf_cnpj_pagador: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nome_pagador: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      endereco_pagador: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      if_pagamento: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      agencia_pagamento: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      conta_pagamento: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      periodicidade_assinatura: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nome_plano: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      data_hora_proc: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      meio_pg_proc: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      comprovante_id: {
        type: Sequelize.INTEGER, // Image ID number
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER, // Image ID number
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      provider_id: {
        type: Sequelize.INTEGER, // Image ID number
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('obligations');
  },
};
