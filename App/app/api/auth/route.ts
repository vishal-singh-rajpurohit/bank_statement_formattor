import type { NextApiRequest, NextApiResponse } from 'next'

export async function POST(
    req: NextApiRequest,
    resp: NextApiResponse
){



    resp.status(200).json(
        {
            'message': 'hii bro we are here'
        }
    )
}