import { ISampleCreateData, ISample, ISampleUpdateData } from '../types'

export interface ISampleService {
  createSample(data: ISampleCreateData): Promise<ISample>
  getSampleByUuid(uuid: string): Promise<ISample | null>
  getSamplesByName(name: string): Promise<ISample[]>
  updateSampleByUuid(uuid: string, data: ISampleUpdateData): Promise<Array<number>>
  deleteSampleByUuid(uuid: string, suppressError?: boolean): Promise<number>
}
