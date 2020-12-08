import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const getPostListData = (req: NextApiRequest, res: NextApiResponse) => {
    try {



        res.status(200).json({

        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'server error!',
        });
    }
};