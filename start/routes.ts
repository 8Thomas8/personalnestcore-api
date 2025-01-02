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

const UserController = () => import('#controllers/user_controller')
const AuthController = () => import('#controllers/auth_controller')
const DrugBrandController = () => import('#controllers/drug_brand_controller')
const DrugNameController = () => import('#controllers/drug_name_controller')
const UserDrugController = () => import('#controllers/user_drug_controller')

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
            router.post('drug-brand', [DrugBrandController, 'create'])
            router.get('drug-brand', [DrugBrandController, 'readAll'])
            router.delete('drug-brand/:id', [DrugBrandController, 'delete'])
            router.post('drug-name', [DrugNameController, 'create'])
            router.get('drug-name', [DrugNameController, 'readAllByDrugBrandId'])
            router.delete('drug-name/:id', [DrugNameController, 'delete'])
            router.post('user-drug', [UserDrugController, 'create'])
            router.get('user-drug', [UserDrugController, 'readAll'])
            router.delete('user-drug/:id', [UserDrugController, 'delete'])
            router.put('user-drug/:id', [UserDrugController, 'update'])
            router.patch('user-drug/:id/quantity', [UserDrugController, 'updateQuantity'])
          })
          .use(middleware.auth())
      })
      .prefix('v1')
  })
  .prefix('api')
