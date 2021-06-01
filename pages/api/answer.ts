import type { NextApiRequest, NextApiResponse } from 'next'

import { doWeHaveDailyToday } from '../utils/answer'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ answer: doWeHaveDailyToday() })
}
