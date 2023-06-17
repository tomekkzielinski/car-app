import { Request, Response, NextFunction } from 'express'
import { verifyToken } from './jwt.utils'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
const SECRET = (process.env.TOKEN_SECRET as string) ?? 'XYZ'
export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    const parsedToken = token?.replace('Bearer ', '')
    const result = verifyToken(parsedToken ?? '', SECRET)
    if (!token || !result.isValid) {
        //nie wiem czemu tak, tak mi podpowiedzial czat GPT :)
       return res.sendStatus(StatusCodes.UNAUTHORIZED).json({
            errors: [ReasonPhrases.UNAUTHORIZED],
        })
    } else {
        res.locals.auth = { userId: result.content.id }
        next()
    }
}
