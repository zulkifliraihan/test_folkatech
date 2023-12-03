import express from 'express';
import { Request, Response } from "express";
import * as Minio from 'minio'
import * as fs from 'fs';
import * as path from 'path';

import RouteGroup from 'express-route-grouping';

// ---- START : SECTION USER -------
import UserRepository from '../app/repository/UserRepository/UserRepository';
import UserService from '../app/services/UserService';
import UserController from '../app/controllers/UserController';
import AuthController from '../app/controllers/AuthController';
import AuthService from '../app/services/AuthService';
import JWTMiddleware from '../app/middlewares/JWTMiddleware';
import RoleController from '../app/controllers/RoleController';
import RoleService from '../app/services/RoleService';
import RoleRepository from '../app/repository/RoleRepository/RoleRepository';
import RoleMiddleware from '../app/middlewares/RoleMiddleware';
import ProfileRepository from '../app/repository/ProfileRepository/ProfileRepository';

import StoreController from '../app/controllers/StoreController';
import StoreService from '../app/services/StoreService';
import StoreRepository from '../app/repository/StoreRepository/StoreRepository';

import ProductController from '../app/controllers/ProductController';
import ProductService from '../app/services/ProductService';
import ProductRepository from '../app/repository/ProductRepository/ProductRepository';
import minioConfig from '../config/minio';
import GlobalHelper from '../app/helpers/GlobalHelper';

// ---- END : SECTION USER -------

const route = express.Router()



// START : PROFILE -  CONTROLLER, SERVICE, REPOSITORY
const profileRepository = new ProfileRepository()
// END : PROFILE -  CONTROLLER, SERVICE, REPOSITORY 

// START : USER -  CONTROLLER, SERVICE, REPOSITORY 
const userRepository = new UserRepository()
const userService = new UserService(userRepository, profileRepository)
const userController = new UserController(userService)
// END : USER -  CONTROLLER, SERVICE, REPOSITORY 

// START : ROLE -  CONTROLLER, SERVICE, REPOSITORY 
const roleRepository = new RoleRepository()
const roleService = new RoleService(roleRepository)
const roleController = new RoleController(roleService)
// END : ROLE -  CONTROLLER, SERVICE, REPOSITORY 

// START : STORE -  CONTROLLER, SERVICE, REPOSITORY 
const storeRepository = new StoreRepository()
const storeService = new StoreService(storeRepository)
const storeController = new StoreController(storeService)
// END : STORE -  CONTROLLER, SERVICE, REPOSITORY 

// START : PRODUCT -  CONTROLLER, SERVICE, REPOSITORY 
const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)
// END : PRODUCT -  CONTROLLER, SERVICE, REPOSITORY 

// START : AUTHENTICATION -  CONTROLLER, SERVICE, REPOSITORY 
const authService = new AuthService(userRepository)
const authController = new AuthController(authService)
// END : AUTHENTICATION -  CONTROLLER, SERVICE, REPOSITORY 

const authentication = new RouteGroup('/authentication', route)
authentication.group('/', auth => {
    auth.post('/register', authController.register.bind(authController))
    auth.post('/login', authController.login.bind(authController))
})


const users = new RouteGroup('/users', route)
users.group('/',user => {

    user.get('/', JWTMiddleware, RoleMiddleware('admin'), userController.getData.bind(userController))
    user.post('/', JWTMiddleware, RoleMiddleware('admin'), userController.createData.bind(userController))
    user.get('/:id', JWTMiddleware, RoleMiddleware('admin'), userController.detailData.bind(userController))
    user.put('/:id', JWTMiddleware, RoleMiddleware('admin'), userController.updateData.bind(userController))
    user.delete('/:id', JWTMiddleware, RoleMiddleware('admin'), userController.deleteData.bind(userController))

})

const roles = new RouteGroup('/roles', route)
roles.group('/',role => {
    role.get('/', JWTMiddleware, RoleMiddleware('admin'), roleController.getData.bind(roleController))
    role.post('/', JWTMiddleware, RoleMiddleware('admin'), roleController.createData.bind(roleController))
    role.get('/:id', JWTMiddleware, RoleMiddleware('admin'), roleController.detailData.bind(roleController))
    role.put('/:id', JWTMiddleware, RoleMiddleware('admin'), roleController.updateData.bind(roleController))
    role.delete('/:id', JWTMiddleware, RoleMiddleware('admin'), roleController.deleteData.bind(roleController))
})

const stores = new RouteGroup('/stores', route)
stores.group('/',store => {
    store.get('/', JWTMiddleware, RoleMiddleware('admin'), storeController.getData.bind(storeController))
    store.post('/', JWTMiddleware, RoleMiddleware('admin'), storeController.createData.bind(storeController))
    store.get('/:id', JWTMiddleware, RoleMiddleware('admin'), storeController.detailData.bind(storeController))
    store.put('/:id', JWTMiddleware, RoleMiddleware('admin'), storeController.updateData.bind(storeController))
    store.delete('/:id', JWTMiddleware, RoleMiddleware('admin'), storeController.deleteData.bind(storeController))
})

const products = new RouteGroup('/products', route)
products.group('/',product => {
    product.get('/', productController.getData.bind(productController))
    product.get('/test', async (req: Request, res: Response) => {
        const minioClient = minioConfig

        const file = path.resolve(__dirname, '../hello.text'); // Use an absolute path
        
        const globalHelper = new GlobalHelper()

        globalHelper.uploadFile("helloworld.text", file)

        return res.send('Admin Homepage')
    })
    product.post('/', productController.createData.bind(productController))
    product.get('/:id', productController.detailData.bind(productController))
    product.put('/:id', productController.updateData.bind(productController))
    product.delete('/:id', productController.deleteData.bind(productController))
})


export default route
