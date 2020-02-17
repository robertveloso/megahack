import User from '../models/User';
import Obligation from '../models/Obligation';

import Queue from '../../lib/Queue';

import CancellationMail from '../jobs/CancellationMail';

import Error from '../../error';

import Cache from '../../lib/Cache';

class CancelObligationService {
  async run({ provider_id, user_id }) {
    const obligation = await Obligation.findByPk(provider_id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (obligation.user_id !== user_id)
      throw new Error({
        status: 401,
        message: "You're not allowed to cancel this obligation.",
      });

    if (obligation.canceled_at)
      throw new Error({
        status: 400,
        message: 'This obligation is already canceled.',
      });

    if (!obligation.cancelable)
      throw new Error({
        status: 400,
        message: 'You can only cancel obligations 2 hours in advance',
      });

    obligation.canceled_at = new Date();

    await obligation.save();

    /**
     * Invalidate Cache
     */
    await Cache.invalidatePrefix(`user:${user_id}:obligations`);

    await Queue.add(CancellationMail.key, {
      obligation,
    });
  }
}

export default new CancelObligationService();
