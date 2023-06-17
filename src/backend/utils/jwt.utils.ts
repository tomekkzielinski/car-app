import jwt from 'jsonwebtoken'
export const createToken = (
    payload: object,
    secret: string,
    expiresIn?: string,
) => {
    return jwt.sign(payload, secret, {
        expiresIn: expiresIn || '30d',
    })
}
export const verifyToken = (
    token: string,
    secret: string,
): { isValid: boolean; content: jwt.JwtPayload } => {
    const parsedToken = token.replace('Bearer ', '')
    // console.log('secret', secret);
    // console.log('parsedToken', parsedToken);
    // console.log('moja zaszyfrowana wartość' , jwt.sign(parsedToken, secret))
    try {
        return {
            isValid: true,
            content: jwt.verify(parsedToken, secret) as jwt.JwtPayload,
        }
    } catch (err) {
        return {
            isValid: false,
            content: {},
        }
    }
}
