import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      data: Yup.date().required(),
      data_venc_at: Yup.date().required(),
      valor: Yup.number().required(),
      instrucoes: Yup.string().required(),
      link_doc: Yup.string().required(),
      nosso_numero: Yup.string().required(),
      cpf_cnpj_beneficiario: Yup.string().required(),
      nome_beneficiario: Yup.string().required(),
      endereco_beneficiario: Yup.string().required(),
      nome_fantasia_beneficiario: Yup.string().required(),
      cpf_cnpj_pagador: Yup.string().required(),
      nome_pagador: Yup.string().required(),
      endereco_pagador: Yup.string().required(),
      if_pagamento: Yup.string().required(),
      agencia_pagamento: Yup.string().required(),
      conta_pagamento: Yup.string().required(),
      periodicidade_assinatura: Yup.string().required(),
      nome_plano: Yup.string().required(),
      data_hora_proc: Yup.string().required(),
      meio_pg_proc: Yup.string().required(),
    });
    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
