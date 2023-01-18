import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import asyncHandlerDecorator from '../../common/util/asyncHandlerDecorator'
import sampleController from '../controllers/sampleController'

const router: Router = Router()

router.post(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        // Require Authorization header
        // authorization: Joi.string().required()
      })
      // Allow unknown headers
      .unknown(true),
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().required()
    })
  }),
  asyncHandlerDecorator(sampleController.createSample)
)

router.patch(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        // Require Authorization header
        // authorization: Joi.string().required()
      })
      // Allow unknown headers
      .unknown(true),
    [Segments.BODY]: Joi.object().keys({
      uuid: Joi.string().required(),
      updates: Joi.object()
        .keys({
          email: Joi.string(),
          name: Joi.string()
        })
        .required()
    })
  }),
  asyncHandlerDecorator(sampleController.updateSample)
)

router.delete(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        // Require Authorization header
        // authorization: Joi.string().required()
      })
      // Allow unknown headers
      .unknown(true),
    [Segments.BODY]: Joi.object().keys({
      uuid: Joi.string().required()
    })
  }),
  asyncHandlerDecorator(sampleController.deleteSample)
)

export default router
