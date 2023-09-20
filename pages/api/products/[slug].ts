import type { NextApiRequest, NextApiResponse } from 'next'
import { SHOP_CONSTANTS, db } from '@/database'
import { Product } from '@/models'
import { IProduct } from '@/interfaces'

type Data = 
    | { message: string } 
    | IProduct

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res)

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();

    const { slug = '' } = req.query;

    const product = await Product.findOne({ slug })
                                .select('-_id -createdAt -updatedAt -__v')
                                .lean();
 
    await db.disconnect();
    if(!product) return res.status(404).json({message: 'No pudimos encontrar el producto'})
    
    return res.status(200).json(product)
}
