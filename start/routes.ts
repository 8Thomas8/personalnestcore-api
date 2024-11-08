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
const SupportResponseController = () => import('#controllers/support_response_controller')
const SupportController = () => import('#controllers/support_controller')

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
            router.post('support', [SupportController, 'create'])
            router.get('support', [SupportController, 'readAll'])
            router.get('support/:id', [SupportController, 'readOne'])
            router.put('support/:id', [SupportController, 'update']) // TODO IF ADMIN
            router.post('support/response', [SupportResponseController, 'create'])
          })
          .use(middleware.auth())
      })
      .prefix('v1')
  })
  .prefix('api')
