import { inject, injectable } from 'inversify'
import { ISampleRepo, ISampleService } from '../interfaces'
import { DI_TYPES } from '../diTypes'
import { ISample, ISampleCreateData, ISampleUpdateData } from '../types'
import { BadSampleDeletionDataError, BadSampleUpdateDataError } from '../errors'

@injectable()
class SampleService implements ISampleService {
  private readonly sampleRepo: ISampleRepo

  public constructor(@inject(DI_TYPES.SampleRepo) sampleRepo: ISampleRepo) {
    this.sampleRepo = sampleRepo
  }

  async createSample(data: ISampleCreateData): Promise<ISample> {
    return this.sampleRepo.create(data)
  }

  async getSampleByUuid(uuid: string): Promise<ISample | null> {
    return this.sampleRepo.getByUuid(uuid)
  }

  async getSamplesByName(name: string): Promise<ISample[]> {
    return this.sampleRepo.getByName(name)
  }

  async updateSampleByUuid(uuid: string, data: ISampleUpdateData): Promise<Array<number>> {
    const affectedRows: Array<number> = await this.sampleRepo.updateByUuid(uuid, data)
    if (!affectedRows || !!affectedRows[0]) {
      throw new BadSampleUpdateDataError('Failed to update sample - 0 rows affected')
    }
    return affectedRows
  }

  async deleteSampleByUuid(uuid: string, suppressError: boolean = false): Promise<number> {
    const affectedRows: number = await this.sampleRepo.deleteByUuid(uuid)
    if (affectedRows < 0 && !suppressError) {
      throw new BadSampleDeletionDataError('Failed to delete sample - 0 rows affected')
    }
    return affectedRows
  }
}

export default SampleService
