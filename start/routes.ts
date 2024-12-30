/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import DrugBrand from '#models/drug_brand'
import DrugName from '#models/drug_name'
import UserDrug from '#models/user_drug'

const UserController = () => import('#controllers/user_controller')
const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('auth/register', [AuthController, 'register'])
        router.post('auth/login', [AuthController, 'login'])
        router.post('auth/logout', [AuthController, 'logout'])
        router.get('/me', [UserController, 'me']).use(middleware.auth())
        router
          .group(() => {
            router.post('drug-brand', [DrugBrand, 'create'])
            router.get('drug-brand', [DrugBrand, 'readAll'])
            router.delete('drug-brand/:id', [DrugBrand, 'delete'])
            router.post('drug-name', [DrugName, 'create'])
            router.get('drug-name', [DrugName, 'readAll'])
            router.delete('drug-name/:id', [DrugName, 'delete'])
            router.post('user-drug', [UserDrug, 'create'])
            router.get('user-drug', [UserDrug, 'readAll'])
            router.delete('user-drug/:id', [UserDrug, 'delete'])
          })
          .use(middleware.auth())
      })
      .prefix('v1')
  })
  .prefix('api')
