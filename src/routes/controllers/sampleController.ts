import { Request, Response, NextFunction } from 'express'
import { InternalError } from '../../errors'
import { container } from '../../modules/dependencyContainer'
import * as SampleModule from '../../modules/_sample'

const sampleService: SampleModule.interfaces.ISampleService = container.get(SampleModule.DI_TYPES.SampleService)

async function createSample(req: Request, res: Response, next: NextFunction) {
  const email: string = req.body.email
  const name: string = req.body.name

  return sampleService
    .createSample({ email, name })
    .then((sample: SampleModule.types.ISample) => {
      return res.status(201).json({
        uuid: sample.uuid,
        email: sample.email,
        name: sample.name
      })
    })
    .catch((error: Error) => {
      if (
        error instanceof SampleModule.errors.BadSampleUpdateDataError ||
        error instanceof SampleModule.errors.BadSampleDeletionDataError
      ) {
        next(error)
      } else {
        logger.error('Sample creation error', { error })
        throw new InternalError('Failed to create sample')
      }
    })
}

async function updateSample(req: Request, res: Response, next: NextFunction) {
  const uuid: string = req.body.uuid
  const updates: object = req.body.updates

  return sampleService
    .updateSampleByUuid(uuid, updates)
    .then(() => {
      return res.status(204).send()
    })
    .catch((error: Error) => {
      if (error instanceof SampleModule.errors.BadSampleUpdateDataError) {
        next(error)
      } else {
        logger.error('Sample update error', { error })
        throw new InternalError('Failed to update sample')
      }
    })
}

async function deleteSample(req: Request, res: Response, next: NextFunction) {
  const uuid: string = req.body.uuid

  return sampleService
    .deleteSampleByUuid(uuid)
    .then(() => {
      return res.status(204).send()
    })
    .catch((error: Error) => {
      if (error instanceof SampleModule.errors.BadSampleDeletionDataError) {
        next(error)
      } else {
        logger.error('Sample deletion error', { error })
        throw new InternalError('Failed to delete sample')
      }
    })
}

export default {
  createSample,
  updateSample,
  deleteSample
}
