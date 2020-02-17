import User from '../models/User';
import File from '../models/File';
import Obligation from '../models/Obligation';

import CreateObligationService from '../services/CreateObligationService';
import CancelObligationService from '../services/CancelObligationService';

import Cache from '../../lib/Cache';

class ObligationController {
  async index(req, res) {
    const user_id = req.userId;

    const { page = 1 } = req.query;
    const perPage = 20;

    const cacheKey = `user:${user_id}:obligations:${page}`;
    const cached = await Cache.get(cacheKey);

    if (cached) return res.json(cached);

    const obligations = await Obligation.findAll({
      where: { user_id, canceled_at: null },
      order: ['data'],
      attributes: ['id', 'data', 'past', 'cancelable'],
      limit: perPage,
      offset: (page - 1) * perPage,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    await Cache.set(cacheKey, obligations);

    return res.json(obligations);
  }

  async store(req, res) {
    const {
      provider_id,
      data,
      data_venc_at,
      valor,
      instrucoes,
      link_doc,
      nosso_numero,
      cpf_cnpj_beneficiario,
      nome_beneficiario,
      endereco_beneficiario,
      nome_fantasia_beneficiario,
      cpf_cnpj_pagador,
      nome_pagador,
      endereco_pagador,
      if_pagamento,
      agencia_pagamento,
      conta_pagamento,
      periodicidade_assinatura,
      nome_plano,
      data_hora_proc,
      meio_pg_proc,
      comprovante_vinculado_proc,
    } = req.body;

    const obligation = await CreateObligationService.run({
      provider_id,
      user_id: req.userId,
      data,
      data_venc_at,
      valor,
      instrucoes,
      link_doc,
      nosso_numero,
      cpf_cnpj_beneficiario,
      nome_beneficiario,
      endereco_beneficiario,
      nome_fantasia_beneficiario,
      cpf_cnpj_pagador,
      nome_pagador,
      endereco_pagador,
      if_pagamento,
      agencia_pagamento,
      conta_pagamento,
      periodicidade_assinatura,
      nome_plano,
      data_hora_proc,
      meio_pg_proc,
      comprovante_vinculado_proc,
    });

    return res.json(obligation);
  }

  async update(req, res) {
    const { id: pk } = req.params;
    const obligation = await Obligation.findByPk(pk);

    await obligation.update(req.body);

    const { id, comprovante } = await Obligation.findByPk(pk, {
      include: [
        {
          model: File,
          as: 'comprovante',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      comprovante,
    });
  }

  async delete(req, res) {
    const obligation = await CancelObligationService.run({
      provider_id: req.params.id,
      user_id: req.userId,
    });

    return res.json(obligation);
  }
}

export default new ObligationController();
