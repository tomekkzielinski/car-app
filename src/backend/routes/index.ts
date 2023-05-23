import express from 'express'
import getStatus from './status/get.status'
import postUser from './user/post.user'
import loginUser from './user/login.user'
import addCar from './car/add.car'
import deleteCar from './car/delete.car'
import listCars from './car/list.cars'
import rentCar from './car/rent.car'
import returnCar from './car/return.car'
import listMyCars from './car/list.my.cars'
import getCar from './car/get.car'

const router = express.Router()
// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})
const userRoutes = [postUser, loginUser]
const carRoutes = [listCars, listMyCars, addCar, getCar, deleteCar, rentCar, returnCar]
const apiRoutes = [getStatus, ...userRoutes, ...carRoutes]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler),
)
export default router
