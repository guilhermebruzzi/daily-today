import type { NextApiRequest, NextApiResponse } from 'next'

import { doWeHaveDailyToday, getZapierAnswer } from '../../utils/answer'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  const answer = doWeHaveDailyToday()

  res.status(200).json({
    answer,
    zapierTrigger: getZapierAnswer(answer),
  })
}
