import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {

    


    res.status(200).json({
      status: 200,
      message: 'login success!',
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'server error',
    });
  }
}

export default handler
