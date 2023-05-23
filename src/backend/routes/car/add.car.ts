import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { v4 } from 'uuid'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

interface CarDTO {
    id: string
    brand: string
    model: string
    rented: boolean
}

export default {
    method: 'post',
    path: '/api/car',
    validators: [
        authorize,
        body('model').not().isEmpty(),
        body('brand').not().isEmpty(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                const { model, brand } = req.body
                const car = await prisma.car.create({
                    data: {
                        id: v4(),
                        model,
                        brand,
                    },
                })
                const carDTO: CarDTO = {
                    id: car.id,
                    brand: car.brand,
                    model: car.model,
                    rented: false,
                }
                return carDTO
            },
        }),
} as TRoute
