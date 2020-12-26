import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { server } from 'config/config';

export const getPostListData = (category: string, page: string) => {

    try {
        const result = axios.get(`${server.host}/post`, {
            params: {
                category: category,
                page: page,
            },
        });

        console.log(result);
        

        return JSON.stringify({
            status: 200,
            message: 'post list lookup success',
            data: {
                posts: result,
            }
        });
    } catch (error) {
       return JSON.stringify({
            status: 500,
            message: 'post list lookup success',
       });
    }
};