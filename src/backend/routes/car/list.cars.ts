import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
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
    method: 'get',
    path: '/api/cars/available',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            messages: { uniqueConstraintFailed: 'Email must be unique.' },
            execute: async () => {
                const cars = await prisma.car.findMany({
                    where: { renterId: null },
                })
                const carsDTOs = cars.map((car) => {
                    const carDTO: CarDTO = {
                        id: car.id,
                        brand: car.brand,
                        model: car.model,
                        rented: false,
                    }
                    return carDTO
                })
                return carsDTOs
            },
        }),
} as TRoute
