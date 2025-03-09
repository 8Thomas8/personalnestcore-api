import { HttpContext } from '@adonisjs/core/http'
import UserDrug from '#models/user_drug'
import {
  createUserDrugValidator,
  updateUserDrugQuantityValidator,
  updateUserDrugValidator,
} from '#validators/user_drug'
import { DateTime } from 'luxon'

export default class UserDrugController {
  public readAll = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()

      const { itemPerPage, terms, expiredOnly, expireSoon } = request.qs()

      const query = UserDrug.query()
        .preload('drugBrand')
        .preload('drugName')
        .preload('drugContainer')

      if (terms) {
        query
          .whereHas('drugBrand', (brandQuery) => {
            brandQuery.where('name', 'like', `%${terms}%`)
          })
          .orWhereHas('drugName', (nameQuery) => {
            nameQuery.where('name', 'like', `%${terms}%`)
          })
          .orWhere('dose', 'like', `%${terms}%`)
          .orWhere('form', 'like', `%${terms}%`)
      }

      if (expiredOnly === 'true') {
        query.where('expirationDateTime', '<', DateTime.now().toISO())
      }

      if (expireSoon === 'true') {
        const soonDate = DateTime.now().plus({ days: 60 }).toISO()
        query.whereBetween('expirationDateTime', [DateTime.now().toISO(), soonDate])
      }

      return response.ok(await query.paginate(request.input('page', 1), itemPerPage ?? 20))
    } catch (error) {
      console.log(error)
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public create = async ({ auth, request, response }: HttpContext) => {
    try {
      const {
        drugBrandId,
        drugContainerId,
        drugNameId,
        unit,
        form,
        dose,
        expirationDateTime,
        note,
        quantity,
      } = await request.validateUsing(createUserDrugValidator)
      await auth.authenticate()

      const matchingUserDrugs: UserDrug[] = await UserDrug.query()
        .where('drugBrandId', drugBrandId)
        .andWhere('drugNameId', drugNameId)
        // @ts-ignore-next-line
        .andWhere('unit', unit)
        .andWhere('form', form)
        // @ts-ignore-next-line
        .andWhere('dose', dose)
        .andWhere('drugContainerId', drugContainerId)
        .exec()

      const existingUserDrug = matchingUserDrugs?.some((userDrug) => {
        return userDrug.expirationDateTime.toISO() === expirationDateTime.toISO()
      })

      if (existingUserDrug) {
        return response.badRequest({
          message: 'A similar user drug already exists',
        })
      }

      await UserDrug.create({
        drugBrandId,
        drugContainerId,
        drugNameId,
        unit,
        form,
        dose,
        expirationDateTime,
        note,
        quantity,
      })

      return response.created({
        message: 'User drug created successfully',
      })
    } catch (error) {
      console.log(error)
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public delete = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const userDrug = await UserDrug.findOrFail(request.param('id'))

      await userDrug.delete()

      return response.ok({
        message: 'User drug deleted successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public update = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const userDrug = await UserDrug.findOrFail(request.param('id'))

      const { drugBrandId, drugNameId, unit, form, dose, expirationDateTime, note, quantity } =
        await request.validateUsing(updateUserDrugValidator)

      userDrug.merge({
        drugBrandId,
        drugNameId,
        unit: unit,
        form,
        dose: dose,
        expirationDateTime,
        note,
        quantity,
      })

      await userDrug.save()

      return response.ok({
        message: 'User drug updated successfully',
      })
    } catch (error) {
      console.log(error)
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public updateQuantity = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const userDrug = await UserDrug.findOrFail(request.param('id'))

      const { quantity } = await request.validateUsing(updateUserDrugQuantityValidator)

      userDrug.quantity = quantity

      await userDrug.save()

      return response.ok({
        message: 'User drug quantity updated successfully',
      })
    } catch (error) {
      console.log(error)
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }
}
