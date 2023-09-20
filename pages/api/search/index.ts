import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Product } from '@/models'
import { IProduct } from '@/interfaces'

type Data =
    | { message: string }
    | IProduct[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    return res.status(400).json({
        message: 'Debe especificar el query de la búsqueda'
    })
}