import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import Obligation from '../models/Obligation';

import Notification from '../schemas/Notification';

import Error from '../../error';

import Cache from '../../lib/Cache';

class CreateObligationService {
  async run({
    provider_id,
    user_id,
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
  }) {
    /**
     * Check if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider)
      throw new Error({
        status: 400,
        message: 'You can only create obligations with providers',
      });

    if (user_id === provider_id)
      throw new Error({
        status: 400,
        message: "You can't create obligations with yourself",
      });

    /**
     * Check for past dates
     */
    const hourStart = startOfHour(parseISO(data));

    if (isBefore(hourStart, new Date()))
      throw new Error({
        status: 400,
        message: 'Past dates are not allowed',
      });

    /**
     * Check if data is unavailable
     */
    const checkDateIsUnavailable = await Obligation.findOne({
      where: {
        provider_id,
        canceled_at: null,
        data: hourStart,
      },
    });

    if (checkDateIsUnavailable)
      throw new Error({
        status: 400,
        message: 'Obligation data is unavailable',
      });

    /**
     * Finally creates obligation
     */
    const obligation = await Obligation.create({
      user_id,
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
    });

    /**
     * Invalidate Cache
     */
    await Cache.invalidatePrefix(`user:${user_id}:obligations`);

    /**
     * Notify obligation provider
     */
    const user = await User.findByPk(user_id);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return obligation;
  }
}

export default new CreateObligationService();
