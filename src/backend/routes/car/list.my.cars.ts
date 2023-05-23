import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { UUID } from 'crypto'

interface CarDTO {
    id: string
    brand: string
    model: string
    rented: boolean
}

export default {
    method: 'get',
    path: '/api/cars/rented',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            messages: { uniqueConstraintFailed: 'Email must be unique.' },
            execute: async () => {
                const userId = res.locals.auth.userId as UUID
                const cars = await prisma.car.findMany({
                    where: { renterId: userId },
                })
                const carsDTOs = cars.map((car) => {
                    const carDTO: CarDTO = {
                        id: car.id,
                        brand: car.brand,
                        model: car.model,
                        rented: car.renterId !== null,
                    }
                    return carDTO
                })
                return carsDTOs
            },
        }),
} as TRoute
