import { Request, Response } from 'express'
import { body } from 'express-validator'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { TCustomError, handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

interface CarDTO {
    id: string
    brand: string
    model: string
    rented: boolean
}

export default {
    method: 'get',
    path: '/api/car',
    validators: [authorize, body('carId').isUUID()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus: StatusCodes.NOT_FOUND,
            execute: async () => {
                const { carId } = req.params
                const car = await prisma.car.findFirst({ where: { id: carId } })
                if (!car) {
                    throw {
                        status: StatusCodes.NOT_FOUND,
                        message: ReasonPhrases.NOT_FOUND,
                        isCustomError: true,
                    } as TCustomError
                }
                const carDTO: CarDTO = {
                    id: car.id,
                    brand: car.brand,
                    model: car.model,
                    rented: car.renterId !== null,
                }
                return carDTO
            },
        }),
} as TRoute
