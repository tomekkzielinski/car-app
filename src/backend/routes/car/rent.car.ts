import { Request, Response } from 'express'
import { body } from 'express-validator'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { TCustomError, handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { UUID } from 'crypto'

interface CarDTO {
    id: string
    brand: string
    model: string
    rented: boolean
}

export default {
    method: 'put',
    path: '/api/car/rent',
    validators: [authorize, body('carId').isUUID()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus:
                StatusCodes.UNPROCESSABLE_ENTITY | StatusCodes.NOT_FOUND,
            execute: async () => {
                const { carId } = req.params
                const userId = res.locals.auth.userId as UUID
                return await prisma
                    .$transaction(async (tx) => {
                        let car = await tx.car.findFirst({
                            where: { id: carId },
                        })
                        if (!car) {
                            throw {
                                status: StatusCodes.NOT_FOUND,
                                message: ReasonPhrases.NOT_FOUND,
                                isCustomError: true,
                            } as TCustomError
                        }
                        if (car.renterId !== null) {
                            throw {
                                status: StatusCodes.UNPROCESSABLE_ENTITY,
                                message: ReasonPhrases.UNPROCESSABLE_ENTITY,
                                isCustomError: true,
                            } as TCustomError
                        }
                        car = await tx.car.update({
                            where: { id: car.id },
                            data: { renterId: userId },
                        })
                        const carDTO: CarDTO = {
                            id: car.id,
                            brand: car.brand,
                            model: car.model,
                            rented: true,
                        }
                        return carDTO
                    })
                    .catch((e) => {
                        throw e
                    })
            },
        }),
} as TRoute
