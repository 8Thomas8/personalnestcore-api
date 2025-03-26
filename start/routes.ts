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
const AppController = () => import('#controllers/app_controller')
const DrugContainerController = () => import('#controllers/drug_container_controller')
const CustomRecordController = () => import('#controllers/custom_record_controller')
const CustomRecordDataController = () => import('#controllers/custom_record_data_controller')
router
  .group(() => {
    router
      .group(() => {
        router.get('app/version', [AppController, 'getVersion'])
        router.post('auth/register', [AuthController, 'register'])
        router.post('auth/login', [AuthController, 'login'])
        router.post('auth/logout', [AuthController, 'logout'])
        router.get('/me', [AuthController, 'me']).use(middleware.auth())
        router.get('/admin-can-register', [AuthController, 'adminCanRegister'])
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
            router.post('drug-container', [DrugContainerController, 'create'])
            router.get('drug-container', [DrugContainerController, 'readAll'])
            router.delete('drug-container/:id', [DrugContainerController, 'delete'])
            router.get('user', [UserController, 'readAll'])
            router.post('user', [UserController, 'create'])
            router.patch('user/:id', [UserController, 'update'])
            router.delete('user/:id', [UserController, 'delete'])
            router.post('custom-record', [CustomRecordController, 'create'])
            router.get('custom-record', [CustomRecordController, 'readAll'])
            router.get('custom-record/:id', [CustomRecordController, 'readOne'])
            router.put('custom-record/:id', [CustomRecordController, 'update'])
            router.delete('custom-record/:id', [CustomRecordController, 'delete'])
            router.get('custom-record/:custom-record-id/data', [
              CustomRecordDataController,
              'readAllByCustomRecordId',
            ])
            router.post('custom-record/:custom-record-id/data', [
              CustomRecordDataController,
              'create',
            ])
            router.put('custom-record/:custom-record-id/data/:id', [
              CustomRecordDataController,
              'update',
            ])
            router.delete('custom-record/:custom-record-id/data/:id', [
              CustomRecordDataController,
              'delete',
            ])
          })
          .use(middleware.auth())
      })
      .prefix('v1')
  })
  .prefix('api')
